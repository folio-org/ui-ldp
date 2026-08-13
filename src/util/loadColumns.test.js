import loadColumns from './loadColumns';
import loadData from './loadData';
import { intl } from '../../test/jest/helpers';

jest.mock('./loadData');

const stripes = {};

// Each call gets its own setColumns/setError, so the negative assertions
// below ("did not call setError") are always made against a spy that
// nothing else has touched. Resetting loadData here rather than in a
// beforeEach earns the same guarantee for `calls[0]` below: it is this
// call's, not the first one an earlier test happened to make.
//
// loadColumns does not hand its own setColumns to loadData: it passes an
// inner setData that reshapes the raw column records first. That inner
// function is what the server response would arrive at, so return it too,
// and the tests can drive it directly.
//
const load = async (schema, tableName) => {
  const setColumns = jest.fn();
  const setError = jest.fn();
  loadData.mockReset();
  await loadColumns(intl, stripes, schema, tableName, setColumns, setError);
  const setData = loadData.mock.calls[0][4];
  return { setColumns, setError, setData };
};

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
    const { setColumns, setError, setData } = await load('folio_inventory', 'holdings');

    setData([
      { columnName: 'id' },
      { columnName: 'permanent_location_id' },
    ]);

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
    const { setColumns, setError, setData } = await load('folio_inventory', 'holdings');

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
    setData(columnList.map(x => ({ columnName: x })));

    expect(setColumns.mock.calls[0][0].list).toEqual(columnList);
    expect(setError).not.toHaveBeenCalled();
  });
});
