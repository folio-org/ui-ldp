import { v4 as uuidv4 } from 'uuid';
import loadData from './loadData';

const loadReport = async (intl, stripes, url, params, setQueryResponse, setError, limit) => {
  function setData(raw) {
    const isComplete = raw.totalRecords < limit;

    if (!isComplete) {
      let firstField;

      // ### I don't know if this is guaranteed to work, but it seems to
      Object.keys(raw.records[0]).forEach(key => {
        if (!firstField) firstField = key;
      });

      raw.records.push({ [firstField]: intl.formatMessage({ id: 'ui-ldp.more-records' }) });
    }

    setQueryResponse({
      key: uuidv4(),
      count: raw.totalRecords,
      isComplete,
      resp: raw.records,
    });
  }

  loadData(intl, stripes, 'report', '/ldp/db/reports', setData, setError, {
    method: 'POST',
    body: JSON.stringify({ url, params, limit: parseInt(limit, 10) + 1 }),
  });
};

export default loadReport;
