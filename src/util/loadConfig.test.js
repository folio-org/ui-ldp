import loadConfig from './loadConfig';
import loadData from './loadData';
import defaultConfig from './defaultConfig';
import { intl } from '../../test/jest/helpers';

jest.mock('./loadData');

const stripes = {};
const path = '/settings/entries?query=(scope=="ui-ldp.admin" and key=="config")';

// Each call gets its own setConfigLoaded/setError, so the negative
// assertions below ("did not call setError") are always made against a
// spy that nothing else has touched, and each call resets loadData so
// that the argument assertions below see only its own call.
//
// When a raw response is supplied, loadData is made to hand it to the
// callback it was given, as the real one does when a response arrives.
// That callback is not the caller's setConfigLoaded: loadConfig passes
// an inner setData that merges the stored settings into the ldp object
// first, so driving it is what exercises the merging.
//
const load = async (ldp, raw) => {
  const setConfigLoaded = jest.fn();
  const setError = jest.fn();
  loadData.mockReset();
  if (raw) loadData.mockImplementation((i, s, tag, p, setData) => setData(raw));
  await loadConfig(intl, stripes, ldp, setConfigLoaded, setError);
  return { setConfigLoaded, setError };
};

const stored = config => ({ items: [{ value: JSON.stringify(config) }] });

describe('loadConfig', () => {
  it('asks loadData for the stored configuration', async () => {
    const { setError } = await load({});

    // noSideLoad, because mod-settings is not an LDP service: this one
    // request has to go to Okapi even when modLdpUrl is configured.
    expect(loadData).toHaveBeenCalledWith(
      intl, stripes, 'config', path, expect.any(Function), setError, { noSideLoad: true },
    );
  });

  it('does not fetch again once the configuration is in hand', async () => {
    const { setConfigLoaded, setError } = await load({ defaultShow: 100 });

    expect(loadData).not.toHaveBeenCalled();
    expect(setConfigLoaded).toHaveBeenCalledWith(true);
    expect(setError).not.toHaveBeenCalled();
  });

  it('merges a stored configuration into the ldp object', async () => {
    // Not defaultShow, which would count as a configuration already in
    // hand and send loadConfig home before it fetched anything.
    const ldp = { maxShow: 10, somethingElse: true };
    const { setConfigLoaded, setError } = await load(ldp, stored({ defaultShow: 42, maxShow: 84 }));

    expect(ldp).toEqual({ defaultShow: 42, maxShow: 84, somethingElse: true });
    expect(setConfigLoaded).toHaveBeenCalledWith(true);
    expect(setError).not.toHaveBeenCalled();
  });

  it('leaves any other fields of the ldp object alone', async () => {
    const ldp = { somethingElse: true };
    const { setError } = await load(ldp, stored({ defaultShow: 42 }));

    expect(ldp.somethingElse).toBe(true);
    expect(setError).not.toHaveBeenCalled();
  });

  it('falls back to the defaults when nothing is stored', async () => {
    const ldp = {};
    const { setConfigLoaded, setError } = await load(ldp, { items: [] });

    expect(ldp).toEqual(defaultConfig);
    expect(setConfigLoaded).toHaveBeenCalledWith(true);
    expect(setError).not.toHaveBeenCalled();
  });

  it('falls back to the defaults when the response has no items at all', async () => {
    const ldp = {};
    const { setError } = await load(ldp, {});

    expect(ldp).toEqual(defaultConfig);
    expect(setError).not.toHaveBeenCalled();
  });
});
