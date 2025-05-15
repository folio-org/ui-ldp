import get from 'lodash.get';
import Handlebars from 'handlebars';
import vocabularies from './vocabDescriptors';


async function fetchOptions(okapiKy, val) {
  let params;

  if (typeof val !== 'string') {
    params = val;
  } else {
    params = vocabularies[val];
    if (!params) {
      // eslint-disable-next-line no-console
      console.warn('no such controlled vocabulary: ', val);
      return [];
    }
  }

  console.log('considering fetchOptions', params);
  const searchParams = {};
  if (params.query && params.sortSpec) {
    searchParams.query = params.query + ' sortby ' + params.sortSpec;
  } else if (params.query) {
    searchParams.query = params.query;
  } else if (params.sortSpec) {
    searchParams.query = 'cql.allRecords=1 sortby ' + params.sortSpec;
  }
  if (params.limit) {
    searchParams.limit = params.limit;
  }
  console.log('searchParams =', searchParams);

  const resp = await okapiKy(params.wsapiPath, { throwHttpErrors: false, searchParams });
  console.log('resp =', resp);
  if (!resp.ok) {
    // eslint-disable-next-line no-console
    console.warn('cannot fetch controlled vocabulary: ', params, `-- status ${resp.status}:`, await resp.text());
    return [];
  }

  const json = await resp.json();
  console.log('json =', json);
  const data = get(json, params.resultPath);
  if (!data) {
    // eslint-disable-next-line no-console
    console.warn(`cannot extract controlled vocabulary ${params.resultPath} from response`, json);
    return [];
  }

  return data.map(record => ({
    value: record[params.queryField],
    label: Handlebars.compile(params.displaySpec)(record),
  }));
}


export default fetchOptions;
