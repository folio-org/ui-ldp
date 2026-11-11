import { findRepoConfig } from './resolveTemplatedQuery';

// The module's default export drives two WSAPI calls and a pair of raw
// fetches, so it is not covered yet; findRepoConfig, which carries the
// logic worth pinning, is exported precisely so that it can be.

const repo = (over = {}) => ({
  type: 'github', user: 'folio-org', repo: 'ldp-queries', branch: 'main', ...over,
});

describe('findRepoConfig', () => {
  it('finds the repository a query name refers to', () => {
    const config = repo();
    expect(findRepoConfig([config], 'folio-org/ldp-queries/main/loans'))
      .toEqual({ config, path: 'loans' });
  });

  it('returns the path below the repository, not just the last segment', () => {
    const config = repo();
    expect(findRepoConfig([config], 'folio-org/ldp-queries/main/circulation/overdue/loans').path)
      .toEqual('circulation/overdue/loans');
  });

  it('ignores repositories that differ in user, repo or branch', () => {
    const candidates = [
      repo({ user: 'someone-else' }),
      repo({ repo: 'other-queries' }),
      repo({ branch: 'staging' }),
    ];
    expect(findRepoConfig(candidates, 'folio-org/ldp-queries/main/loans').config)
      .toBeUndefined();
  });

  describe('matching against the configured directory', () => {
    it('matches any path when the repository is configured at its root', () => {
      const config = repo({ dir: '.' });
      expect(findRepoConfig([config], 'folio-org/ldp-queries/main/reports/loans').config)
        .toEqual(config);
    });

    it('treats an unset, empty or slash directory as the root', () => {
      const qname = 'folio-org/ldp-queries/main/reports/loans';
      [undefined, '', '/'].forEach(dir => {
        expect(findRepoConfig([repo({ dir })], qname).config).toBeDefined();
      });
    });

    it('matches when the path is inside the configured directory', () => {
      const config = repo({ dir: 'reports' });
      expect(findRepoConfig([config], 'folio-org/ldp-queries/main/reports/loans').config)
        .toEqual(config);
    });

    it('tolerates a trailing slash on the configured directory', () => {
      const config = repo({ dir: 'reports/' });
      expect(findRepoConfig([config], 'folio-org/ldp-queries/main/reports/loans').config)
        .toEqual(config);
    });

    it('does not match a path outside the configured directory', () => {
      const config = repo({ dir: 'reports' });
      expect(findRepoConfig([config], 'folio-org/ldp-queries/main/elsewhere/loans').config)
        .toBeUndefined();
    });

    it('does not match a directory that is only a string prefix', () => {
      // 'reports-archive/loans' starts with 'reports' but is not in it.
      const config = repo({ dir: 'reports' });
      expect(findRepoConfig([config], 'folio-org/ldp-queries/main/reports-archive/loans').config)
        .toBeUndefined();
    });
  });

  it('prefers the most specific of several matching repositories', () => {
    // These differ only in directory, so all three match; the deepest
    // one is the one that actually holds the query.
    const shallow = repo({ dir: '.' });
    const middle = repo({ dir: 'reports' });
    const deep = repo({ dir: 'reports/circulation' });

    expect(findRepoConfig([shallow, middle, deep], 'folio-org/ldp-queries/main/reports/circulation/loans').config)
      .toEqual(deep);
    expect(findRepoConfig([deep, middle, shallow], 'folio-org/ldp-queries/main/reports/circulation/loans').config)
      .toEqual(deep);
  });

  it('returns an empty result for a name with no path', () => {
    expect(findRepoConfig([repo()], 'folio-org/ldp-queries/main')).toEqual({});
  });

  it('reports no config, but still the path, when nothing matches', () => {
    expect(findRepoConfig([], 'folio-org/ldp-queries/main/loans'))
      .toEqual({ config: undefined, path: 'loans' });
  });

  it('tolerates an undefined repository list', () => {
    expect(findRepoConfig(undefined, 'folio-org/ldp-queries/main/loans'))
      .toEqual({ config: undefined, path: 'loans' });
  });
});
