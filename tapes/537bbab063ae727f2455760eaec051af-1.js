var path = require("path");

/**
 * GET /configurations/entries?query=(module==LDP and configName==recordLimits)
 *
 * connection: keep-alive
 * host: folio-snapshot-load-okapi.dev.folio.org
 * proxy-connection: keep-alive
 * x-okapi-tenant: diku
 * x-okapi-token: eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkaWt1X2FkbWluIiwidXNlcl9pZCI6IjViODVmZTMxLTc1YzItNTJkNy05NzgyLTRkNDYwYWI5YjA0ZCIsImlhdCI6MTYzMzAyODEwMiwidGVuYW50IjoiZGlrdSJ9.DpM7OGh6sPskRS5i4FPvLGgo6B87-TpPOExqfCU_HUA
 * user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Cypress/7.7.0 Chrome/89.0.4328.0 Electron/12.0.0-beta.14 Safari/537.36
 * content-type: application/json
 * accept: * / *
 * origin: http://localhost:3001
 * sec-fetch-site: same-site
 * sec-fetch-mode: cors
 * sec-fetch-dest: empty
 * referer: http://localhost:3001/ldp
 * accept-encoding: gzip
 * accept-language: en-GB
 */

module.exports = function (req, res) {
  res.statusCode = 200;

  res.setHeader("date", "Thu, 30 Sep 2021 18:55:05 GMT");
  res.setHeader("content-type", "application/json");
  res.setHeader("transfer-encoding", "chunked");
  res.setHeader("connection", "keep-alive");
  res.setHeader("vary", "origin");
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-expose-headers", "location,X-Okapi-Trace,X-Okapi-Token,Authorization,X-Okapi-Request-Id,X-Okapi-Module-Id");
  res.setHeader("content-encoding", "gzip");
  res.setHeader("x-okapi-trace", "GET mod-configuration-5.8.0-SNAPSHOT.97 http://10.36.1.13:9133/configurations/entries.. : 200 3478us");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("H4sIAAAAAAAAAKrmAgAAAP//", "base64"));
  res.write(new Buffer("UlBQSs7PS8tML1ayUojmAgAAAP//lJBBT4QwEIX/y1zdbqalpbRHsx5MNsbE9SQeBloiCcgGiq4h/HfLYogXD14m6Tev783MBLUDC8qgE5VCRt4Qk1yVrChIMqkoy1SqeYUGdtB2bmx81B8Pj/G5Gj1Qu6Del13vjnVbhyH2/DsVjY/eoR/9Dj6oGRfVlIPzFY1NeHrrPnOwOXDEHHY5tHT5zTZ4dzl3fdjwyl09XP1PSx1i8+V1Xgb0gRwFAjtB2XsK3h1iicECBWdoWIInntpE2sTstVA3iBZx2WVV3349D76/v96kyFTlE860KgVTwmlmdCaYdDJFKkyB0sWP49n9EZNZkVlM9hz1FvOj/m/MPH8DAAD//w==", "base64"));
  res.write(new Buffer("itUBRV1JfkliThA4pEHxZ6jDBQAAAP//", "base64"));
  res.write(new Buffer("UgAGfDEwOD3z0vKBItVoSgx1lNISk1OBUQIMIR1gsCWm5+UXl2QmgwVquWoBAAAA//8=", "base64"));
  res.write(new Buffer("AwDjJs6SEgIAAA==", "base64"));
  res.end();

  return __filename;
};
