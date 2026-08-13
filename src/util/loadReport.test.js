import loadReport from './loadReport';
import loadData from './loadData';
import { intl } from '../../test/jest/helpers';

jest.mock('./loadData');

const stripes = {};

// Each run gets its own setQueryResponse/setError, so the negative
// assertions below ("did not call setError") are always made against a
// spy that nothing else has touched, and each run resets loadData so
// that the argument assertions below see only its own call.
//
// When a raw response is supplied, loadData is made to hand it to the
// callback it was given, as the real one does when a response arrives.
// That callback is not the caller's setQueryResponse: loadReport passes
// an inner setData that counts, truncates and keys the records first, so
// driving it is what exercises all that. `response` is what came out.
//
const run = async (limit, raw) => {
  const setQueryResponse = jest.fn();
  const setError = jest.fn();
  loadData.mockReset();
  if (raw) loadData.mockImplementation((i, s, tag, p, setData) => setData(raw));
  await loadReport(
    intl, stripes, 'https://example.org/loans.sql', { branch: 'main' },
    setQueryResponse, setError, limit,
  );
  return { setQueryResponse, setError, response: setQueryResponse.mock.calls[0]?.[0] };
};

describe('loadReport', () => {
  it('posts the report URL and parameters', async () => {
    await run(10);

    expect(loadData.mock.calls[0][2]).toEqual('report');
    expect(loadData.mock.calls[0][3]).toEqual('/ldp/db/reports');
    expect(loadData.mock.calls[0][6].method).toEqual('POST');
    expect(JSON.parse(loadData.mock.calls[0][6].body)).toEqual({
      url: 'https://example.org/loans.sql',
      params: { branch: 'main' },
      limit: 11,
    });
  });

  it('asks for one more record than the user wanted, to detect truncation', async () => {
    await run('25'); // limits arrive from form fields as strings
    expect(JSON.parse(loadData.mock.calls[0][6].body).limit).toEqual(26);
  });

  it('reports a complete result unchanged', async () => {
    const { response, setError } = await run(10, {
      totalRecords: 2, records: [{ id: 'a' }, { id: 'b' }],
    });

    expect(response).toMatchObject({
      count: 2,
      isComplete: true,
      resp: [{ id: 'a' }, { id: 'b' }],
    });
    expect(setError).not.toHaveBeenCalled();
  });

  it('marks a truncated result and appends a placeholder row', async () => {
    const { response, setError } = await run(2, {
      totalRecords: 100, records: [{ id: 'a' }, { id: 'b' }],
    });

    expect(response).toMatchObject({
      count: 100,
      isComplete: false,
      resp: [{ id: 'a' }, { id: 'b' }, { id: 'MORE-RECORDS' }],
    });
    expect(setError).not.toHaveBeenCalled();
  });

  it('puts the placeholder in whatever the first column happens to be named', async () => {
    // These records have no id, so the column the placeholder lands in
    // can only have come from the data: the test above, whose records
    // are keyed by id, would equally suit a hardcoded 'id'. The exact
    // match also pins the placeholder row to that one column.
    const { response } = await run(1, {
      totalRecords: 100, records: [{ tableName: 'loans', count: 3 }],
    });

    expect(response.resp[1]).toEqual({ tableName: 'MORE-RECORDS' });
  });

  it('gives each response a distinct key, so the results list remounts', async () => {
    const raw = { totalRecords: 1, records: [{ id: 'a' }] };
    const first = (await run(10, raw)).response.key;
    const second = (await run(10, raw)).response.key;

    expect(typeof first).toEqual('string');
    expect(second).not.toEqual(first);
  });
});
