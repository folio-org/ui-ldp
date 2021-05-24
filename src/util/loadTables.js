import stripesFetch from './stripesFetch';

const loadTables = async (stripes, setTables, setError) => {
  try {
    const resp = await stripesFetch(stripes, '/ldp/db/tables');
    if (!resp.ok) throw new Error(`HTTP error ${resp.status}: ${resp.statusText}`);
    resp
      .json()
      .then(jsonResp => {
        // jsonResp: [{ tableSchema, tableName }, {}, {}, ...]
        const acc = {};
        for (let i = 0; i < jsonResp.length; i++) {
          const schemaName = jsonResp[i].tableSchema;
          if (!['public', 'local', 'folio_reporting'].includes(schemaName)) {
            throw Error(`cannot happen: tableSchema='${schemaName}'`);
          }

          if (!acc[schemaName]) acc[schemaName] = [];
          acc[schemaName].push(jsonResp[i].tableName);
        }

        const schemaMap = {};
        Object.keys(acc).forEach(key => {
          if (acc[key].length > 0) {
            schemaMap[key] = acc[key].sort().map(t => ({ value: t, label: t }));
          }
        });

        setTables(schemaMap);
      })
      .catch(err => {
        setError('Failed connect to database: ' + err);
      });
  } catch (err) {
    // I don't think this can work -- at least, it doesn't seem to catch errors
    setError('Failed connecting to server: ' + err);
  }
};

export default loadTables;
