import sortByParams from './sortByParams';

// sortByParams sorts in place, so every test needs its own array:
// a shared fixture would carry the previous test's ordering.
const makeRows = () => [
  { tableName: 'holdings', elapsedRealTime: 30 },
  { tableName: 'circulation', elapsedRealTime: 10 },
  { tableName: 'users', elapsedRealTime: 20 },
];

describe('sortByParams', () => {
  it('sorts ascending on a string column', () => {
    const sorted = sortByParams(makeRows(), 'tableName', 'ascending');
    expect(sorted.map(r => r.tableName)).toEqual(['circulation', 'holdings', 'users']);
  });

  it('sorts descending on a string column', () => {
    const sorted = sortByParams(makeRows(), 'tableName', 'descending');
    expect(sorted.map(r => r.tableName)).toEqual(['users', 'holdings', 'circulation']);
  });

  it('sorts ascending on a numeric column', () => {
    const sorted = sortByParams(makeRows(), 'elapsedRealTime', 'ascending');
    expect(sorted.map(r => r.elapsedRealTime)).toEqual([10, 20, 30]);
  });

  it('sorts descending on a numeric column', () => {
    const sorted = sortByParams(makeRows(), 'elapsedRealTime', 'descending');
    expect(sorted.map(r => r.elapsedRealTime)).toEqual([30, 20, 10]);
  });

  it('treats any direction other than "ascending" as descending', () => {
    const sorted = sortByParams(makeRows(), 'tableName', undefined);
    expect(sorted.map(r => r.tableName)).toEqual(['users', 'holdings', 'circulation']);
  });

  it('returns an empty array when data is undefined', () => {
    // The Info components call this with data.updates etc., which are
    // absent until the WSAPI call resolves.
    expect(sortByParams(undefined, 'tableName', 'ascending')).toEqual([]);
  });

  it('returns an empty array when data is null', () => {
    expect(sortByParams(null, 'tableName', 'ascending')).toEqual([]);
  });

  it('leaves rows in their original order when the column is missing from every row', () => {
    const sorted = sortByParams(makeRows(), 'noSuchColumn', 'ascending');
    expect(sorted.map(r => r.tableName)).toEqual(['holdings', 'circulation', 'users']);
  });

  it('sorts in place and returns the array it was given', () => {
    const data = makeRows();
    const sorted = sortByParams(data, 'tableName', 'ascending');
    expect(sorted).toBe(data);
    expect(data.map(r => r.tableName)).toEqual(['circulation', 'holdings', 'users']);
  });
});
