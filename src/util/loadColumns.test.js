import loadColumns from './loadColumns';
import loadData from './loadData';
import { intl } from '../../test/jest/helpers';

jest.mock('./loadData');

const stripes = {};

// Each call gets its own setColumns/setError, so the negative assertions
// below ("did not call setError") are always made against a spy that
// nothing else has touched, and each call resets loadData so that the
// argument assertion below sees only its own call.
//
// When raw records are supplied, loadData is made to hand them to the
// callback it was given, as the real one does when a response arrives.
// That callback is not the caller's setColumns: loadColumns passes an
// inner setData that reshapes the raw records first, so driving it is
// what exercises the reshaping.
//
const load = async (schema, tableName, raw) => {
  const setColumns = jest.fn();
  const setError = jest.fn();
  loadData.mockReset();
  if (raw) loadData.mockImplementation((i, s, tag, path, setData) => setData(raw));
  await loadColumns(intl, stripes, schema, tableName, setColumns, setError);
  return { setColumns, setError };
};

const columnRecords = names => names.map(columnName => ({ columnName }));

describe('loadColumns', () => {
  it('asks loadData for the columns of the given table', async () => {
    const { setError } = await load('folio_inventory', 'holdings');

    expect(loadData).toHaveBeenCalledWith(
      intl,
      stripes,
      'columns',
      '/ldp/db/columns?schema=folio_inventory&table=holdings',
      expect.any(Function),
      setError,
    );
  });

  it('offers the column names both as a list and as select options', async () => {
    const { setColumns, setError } = await load(
      'folio_inventory',
      'holdings',
      columnRecords(['id', 'permanent_location_id']),
    );

    expect(setColumns).toHaveBeenCalledWith({
      list: ['id', 'permanent_location_id'],
      options: [
        { value: 'id', label: 'id' },
        { value: 'permanent_location_id', label: 'permanent_location_id' },
      ],
    });
    expect(setError).not.toHaveBeenCalled();
  });

  it('keeps the order the server gave, rather than sorting', async () => {
    // Neither sorted nor reverse-sorted, so a sort in either direction
    // shows up here.
    const columnList = [
      'id',
      'hrid',
      'permanent_location_id',
      'call_number',
      'discovery_suppress',
      'acquisition_method',
    ];
    const { setColumns, setError } = await load(
      'folio_inventory',
      'holdings',
      columnRecords(columnList),
    );

    expect(setColumns.mock.calls[0][0].list).toEqual(columnList);
    expect(setError).not.toHaveBeenCalled();
  });
});
