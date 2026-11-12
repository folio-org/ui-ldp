module.exports = {
  okapi: {
    'url': 'https://folio-etesting-snapshot-kong.ci.folio.org',
    'uiUrl': 'https://localhost:3000',
    'authnUrl': 'https://folio-etesting-snapshot-keycloak.ci.folio.org',
    timeout: 30000,
    // tenant: 'diku'
  },
  config: {
    tenantOptions: {
      diku: { name: 'diku', clientId: 'diku-application' }
    },
    useSecureTokens: true,
    // showHomeLink: true,
  },
  modules: {
    '@folio/ldp': {},
  },
};
