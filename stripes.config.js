module.exports = {
  okapi: { url: 'https://folio-snapshot-okapi.dev.folio.org', tenant: 'diku' },
  config: {
    showHomeLink: true,
    // modLdpUrl: 'http://localhost:8080/http://localhost:8001',
    // showDevInfo: true,
  },
  modules: {
    '@folio/ldp': {},
  },
};
