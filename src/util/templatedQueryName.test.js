import templatedQueryName from './templatedQueryName';

const query = (filename, config = {}) => ({
  filename,
  config: { user: 'folio-org', repo: 'ldp-queries', branch: 'main', ...config },
});

describe('templatedQueryName', () => {
  it('composes user/repo/branch/path from the config and filename', () => {
    expect(templatedQueryName(query('loans.sql')))
      .toEqual('folio-org/ldp-queries/main/loans');
  });

  it('keeps the directory, which the filename already includes', () => {
    // The filename is relative to the repository root, so it already
    // carries config.dir and must not have it prepended again.
    expect(templatedQueryName(query('circulation/loans.sql', { dir: 'circulation' })))
      .toEqual('folio-org/ldp-queries/main/circulation/loans');
  });

  it('reflects a non-default branch', () => {
    expect(templatedQueryName(query('loans.sql', { branch: 'staging' })))
      .toEqual('folio-org/ldp-queries/staging/loans');
  });
});
