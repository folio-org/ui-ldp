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
 * x-okapi-token: eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkaWt1X2FkbWluIiwidXNlcl9pZCI6IjViODVmZTMxLTc1YzItNTJkNy05NzgyLTRkNDYwYWI5YjA0ZCIsImlhdCI6MTYzMzAyODEwMiwidGVuYW50IjoiZGlrdSJ9.DpM7OGh6sPskRS5i4FPvLGgo6B87-TpPOExqfCU_HUA
 * user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Cypress/7.7.0 Chrome/89.0.4328.0 Electron/12.0.0-beta.14 Safari/537.36
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

  res.setHeader("date", "Thu, 30 Sep 2021 18:55:38 GMT");
  res.setHeader("content-type", "application/json");
  res.setHeader("transfer-encoding", "chunked");
  res.setHeader("connection", "keep-alive");
  res.setHeader("vary", "origin");
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-expose-headers", "location,X-Okapi-Trace,X-Okapi-Token,Authorization,X-Okapi-Request-Id,X-Okapi-Module-Id");
  res.setHeader("content-encoding", "gzip");
  res.setHeader("x-okapi-trace", "GET mod-configuration-5.8.0-SNAPSHOT.97 http://10.36.1.13:9133/configurations/entries.. : 200 3384us");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("H4sIAAAAAAAAAKrmAgAAAP//UlBQSs7PS8tML1ayUojmAgAAAP//", "base64"));
  res.write(new Buffer("lJBPT4QwEMW/y1zdbob+obRHsx5MNsbE9SQeBloiCcgGiq4hfHfLYogXD14m6W9e35uZCWoHFpRBxyuFjLwhJhNVsqIgyaSiLFOpTio0sIO2c2Pjo/54eIzP1eiB2gX1vux6d6zbOgyx59+paHz0Dv3od/BBzbiophycr2hswtNb95mDzSFBzGGXQ0uX32yDd5dz14cNr9zVw9X/tNQhNl9e52VAH8hRILATlL2n4N0hlhjMkScMDRN4SlIrpBVmr7m6QbSIyy6r+vbrefD9/fUmRaYqLxKmVcmZ4k4zozPOpJMpUmEKlC5+HM/uj5jMKmWF3nOht5gf9X9j5vkbAAD//w==", "base64"));
  res.write(new Buffer("itUBRV1JfkliThA4pEHxZ6jDBQAAAP//", "base64"));
  res.write(new Buffer("UgAGfDEwOD3z0vKBItVoSgx1lNISk1OBUQIMIR1gsCWm5+UXl2QmgwVquWoBAAAA//8=", "base64"));
  res.write(new Buffer("AwAMBYp0EgIAAA==", "base64"));
  res.end();

  return __filename;
};
