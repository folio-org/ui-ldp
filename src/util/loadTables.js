import stripesFetch from './stripesFetch';

const loadTables = async (intl, stripes, setTables, setError) => {
  try {
    const resp = await stripesFetch(stripes, '/ldp/db/tables');
    if (!resp.ok) {
      throw new Error(intl.formatMessage(
        { id: 'ui-ldp.error.http' },
        { status: resp.status, text: resp.statusText },
      ));
    }

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
      .catch(error => {
        setError(intl.formatMessage(
          { id: 'ui-ldp.error.fetch-reject' },
          { error: error.toString() },
        ));
      });
  } catch (error) {
    setError(intl.formatMessage(
      { id: 'ui-ldp.error.load-tables' },
      { error: error.toString() },
    ));
  }
};

export default loadTables;
