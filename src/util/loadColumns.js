import loadData from './loadData';

const loadColumns = async (intl, stripes, schema, tableName, setColumns, setError) => {
  function setData(raw) {
    setColumns({
      list: raw.map(c => c.columnName),
      options: raw.map(c => ({ value: c.columnName, label: c.columnName }))
    });
  }

  loadData(intl, stripes, 'columns', `/ldp/db/columns?schema=${schema}&table=${tableName}`, setData, setError);
};

export default loadColumns;
