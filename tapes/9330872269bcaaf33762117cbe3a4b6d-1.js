var path = require("path");

/**
 * POST /configurations/entries
 *
 * connection: keep-alive
 * host: folio-snapshot-load-okapi.dev.folio.org
 * proxy-connection: keep-alive
 * content-length: 186
 * accept: application/json
 * x-okapi-tenant: diku
 * accept-language: en-US
 * x-okapi-token: eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkaWt1X2FkbWluIiwidXNlcl9pZCI6IjU4M2MwMzdmLTY4OGUtNTU0Ni04MDMwLTg5MTViNzdhOTI0NiIsImlhdCI6MTYzNTg2NTgyMiwidGVuYW50IjoiZGlrdSJ9.fKY6L90KCVT7qVlef0H6bT-5KI2-UnAoWFgTdojqjOQ
 * user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Cypress/7.7.0 Chrome/89.0.4328.0 Electron/12.0.0-beta.14 Safari/537.36
 * content-type: application/json
 * origin: http://localhost:3001
 * sec-fetch-site: same-site
 * sec-fetch-mode: cors
 * sec-fetch-dest: empty
 * referer: http://localhost:3001/settings/ldp/limits
 * accept-encoding: gzip
 */

module.exports = function (req, res) {
  res.statusCode = 201;

  res.setHeader("date", "Tue, 02 Nov 2021 15:10:48 GMT");
  res.setHeader("content-type", "application/json");
  res.setHeader("transfer-encoding", "chunked");
  res.setHeader("connection", "keep-alive");
  res.setHeader("vary", "origin");
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-expose-headers", "location,X-Okapi-Trace,X-Okapi-Token,Authorization,X-Okapi-Request-Id,X-Okapi-Module-Id");
  res.setHeader("location", "/configurations/entries/b66cedd3-148e-4787-8c0b-da0a28758009");
  res.setHeader("content-encoding", "gzip");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("H4sIAAAAAAAAAJSQsW6DMBCG9zwF8tq4OhsMhrFKh0pRVanpVDoYfKRIECJj2lSIdy/YRJmz3PDd/fedbtwEAak1CbKAFHFcotYhZZFEGiUyobKEgmoFistESICUbJdA2+mhQRfa7948K7tTVR9fVeu5wbIzel+3te39AJ5U0aBTWTOgYz+qGfz8mBONlRoa+/7d/eYkywnLyTYnrbrcCFzR8+XcGbtC8FjXvTMcltrPvc+vab0XrdLKqsU0zmA516CyqHdzcX4OnFHGKPADExmDLJKPXKQPABmA23ILPf199Ghe/NeEDEsIk4rGcv6aEFFMJYRAZcpEkSQq5VF8zQ9nfb90Dd0vnePTZvoHAAD//wMAn7xPx+IBAAA=", "base64"));
  res.end();

  return __filename;
};
