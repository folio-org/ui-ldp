import cloneDeep from 'lodash.clonedeep';
import { v4 as uuidv4 } from 'uuid';
import loadData from './loadData';

const loadResults = async (intl, stripes, values, setQueryResponse, setError, limit) => {
  // eslint-disable-next-line no-param-reassign
  if (limit === undefined) limit = values.tables[0].limit;

  function setData(raw) {
    raw.forEach(v => { delete v.data; });
    const isComplete = raw.length < limit;

    if (!isComplete) {
      let firstField;

      // ### I don't know if this is guaranteed to work, but it seems to
      Object.keys(raw[0]).forEach(key => {
        if (!firstField) firstField = key;
      });

      raw[raw.length - 1] = {
        [firstField]: '... More records ...',
      };
    }

    setQueryResponse({
      key: uuidv4(),
      count: isComplete ? raw.length : limit,
      isComplete,
      resp: raw,
    });
  }

  const modifiedValues = cloneDeep(values);
  delete modifiedValues.META;
  // Send a limit value one greater than what the user specified
  modifiedValues.tables[0].limit = parseInt(limit, 10) + 1;

  loadData(intl, stripes, 'results', '/ldp/db/query', setData, setError, {
    method: 'POST',
    body: JSON.stringify(modifiedValues),
  });
};

export default loadResults;
