import loadTables from './loadTables';
import loadData from './loadData';
import { intl } from '../../test/jest/helpers';

jest.mock('./loadData');

const stripes = {};

// Each call gets its own setTables/setError, so the negative assertions
// below ("did not call setError") are always made against a spy that
// nothing else has touched, and each call resets loadData so that the
// argument assertion below sees only its own call.
//
// When raw records are supplied, loadData is made to hand them to the
// callback it was given, as the real one does when a response arrives.
// That callback is not the caller's setTables: loadTables passes an
// inner setData that groups the raw records by schema first, and that
// grouping is the only logic the wrapper has. The fetching itself is
// loadData's own business.
//
const load = async (raw) => {
  const setTables = jest.fn();
  const setError = jest.fn();
  loadData.mockReset();
  if (raw) loadData.mockImplementation((i, s, tag, path, setData) => setData(raw));
  await loadTables(intl, stripes, setTables, setError);
  return { setTables, setError };
};

describe('loadTables', () => {
  it('asks loadData for the table list', async () => {
    const { setError } = await load();

    expect(loadData).toHaveBeenCalledWith(
      intl, stripes, 'tables', '/ldp/db/tables', expect.any(Function), setError,
    );
  });

  it('groups tables under their schema', async () => {
    const { setTables, setError } = await load([
      { tableSchema: 'folio_inventory', tableName: 'holdings' },
      { tableSchema: 'folio_circulation', tableName: 'loans' },
      { tableSchema: 'folio_inventory', tableName: 'items' },
    ]);

    expect(setTables).toHaveBeenCalledWith({
      folio_inventory: [
        { value: 'holdings', label: 'holdings' },
        { value: 'items', label: 'items' },
      ],
      folio_circulation: [
        { value: 'loans', label: 'loans' },
      ],
    });
    expect(setError).not.toHaveBeenCalled();
  });

  it('sorts the tables within each schema', async () => {
    const tableNames = [
      'items',
      'holdings',
      'service_point',
      'instances',
      'alternative_title_type',
      'location',
      'call_number_type',
    ];
    const { setTables, setError } = await load(
      tableNames.map(tableName => ({ tableSchema: 'folio_inventory', tableName })),
    );

    expect(setTables.mock.calls[0][0].folio_inventory.map(t => t.value)).toEqual([...tableNames].sort());
    expect(setError).not.toHaveBeenCalled();
  });

  it('yields an empty map when there are no tables', async () => {
    const { setTables, setError } = await load([]);

    expect(setTables).toHaveBeenCalledWith({});
    expect(setError).not.toHaveBeenCalled();
  });
});
