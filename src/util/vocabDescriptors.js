// Controlled vocabularies for use in forms generated for user to supply Report parameters
// See https://folio-org.atlassian.net/browse/UILDP-141
//
const vocabularies = [
  {
    name: 'holdingsTypes',
    wsapiPath: 'holdings-types',
    query: undefined,
    sortSpec: 'name',
    limit: 2000,
    resultPath: 'holdingsTypes',
    queryField: 'id',
    displaySpec: '{{name}}',
  },
  {
    // https://folio-snapshot-okapi.dev.folio.org/locations?limit=3000&query=cql.allRecords%3D1+sortby+name
    name: 'locations',
    wsapiPath: 'locations',
    query: undefined,
    sortSpec: 'name',
    limit: 3000,
    resultPath: 'locations',
    queryField: 'id',
    displaySpec: '{{name}} ({{code}})',
  },
  {
    name: 'savedQueries',
    wsapiPath: 'settings/entries',
    query: 'scope=="ui-ldp.queries"',
    sortSpec: undefined, // sort on the client side by display string
    limit: 1000,
    resultPath: 'items',
    queryField: 'id',
    displaySpec: '{{value.META.displayName}}',
  },
];

export default vocabularies;
