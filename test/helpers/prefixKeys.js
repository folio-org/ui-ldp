// mimics the StripesTranslationPlugin in @folio/stripes-core
function prefixKeys(obj, prefix = 'ui-ldp') {
  const res = {};

  for (const key of Object.keys(obj)) {
    res[`${prefix}.${key}`] = obj[key];
  }

  return res;
}

export default prefixKeys;
