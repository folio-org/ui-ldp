var path = require("path");

/**
 * GET /configurations/entries?query=("configName"=="localeSettings" AND "module"=="@folio/stripes-core" and userId=="98e54205-3bed-5ef7-b22f-971028c25cb3")
 *
 * connection: keep-alive
 * host: folio-snapshot-okapi.dev.folio.org
 * proxy-connection: keep-alive
 * x-okapi-tenant: diku
 * x-okapi-token: eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkaWt1X2FkbWluIiwidXNlcl9pZCI6Ijk4ZTU0MjA1LTNiZWQtNWVmNy1iMjJmLTk3MTAyOGMyNWNiMyIsInR5cGUiOiJhY2Nlc3MiLCJpYXQiOjE2NDM4MjQxMjQsInRlbmFudCI6ImRpa3UifQ.muoNJftK7GH2hInrD1bfzFcCmRltZX33SsFh8GwPsuk
 * user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Cypress/7.7.0 Chrome/89.0.4328.0 Electron/12.0.0-beta.14 Safari/537.36
 * content-type: application/json
 * accept: * / *
 * origin: http://localhost:3001
 * sec-fetch-site: same-site
 * sec-fetch-mode: cors
 * sec-fetch-dest: empty
 * referer: http://localhost:3001/
 * accept-encoding: gzip
 * accept-language: en-GB
 */

module.exports = function (req, res) {
  res.statusCode = 200;

  res.setHeader("date", "Wed, 02 Feb 2022 17:48:45 GMT");
  res.setHeader("content-type", "application/json");
  res.setHeader("transfer-encoding", "chunked");
  res.setHeader("connection", "keep-alive");
  res.setHeader("vary", "origin");
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-expose-headers", "location,X-Okapi-Trace,X-Okapi-Token,Authorization,X-Okapi-Request-Id,X-Okapi-Module-Id");
  res.setHeader("content-encoding", "gzip");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("H4sIAAAAAAAAAKrmAgAAAP//", "base64"));
  res.write(new Buffer("UlBQSs7PS8tML1ayUojmAgAAAP//itXhAgAAAP//AoqU5Jck5gSlJucXpYCEDXS4AAAAAP//", "base64"));
  res.write(new Buffer("AgoWpRaX5pR45qXlA4Wq0dQY6CilJSanlgCZ0bE6SimZiel5+cUlmclggVquWgAAAAD//wMAUgpboWoAAAA=", "base64"));
  res.end();

  return __filename;
};
