import stripesFetch from './stripesFetch';
import defaultConfig from './defaultConfig';

const loadConfig = async (stripes, ldp, setConfigLoaded, setError) => {
  if (!ldp.defaultShow) {
    try {
      const path = '/configurations/entries?query=(module==LDP and configName==recordLimits)';
      const resp = await stripesFetch(stripes, path, { noSideLoad: true });
      resp.json().then(json => {
        const data = (json.configs && json.configs.length !== 0) ?
          JSON.parse(json.configs[0].value) :
          defaultConfig;
        ldp.maxShow = data.maxShow;
        ldp.maxExport = data.maxExport;
        ldp.defaultShow = data.defaultShow;
        setConfigLoaded(true);
      });
    } catch (err) {
      setError('Could not load defaults:' + err);
    }
  }
};

export default loadConfig;
