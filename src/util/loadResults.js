import cloneDeep from 'lodash.clonedeep';
import { v4 as uuidv4 } from 'uuid';
import stripesFetch from './stripesFetch';

const loadResults = async (intl, stripes, values, setQueryResponse, setError) => {
  try {
    const limit = values.tables[0].limit;
    const modifiedValues = cloneDeep(values);
    modifiedValues.tables[0].limit = parseInt(limit, 10) + 1;

    const resp = await stripesFetch(stripes, '/ldp/db/query', {
      method: 'POST',
      body: JSON.stringify(modifiedValues),
    });
    if (!resp.ok) {
      throw new Error(intl.formatMessage(
        { id: 'ui-ldp.error.http' },
        { status: resp.status, text: resp.statusText },
      ));
    }

    resp
      .json()
      .then(jsonResp => {
        jsonResp.forEach(v => { delete v.data; });
        const isComplete = jsonResp.length < limit;

        if (!isComplete) {
          let firstField;

          // ### I don't know if this is guaranteed to work, but it seems to
          Object.keys(jsonResp[0]).forEach(key => {
            if (!firstField) firstField = key;
          });

          jsonResp[jsonResp.length - 1] = {
            [firstField]: '... More records ...',
          };
        }

        setQueryResponse({
          key: uuidv4(),
          count: isComplete ? jsonResp.length : limit,
          isComplete,
          resp: jsonResp,
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
      { id: 'ui-ldp.error.load-results' },
      { error: error.toString() },
    ));
  }
};

export default loadResults;
