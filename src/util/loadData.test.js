import loadData from './loadData';
import stripesFetch from './stripesFetch';
import { intl } from '../../test/jest/helpers';

jest.mock('./stripesFetch');

// loadData does not await the resp.json() chain, so its setData/setError
// calls land a tick after loadData itself resolves.
const flush = () => new Promise(resolve => { setTimeout(resolve, 0); });

const okResponse = body => ({ ok: true, json: async () => body });

const errorResponse = (status, statusText, body) => ({
  ok: false,
  status,
  statusText,
  text: async () => body,
});

const stripes = { okapi: { url: 'https://okapi.example.org', tenant: 'diku' } };

// Each call gets its own setData/setError, so the negative assertions
// below ("did not call setData") are always made against a spy that
// nothing else has touched.
//
const load = async (tag, path, opts) => {
  const setData = jest.fn();
  const setError = jest.fn();
  await loadData(intl, stripes, tag, path, setData, setError, opts);
  await flush();
  return { setData, setError };
};

describe('loadData', () => {
  beforeEach(() => {
    stripesFetch.mockReset();
  });

  it('passes the path and options to stripesFetch', async () => {
    stripesFetch.mockResolvedValue(okResponse([]));
    const { setError } = await load('results', '/ldp/db/query', { method: 'POST', body: '{}' });

    expect(stripesFetch).toHaveBeenCalledWith(stripes, '/ldp/db/query', { method: 'POST', body: '{}' });
    expect(setError).not.toHaveBeenCalled();
  });

  it('defaults the options to an empty object', async () => {
    stripesFetch.mockResolvedValue(okResponse([]));
    const { setError } = await load('tables', '/ldp/db/tables');

    expect(stripesFetch).toHaveBeenCalledWith(stripes, '/ldp/db/tables', {});
    expect(setError).not.toHaveBeenCalled();
  });

  it('hands the decoded body to setData', async () => {
    const body = [{ tableSchema: 'folio_inventory', tableName: 'holdings' }];
    stripesFetch.mockResolvedValue(okResponse(body));
    const { setData, setError } = await load('tables', '/ldp/db/tables');

    expect(setData).toHaveBeenCalledWith(body);
    expect(setError).not.toHaveBeenCalled();
  });

  it('reports an HTTP failure against the tag it was given', async () => {
    stripesFetch.mockResolvedValue(errorResponse(404, 'Not Found', 'no such table'));
    const { setData, setError } = await load('tables', '/ldp/db/tables');

    expect(setError).toHaveBeenCalledWith('LOAD-TABLES[Error: HTTP[404|Not Found|no such table]]');
    expect(setData).not.toHaveBeenCalled();
  });

  it('builds the message id from the tag, so each caller reports its own failure', async () => {
    stripesFetch.mockResolvedValue(errorResponse(500, 'Server Error', 'boom'));
    const { setData, setError } = await load('columns', '/ldp/db/columns');

    expect(setError).toHaveBeenCalledWith(expect.stringMatching(/^LOAD-COLUMNS\[/));
    expect(setData).not.toHaveBeenCalled();
  });

  it('reports a rejected fetch against the tag as well', async () => {
    stripesFetch.mockRejectedValue(new Error('network is down'));
    const { setData, setError } = await load('report', '/ldp/db/reports');

    expect(setError).toHaveBeenCalledWith('LOAD-REPORT[Error: network is down]');
    expect(setData).not.toHaveBeenCalled();
  });

  it('reports an undecodable body separately from a failed request', async () => {
    // The request succeeded, so this is not a load-<tag> failure.
    stripesFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.reject(new Error('Unexpected token < in JSON')),
    });
    const { setData, setError } = await load('tables', '/ldp/db/tables');

    expect(setError).toHaveBeenCalledWith('FETCH-REJECT[Error: Unexpected token < in JSON]');
    expect(setData).not.toHaveBeenCalled();
  });
});
