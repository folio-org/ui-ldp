import stripesFetch from './stripesFetch';

const stripes = (over = {}) => ({
  okapi: { url: 'https://okapi.example.org', tenant: 'diku', ...over.okapi },
  ...over,
});

const lastCall = () => global.fetch.mock.calls[0];

describe('stripesFetch', () => {
  beforeEach(() => {
    // jsdom provides no fetch, so there is nothing to spy on: install one.
    global.fetch = jest.fn().mockResolvedValue({ ok: true });
  });

  afterEach(() => {
    delete global.fetch;
  });

  it('appends the path to the Okapi URL', async () => {
    await stripesFetch(stripes(), '/ldp/db/tables');
    expect(lastCall()[0]).toEqual('https://okapi.example.org/ldp/db/tables');
  });

  it('sends the tenant and a JSON content type', async () => {
    await stripesFetch(stripes(), '/ldp/db/tables');
    expect(lastCall()[1].headers).toEqual({
      'X-Okapi-Tenant': 'diku',
      'Content-Type': 'application/json',
    });
  });

  it('omits the token header entirely when there is none', async () => {
    await stripesFetch(stripes(), '/ldp/db/tables');
    expect(lastCall()[1].headers).not.toHaveProperty('X-Okapi-Token');
  });

  it('sends the token when there is one', async () => {
    await stripesFetch(stripes({ okapi: { token: 'sekrit' } }), '/ldp/db/tables');
    expect(lastCall()[1].headers['X-Okapi-Token']).toEqual('sekrit');
  });

  it('includes credentials', async () => {
    await stripesFetch(stripes(), '/ldp/db/tables');
    expect(lastCall()[1].credentials).toEqual('include');
  });

  it('passes other options through', async () => {
    await stripesFetch(stripes(), '/ldp/db/query', { method: 'POST', body: '{"a":1}' });
    expect(lastCall()[1]).toMatchObject({ method: 'POST', body: '{"a":1}' });
  });

  it('returns whatever fetch returns', async () => {
    const response = { ok: false, status: 404 };
    global.fetch.mockResolvedValue(response);
    expect(await stripesFetch(stripes(), '/ldp/db/tables')).toBe(response);
  });

  describe('side-loading', () => {
    const sideLoaded = stripes({ config: { modLdpUrl: 'https://ldp.example.org' } });

    it('prefers a configured modLdpUrl over the Okapi URL', async () => {
      await stripesFetch(sideLoaded, '/ldp/db/tables');
      expect(lastCall()[0]).toEqual('https://ldp.example.org/ldp/db/tables');
    });

    it('goes back to Okapi when the caller asks not to side-load', async () => {
      await stripesFetch(sideLoaded, '/settings/entries', { noSideLoad: true });
      expect(lastCall()[0]).toEqual('https://okapi.example.org/settings/entries');
    });

    it('does not pass noSideLoad on to fetch', async () => {
      await stripesFetch(sideLoaded, '/settings/entries', { noSideLoad: true });
      expect(lastCall()[1]).not.toHaveProperty('noSideLoad');
    });

    it('strips noSideLoad from the options object it was given', async () => {
      // The caller's object is mutated, so an options object cannot be
      // built once and reused across calls.
      const options = { noSideLoad: true, method: 'GET' };
      await stripesFetch(sideLoaded, '/settings/entries', options);
      expect(options).toEqual({ method: 'GET' });
    });
  });
});
