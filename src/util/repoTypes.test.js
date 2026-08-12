import { randomUUID } from 'crypto';

import { repoTypes, createReportRepo } from './repoTypes';

// QueryRepoGitHub keeps a module-level cache of the latest commit SHA,
// keyed by user:repo:branch, so each test uses its own repo name to stop
// one test's mapApiResponse from being visible to another.
const github = (over = {}) => createReportRepo({
  user: 'folio-org', repo: `r-${randomUUID()}`, branch: 'main', ...over,
});

const gitlab = (over = {}) => createReportRepo({
  type: 'gitlab', user: 'folio-org', repo: `r-${randomUUID()}`, branch: 'main', ...over,
});

describe('createReportRepo', () => {
  it('defaults to GitHub when no type is given', () => {
    expect(github().showBaseUrl()).toBe(false);
  });

  it('creates a GitLab repo when asked', () => {
    expect(gitlab().showBaseUrl()).toBe(true);
  });

  it('exposes the supported types under their config names', () => {
    expect(Object.keys(repoTypes).sort()).toEqual(['github', 'gitlab']);
    expect(repoTypes.github.name()).toEqual('GitHub');
    expect(repoTypes.gitlab.name()).toEqual('GitLab');
  });

  describe('directory normalization', () => {
    it('treats an undefined directory as the repository root', () => {
      expect(github({ dir: undefined }).dir).toEqual('.');
    });

    it('treats a bare slash as the repository root', () => {
      expect(github({ dir: '/' }).dir).toEqual('.');
    });

    it('keeps a named directory as given', () => {
      expect(github({ dir: 'reports' }).dir).toEqual('reports');
    });

    it('treats an empty directory as the repository root', () => {
      // Left as '' it would make GitHub's mapApiResponse filter on the
      // prefix '/', which no entry has, hiding every query in the repo.
      expect(github({ dir: '' }).dir).toEqual('.');
    });
  });
});

describe('QueryRepoGitHub', () => {
  it('builds a web URL', () => {
    const repo = createReportRepo({ user: 'folio-org', repo: 'ldp-queries', branch: 'main', dir: 'reports' });
    expect(repo.webUrl()).toEqual('https://github.com/folio-org/ldp-queries/tree/main/reports');
  });

  it('builds an API directory path with a cache-busting parameter', () => {
    const repo = createReportRepo({ user: 'folio-org', repo: 'ldp-queries', branch: 'main' });
    expect(repo.apiDirectoryPath()).toMatch(
      /^https:\/\/api\.github\.com\/repos\/folio-org\/ldp-queries\/git\/trees\/main\?recursive=1&t=\d+$/
    );
  });

  it('builds a raw file path from the branch before any tree has been fetched', () => {
    const repo = github({ repo: 'unharvested' });
    expect(repo.rawFilePath('reports/loans.sql'))
      .toEqual('https://raw.githubusercontent.com/folio-org/unharvested/main/reports/loans.sql');
  });

  it('builds a URL base', () => {
    const repo = createReportRepo({ user: 'folio-org', repo: 'ldp-queries', branch: 'main' });
    expect(repo.urlBase('reports/loans.sql'))
      .toEqual('https://github.com/folio-org/ldp-queries/tree/main/reports/loans.sql');
  });

  describe('mapApiResponse', () => {
    const tree = {
      sha: 'abc123',
      tree: [
        { path: 'README.md' },
        { path: 'reports/loans.sql' },
        { path: 'reports/loans.json' },
        { path: 'other/fines.sql' },
      ],
    };

    it('populates name from path and returns the whole tree at the root', () => {
      const repo = github({ dir: undefined });
      expect(repo.mapApiResponse(tree).map(e => e.name)).toEqual([
        'README.md', 'reports/loans.sql', 'reports/loans.json', 'other/fines.sql',
      ]);
    });

    it('filters the tree to the configured directory', () => {
      const repo = github({ dir: 'reports' });
      expect(repo.mapApiResponse(tree).map(e => e.name))
        .toEqual(['reports/loans.sql', 'reports/loans.json']);
    });

    it('accepts a configured directory with a trailing slash', () => {
      const repo = github({ dir: 'reports/' });
      expect(repo.mapApiResponse(tree).map(e => e.name))
        .toEqual(['reports/loans.sql', 'reports/loans.json']);
    });

    it('remembers the tree SHA, which later raw file paths then use', () => {
      const repo = github({ repo: 'harvested' });
      expect(repo.rawFilePath('a.sql'))
        .toEqual('https://raw.githubusercontent.com/folio-org/harvested/main/a.sql');

      repo.mapApiResponse({ sha: 'deadbeef', tree: [] });
      expect(repo.rawFilePath('a.sql'))
        .toEqual('https://raw.githubusercontent.com/folio-org/harvested/deadbeef/a.sql');
    });

    it('shares the remembered SHA between instances of the same user/repo/branch', () => {
      const config = { user: 'folio-org', repo: 'shared', branch: 'main' };
      createReportRepo(config).mapApiResponse({ sha: 'cafe', tree: [] });

      expect(createReportRepo(config).rawFilePath('a.sql'))
        .toEqual('https://raw.githubusercontent.com/folio-org/shared/cafe/a.sql');
    });
  });
});

describe('QueryRepoGitLab', () => {
  it('defaults to gitlab.com when no base URL is configured', () => {
    const repo = gitlab({ repo: 'ldp-queries', dir: 'reports' });
    expect(repo.webUrl()).toEqual('https://gitlab.com/folio-org/ldp-queries/tree/main/reports');
  });

  it('uses a configured base URL for a self-hosted instance', () => {
    const repo = gitlab({ repo: 'ldp-queries', dir: 'reports', baseUrl: 'https://git.example.org' });
    expect(repo.webUrl()).toEqual('https://git.example.org/folio-org/ldp-queries/tree/main/reports');
  });

  it('builds an API directory path with the project path encoded', () => {
    const repo = gitlab({ repo: 'ldp-queries', dir: 'reports' });
    expect(repo.apiDirectoryPath()).toEqual(
      'https://gitlab.com/api/v4/projects/folio-org%2Fldp-queries/repository/tree' +
      '?ref=main&path=reports&recursive=true'
    );
  });

  it('builds a raw file path with the filename encoded', () => {
    const repo = gitlab({ repo: 'ldp-queries' });
    expect(repo.rawFilePath('reports/loans.sql')).toEqual(
      'https://gitlab.com/api/v4/projects/folio-org%2Fldp-queries/repository/files' +
      '/reports%2Floans.sql/raw?ref=main'
    );
  });

  it('builds a URL base', () => {
    const repo = gitlab({ repo: 'ldp-queries' });
    expect(repo.urlBase('reports/loans.sql'))
      .toEqual('https://gitlab.com/folio-org/ldp-queries/tree/main/reports/loans.sql');
  });

  it('keeps only blobs, discarding subdirectory entries', () => {
    const repo = gitlab();
    const entries = repo.mapApiResponse([
      { type: 'tree', path: 'reports' },
      { type: 'blob', path: 'reports/loans.sql' },
      { type: 'blob', path: 'reports/loans.json' },
    ]);
    expect(entries.map(e => e.name)).toEqual(['reports/loans.sql', 'reports/loans.json']);
  });

  it('does not filter blobs by directory, the API having done so already', () => {
    // Unlike GitHub, the GitLab tree call takes a path parameter.
    const repo = gitlab({ dir: 'reports' });
    const entries = repo.mapApiResponse([{ type: 'blob', path: 'elsewhere/fines.sql' }]);
    expect(entries.map(e => e.name)).toEqual(['elsewhere/fines.sql']);
  });
});
