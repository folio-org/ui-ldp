import loadData from './loadData';

const loadTables = async (intl, stripes, setTables, setError) => {
  function setData(raw) {
    // raw: [{ tableSchema, tableName }, {}, {}, ...]
    const acc = {};
    for (let i = 0; i < raw.length; i++) {
      const schemaName = raw[i].tableSchema;
      if (!['public', 'local', 'folio_reporting'].includes(schemaName)) {
        throw Error(`cannot happen: tableSchema='${schemaName}'`);
      }

      if (!acc[schemaName]) acc[schemaName] = [];
      acc[schemaName].push(raw[i].tableName);
    }

    const schemaMap = {};
    Object.keys(acc).forEach(key => {
      if (acc[key].length > 0) {
        schemaMap[key] = acc[key].sort().map(t => ({ value: t, label: t }));
      }
    });

    setTables(schemaMap);
  }

  loadData(intl, stripes, 'tables', '/ldp/db/tables', setData, setError);
};

export default loadTables;
