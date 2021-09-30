var path = require("path");

/**
 * PUT /configurations/entries/590d2f50-ae9a-415c-bba4-45a885671f09
 *
 * connection: keep-alive
 * host: folio-snapshot-load-okapi.dev.folio.org
 * proxy-connection: keep-alive
 * content-length: 206
 * accept: text/plain
 * x-okapi-tenant: diku
 * accept-language: en-US
 * x-okapi-token: eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkaWt1X2FkbWluIiwidXNlcl9pZCI6IjViODVmZTMxLTc1YzItNTJkNy05NzgyLTRkNDYwYWI5YjA0ZCIsImlhdCI6MTYzMzAyODEwMiwidGVuYW50IjoiZGlrdSJ9.DpM7OGh6sPskRS5i4FPvLGgo6B87-TpPOExqfCU_HUA
 * user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Cypress/7.7.0 Chrome/89.0.4328.0 Electron/12.0.0-beta.14 Safari/537.36
 * content-type: application/json
 * origin: http://localhost:3001
 * sec-fetch-site: same-site
 * sec-fetch-mode: cors
 * sec-fetch-dest: empty
 * referer: http://localhost:3001/settings/ldp/limits
 * accept-encoding: gzip
 */

module.exports = function (req, res) {
  res.statusCode = 204;

  res.setHeader("date", "Thu, 30 Sep 2021 18:55:30 GMT");
  res.setHeader("connection", "keep-alive");
  res.setHeader("vary", "origin");
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-expose-headers", "location,X-Okapi-Trace,X-Okapi-Token,Authorization,X-Okapi-Request-Id,X-Okapi-Module-Id");
  res.setHeader("x-okapi-trace", "PUT mod-configuration-5.8.0-SNAPSHOT.97 http://10.36.1.13:9133/configurations/entries/590d2f50-ae9a-415c-bba4-45a885671f09 : 204 3343us");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.end();

  return __filename;
};
