import stripesFetch from './stripesFetch';

const loadColumns = async (intl, stripes, schema, tableName, setColumns, setError) => {
  try {
    const resp = await stripesFetch(stripes, `/ldp/db/columns?schema=${schema}&table=${tableName}`);
    if (!resp.ok) {
      throw new Error(intl.formatMessage(
        { id: 'ui-ldp.error.http' },
        { status: resp.status, text: resp.statusText },
      ));
    }

    resp
      .json()
      .then(jsonResp => {
        setColumns({
          list: jsonResp.map(c => c.columnName),
          options: jsonResp.map(c => ({ value: c.columnName, label: c.columnName }))
        });
      })
      .catch(error => {
        setError(intl.formatMessage(
          { id: 'ui-ldp.error.fetch-reject' },
          { error: error.toString() },
        ));
      });
  } catch (error) {
    setError(intl.formatMessage(
      { id: 'ui-ldp.error.load-columns' },
      { error: error.toString() },
    ));
  }
};

export default loadColumns;
