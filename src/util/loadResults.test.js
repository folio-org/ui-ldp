import loadResults from './loadResults';
import loadData from './loadData';
import { intl } from '../../test/jest/helpers';

jest.mock('./loadData');

const stripes = {};

const bodyOf = () => JSON.parse(loadData.mock.calls[0][6].body);

const values = (over = {}) => ({
  tables: [{ schema: 'folio_inventory', tableName: 'holdings', limit: 100 }],
  ...over,
});

// Each run gets its own setQueryResponse/setError, so the negative
// assertions below ("did not call setError") are always made against a
// spy that nothing else has touched, and each run resets loadData so
// that bodyOf above reads only its own call.
//
// When raw records are supplied, loadData is made to hand them to the
// callback it was given, as the real one does when a response arrives.
// That callback is not the caller's setQueryResponse: loadResults passes
// an inner setData that strips the record blobs, truncates and keys the
// result first, so driving it is what exercises all that. `response` is
// what came out.
//
const run = async (vals, limit, raw) => {
  const setQueryResponse = jest.fn();
  const setError = jest.fn();
  loadData.mockReset();
  if (raw) loadData.mockImplementation((i, s, tag, p, setData) => setData(raw));
  await loadResults(intl, stripes, vals, setQueryResponse, setError, limit);
  return { setQueryResponse, setError, response: setQueryResponse.mock.calls[0]?.[0] };
};

describe('loadResults', () => {
  it('posts the query', async () => {
    await run(values(), 10);
    expect(loadData.mock.calls[0][2]).toEqual('results');
    expect(loadData.mock.calls[0][3]).toEqual('/ldp/db/query');
    expect(loadData.mock.calls[0][6].method).toEqual('POST');
  });

  it('asks for one more record than the user wanted, to detect truncation', async () => {
    await run(values(), '25');
    expect(bodyOf().tables[0].limit).toEqual(26);
  });

  it('falls back to the limit in the query itself', async () => {
    await run(values(), undefined);
    expect(bodyOf().tables[0].limit).toEqual(101);
  });

  it('does not send the query metadata to the server', async () => {
    await run(values({ META: { displayName: 'Saved query' } }), 10);
    expect(bodyOf()).not.toHaveProperty('META');
  });

  it('leaves the caller values untouched', async () => {
    // The form still owns this object, so the limit adjustment and the
    // dropped META must happen on a copy.
    const vals = values({ META: { displayName: 'Saved query' } });
    await run(vals, 10);

    expect(vals.META).toEqual({ displayName: 'Saved query' });
    expect(vals.tables[0].limit).toEqual(100);
  });

  it('discards the raw record blobs the two backends return', async () => {
    const { response, setError } = await run(values(), 10, [
      { id: 'a', data: { big: 'blob' }, jsonb: { also: 'big' } },
    ]);

    expect(response.resp).toEqual([{ id: 'a' }]);
    expect(setError).not.toHaveBeenCalled();
  });

  it('reports a complete result unchanged', async () => {
    const { response, setError } = await run(values(), 10, [{ id: 'a' }, { id: 'b' }]);

    expect(response).toMatchObject({
      count: 2,
      isComplete: true,
      resp: [{ id: 'a' }, { id: 'b' }],
    });
    expect(setError).not.toHaveBeenCalled();
  });

  it('overwrites the surplus row with a placeholder when truncated', async () => {
    // Unlike loadReport, which appends, this replaces the extra record
    // that was fetched only to reveal that there are more. The server
    // was asked for limit + 1, so that is what a truncated result holds,
    // and the count reported is the limit rather than the row count.
    const { response, setError } = await run(values(), 2, [{ id: 'a' }, { id: 'b' }, { id: 'c' }]);

    expect(response).toMatchObject({
      count: 2,
      isComplete: false,
      resp: [{ id: 'a' }, { id: 'b' }, { id: 'MORE-RECORDS' }],
    });
    expect(setError).not.toHaveBeenCalled();
  });

  it('gives each response a distinct key, so the results list remounts', async () => {
    const raw = [{ id: 'a' }];
    const first = (await run(values(), 10, raw)).response.key;
    const second = (await run(values(), 10, raw)).response.key;

    expect(typeof first).toEqual('string');
    expect(second).not.toEqual(first);
  });
});
