import stripesFetch from './stripesFetch';

const loadColumns = async (stripes, schema, tableName, setColumns, setError) => {
  try {
    const resp = await stripesFetch(stripes, `/ldp/db/columns?schema=${schema}&table=${tableName}`);
    if (!resp.ok) throw new Error(`HTTP error ${resp.status}: ${resp.statusText}`);
    resp
      .json()
      .then(jsonResp => {
        setColumns({
          list: jsonResp.map(c => c.columnName),
          options: jsonResp.map(c => ({ value: c.columnName, label: c.columnName }))
        });
      })
      .catch(() => {
        // TODO: handle error
      });
  } catch (err) {
    setError('Failed obtaining column names: ' + err);
  }
};

export default loadColumns;
