var path = require("path");

/**
 * GET /configurations/entries?query=(module==LDP and configName==recordLimits)
 *
 * connection: keep-alive
 * host: folio-snapshot-load-okapi.dev.folio.org
 * proxy-connection: keep-alive
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
 * referer: http://localhost:3001/settings/ldp/tables
 * accept-encoding: gzip
 */

module.exports = function (req, res) {
  res.statusCode = 200;

  res.setHeader("date", "Tue, 02 Nov 2021 15:10:50 GMT");
  res.setHeader("content-type", "application/json");
  res.setHeader("transfer-encoding", "chunked");
  res.setHeader("connection", "keep-alive");
  res.setHeader("vary", "origin");
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-expose-headers", "location,X-Okapi-Trace,X-Okapi-Token,Authorization,X-Okapi-Request-Id,X-Okapi-Module-Id");
  res.setHeader("content-encoding", "gzip");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("H4sIAAAAAAAAAKrmAgAAAP//UlBQSs7PS8tML1ayUojmAgAAAP//", "base64"));
  res.write(new Buffer("lJBBS8QwEIX/y1zdLJO0adIcZT0IiwiuJ+th2mSx0NolTXWl9L+bWFk9CV4G5ps37yUzQ2vBQF0UjbM2YzzXjuVKK6YbrJklJKGV1IglbKAf7NS5qN/v7mO7Gt1Rn5B3zeDtvu3bMMaZe6W6c9E7+Mlt4I26KanmCqw70tSFh5fhvQJTAUesYFNBT+ff7AJvzqfBhwteuW3HL/9DqmMcPj0v6YEukKVAYGZovKPg7C6WGCxQcMY5Q3Hg0nA0ud4KWV4hGsT0l1V9/fE4On+bbiJ11mCmjqzQ8SZS5gXTmCHTJZe1UlSKvIiL08n+FSNxK8ufmG/1f2OW5RMAAP//", "base64"));
  res.write(new Buffer("itUBRV1JfkliThA4pEHxZ6jDBQAAAP//", "base64"));
  res.write(new Buffer("UgAGfDEwOD3z0vKBItVoSgx1lNISk1OBUQIMIR1gsCWm5+UXl2QmgwVquWoBAAAA//8=", "base64"));
  res.write(new Buffer("AwBSzuZ0EgIAAA==", "base64"));
  res.end();

  return __filename;
};
