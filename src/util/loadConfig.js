import loadData from './loadData';
import defaultConfig from './defaultConfig';

const loadConfig = async (intl, stripes, ldp, setConfigLoaded, setError) => {
  if (ldp.defaultShow) {
    setConfigLoaded(true);
    return;
  }

  function setData(raw) {
    let data;
    if (raw.configs && raw.configs.length !== 0) {
      data = JSON.parse(raw.configs[0].value);
    } else {
      data = defaultConfig;
    }
    Object.assign(ldp, data); // ... showing that it CAN be used with a non-{} first argument!
    setConfigLoaded(true);
  }

  const path = '/settings/entries?query=(scope=="ui-ldp.admin" and key=="config")';
  loadData(intl, stripes, 'config', path, setData, setError, { noSideLoad: true });
};

export default loadConfig;
