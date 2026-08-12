import baseName from './baseName';

describe('baseName', () => {
  it('strips a file extension', () => {
    expect(baseName('report.sql')).toEqual('report');
  });

  it('keeps the directory part of a path', () => {
    expect(baseName('reports/circulation/loans.sql')).toEqual('reports/circulation/loans');
  });

  it('strips only the last extension', () => {
    expect(baseName('loans.v2.sql')).toEqual('loans.v2');
  });

  it('returns the name unchanged when there is no extension', () => {
    expect(baseName('README')).toEqual('README');
  });

  it('handles an empty string', () => {
    expect(baseName('')).toEqual('');
  });
});
