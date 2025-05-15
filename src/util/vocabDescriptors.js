// Controlled vocabularies for use in forms generated for user to supply Report parameters
// See https://folio-org.atlassian.net/browse/UILDP-141
//
// There are some idiosyncrasies here, auch as the different `limit` values for different vocabs.
// This is to match how existing code fetches these values in the FOLIO settings.
//
const vocabDescriptors = {
  holdingsTypes: {
    wsapiPath: 'holdings-types',
    query: undefined,
    sortSpec: 'name',
    limit: 2000,
    resultPath: 'holdingsTypes',
    queryField: 'id',
    displaySpec: '{{name}}',
  },

  loanTypes: {
    // https://folio-snapshot-okapi.dev.folio.org/loan-types?query=cql.allRecords=1 sortby name&limit=2000
    wsapiPath: 'loan-types',
    query: undefined,
    sortSpec: 'name',
    limit: 2000,
    resultPath: 'loantypes',
    queryField: 'id',
    displaySpec: '{{name}}',
  },

  materialTypes: {
    // https://folio-snapshot-okapi.dev.folio.org/material-types?query=cql.allRecords=1%20sortby%20name&limit=2000
    wsapiPath: 'material-types',
    query: undefined,
    sortSpec: 'name',
    limit: 2000,
    resultPath: 'mtypes',
    queryField: 'id',
    displaySpec: '{{name}}',
  },

  statisticalCodes: {
    // https://folio-snapshot-okapi.dev.folio.org/statistical-codes?query=cql.allRecords=1 sortby code&limit=2000
    wsapiPath: 'statistical-codes',
    query: undefined,
    sortSpec: 'code',
    limit: 2000,
    resultPath: 'statisticalCodes',
    queryField: 'id',
    displaySpec: '{{name}}',
  },

  statisticalCodeTypes: {
    // https://folio-snapshot-okapi.dev.folio.org/statistical-code-types?query=cql.allRecords=1 &limit=500
    wsapiPath: 'statistical-code-types',
    query: undefined,
    sortSpec: undefined,
    limit: 500,
    resultPath: 'statisticalCodeTypes',
    queryField: 'id',
    displaySpec: '{{name}}',
  },

  locations: {
    // https://folio-snapshot-okapi.dev.folio.org/locations?limit=3000&query=cql.allRecords%3D1+sortby+name
    wsapiPath: 'locations',
    query: undefined,
    sortSpec: 'name',
    limit: 3000,
    resultPath: 'locations',
    queryField: 'id',
    displaySpec: '{{name}} ({{code}})',
  },

  acquisitionUnits: {
    // https://folio-snapshot-okapi.dev.folio.org/acquisitions-units/units?limit=2147483647&query=cql.allRecords%3D1 sortby name
    wsapiPath: 'acquisitions-units/units',
    query: undefined,
    sortSpec: 'name',
    limit: 2147483647,
    resultPath: 'acquisitionsUnits',
    queryField: 'id',
    displaySpec: '{{name}}',
  },

  patronGroups: {
    // https://folio-snapshot-okapi.dev.folio.org/groups?query=cql.allRecords=1 sortby group&limit=2000
    wsapiPath: 'groups',
    query: undefined,
    sortSpec: 'group',
    limit: 2000,
    resultPath: 'usergroups',
    queryField: 'id',
    displaySpec: '{{group}} ({{desc}})',
  },

  // There is no reason for anyone to use this, but it's a useful tech-demo for a more complex vocabulary
  savedQueries: {
    wsapiPath: 'settings/entries',
    query: 'scope=="ui-ldp.queries"',
    sortSpec: undefined, // sort on the client side by display string
    limit: 1000,
    resultPath: 'items',
    queryField: 'id',
    displaySpec: '{{value.META.displayName}}',
  },
};

export default vocabDescriptors;
