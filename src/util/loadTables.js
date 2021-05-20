import stripesFetch from './stripesFetch';

const loadTables = async (stripes, setTables, setError) => {
  try {
    const resp = await stripesFetch(stripes, '/ldp/db/tables');
    if (!resp.ok) throw new Error(`HTTP error ${resp.status}: ${resp.statusText}`);
    resp
      .json()
      .then(jsonResp => {
        // jsonResp: [{ tableSchema, tableName }, {}, {}, ...]
        // The server returns a sorted list by tableSchema
        let _public = [];
        let local = [];
        let folioReporting = [];
        for (let i = 0; i < jsonResp.length; i++) {
          switch (jsonResp[i].tableSchema) {
            case 'public':
              _public.push(jsonResp[i].tableName);
              break;
            case 'local':
              local.push(jsonResp[i].tableName);
              break;
            case 'folio_reporting':
              folioReporting.push(jsonResp[i].tableName);
              break;
            default:
              throw Error(`cannot happen: tableSchema='${jsonResp[i].tableSchema}'`);
          }
        }
        // Sort the tableNames in each bucket alphabetically
        _public = _public.sort((a, b) => a.localeCompare(b));
        local = local.sort((a, b) => a.localeCompare(b));
        folioReporting = folioReporting.sort((a, b) => a.localeCompare(b));

        // Transform each tableName string to an Option object used in the Selection component
        _public = _public.map(t => ({ value: t, label: t }));
        local = local.map(t => ({ value: t, label: t }));
        folioReporting = folioReporting.map(t => ({ value: t, label: t }));

        const schemaMap = {};
        if (folioReporting.length > 0) schemaMap.folio_reporting = folioReporting;
        if (local.length > 0) schemaMap.local = local;
        if (_public.length > 0) schemaMap.public = _public;
        setTables(schemaMap);
      })
      .catch(err => {
        // console.error(err);
        setError('Failed connect to database: ' + err);
      });
  } catch (err) {
    // console.error(err);
    setError('Failed connecting to server: ' + err);
  }
};

export default loadTables;
