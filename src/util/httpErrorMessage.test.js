import httpErrorMessage from './httpErrorMessage';
import { intl } from '../../test/jest/helpers';

// Enough of a Response for httpErrorMessage, which reads only these.
const response = (status, statusText, body) => ({
  status,
  statusText,
  text: async () => body,
});

describe('httpErrorMessage', () => {
  it('digs the detail out of a JSON body', async () => {
    const res = response(404, 'Not Found', JSON.stringify({ message: 'no such table' }));
    expect(await httpErrorMessage(intl, res)).toEqual('HTTP[404|Not Found|no such table]');
  });

  it('uses a plain-text body as the detail', async () => {
    const res = response(500, 'Internal Server Error', 'database is on fire');
    expect(await httpErrorMessage(intl, res))
      .toEqual('HTTP[500|Internal Server Error|database is on fire]');
  });

  it('falls back to the raw text when a JSON-looking body will not parse', async () => {
    const res = response(502, 'Bad Gateway', '{ this is not json');
    expect(await httpErrorMessage(intl, res))
      .toEqual('HTTP[502|Bad Gateway|{ this is not json]');
  });

  it('does not attempt to parse a body that does not start with a brace', async () => {
    // A JSON array is not treated as JSON: only bodies starting with `{`
    // take the parsing branch.
    const res = response(400, 'Bad Request', '["not", "an", "object"]');
    expect(await httpErrorMessage(intl, res))
      .toEqual('HTTP[400|Bad Request|["not", "an", "object"]]');
  });

  it('handles an empty body', async () => {
    const res = response(503, 'Service Unavailable', '');
    expect(await httpErrorMessage(intl, res)).toEqual('HTTP[503|Service Unavailable|]');
  });
});
