import stripesFetch from './stripesFetch';
import defaultConfig from './defaultConfig';

const loadConfig = async (stripes, ldp, setConfigLoaded, setError) => {
  if (ldp.defaultShow) {
    setConfigLoaded(true);
    return;
  }

  try {
    const path = '/configurations/entries?query=(module==LDP and configName==recordLimits)';
    const resp = await stripesFetch(stripes, path, { noSideLoad: true });
    resp.json().then(json => {
      let data;
      if (json.configs && json.configs.length !== 0) {
        data = JSON.parse(json.configs[0].value);
      } else {
        data = defaultConfig;
      }
      Object.assign(ldp, data); // ... showing that it CAN be used with a non-{} first argument!
      setConfigLoaded(true);
    });
  } catch (err) {
    setError('XXX Could not load defaults:' + err);
  }
};

export default loadConfig;
