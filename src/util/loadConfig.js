import stripesFetch from './stripesFetch';
import defaultConfig from './defaultConfig';

const loadConfig = async (intl, stripes, ldp, setConfigLoaded, setError) => {
  if (ldp.defaultShow) {
    setConfigLoaded(true);
    return;
  }

  try {
    const path = '/configurations/entries?query=(module==LDP and configName==recordLimits)';
    const resp = await stripesFetch(stripes, path, { noSideLoad: true });
    if (!resp.ok) {
      throw new Error(intl.formatMessage(
        { id: 'ui-ldp.error.http' },
        { status: resp.status, text: resp.statusText },
      ));
    }

    resp
      .json()
      .then(jsonResp => {
        let data;
        if (jsonResp.configs && jsonResp.configs.length !== 0) {
          data = JSON.parse(jsonResp.configs[0].value);
        } else {
          data = defaultConfig;
        }
        Object.assign(ldp, data); // ... showing that it CAN be used with a non-{} first argument!
        setConfigLoaded(true);
      })
      .catch(error => {
        setError(intl.formatMessage(
          { id: 'ui-ldp.error.fetch-reject' },
          { error: error.toString() },
        ));
      });
  } catch (error) {
    setError(intl.formatMessage(
      { id: 'ui-ldp.error.load-config' },
      { error: error.toString() },
    ));
  }
};

export default loadConfig;
