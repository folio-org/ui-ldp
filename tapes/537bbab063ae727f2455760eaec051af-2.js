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
 * referer: http://localhost:3001/settings/ldp/limits
 * accept-encoding: gzip
 */

module.exports = function (req, res) {
  res.statusCode = 200;

  res.setHeader("date", "Thu, 30 Sep 2021 18:55:29 GMT");
  res.setHeader("content-type", "application/json");
  res.setHeader("transfer-encoding", "chunked");
  res.setHeader("connection", "keep-alive");
  res.setHeader("vary", "origin");
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-expose-headers", "location,X-Okapi-Trace,X-Okapi-Token,Authorization,X-Okapi-Request-Id,X-Okapi-Module-Id");
  res.setHeader("content-encoding", "gzip");
  res.setHeader("x-okapi-trace", "GET mod-configuration-5.8.0-SNAPSHOT.97 http://10.36.1.13:9133/configurations/entries.. : 200 3313us");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("H4sIAAAAAAAAAKrmAgAAAP//UlBQSs7PS8tML1ayUojmAgAAAP//", "base64"));
  res.write(new Buffer("lJAxT8MwEIX/y63U1cWxk9hjVQakCiFRJsJwjh0RKSGV40BRlP+O0xSYGFhO8nfP793dBI0FDVKh5bVERk4RE4msmDEkmJBUFDLLkxoVbKDr7di6qD/sH+JzNbqnbkHeVb23h6ZrwhB77o1M66J38KPbwDu146KaSrCuprENj6/9Rwm6hKSETQkdnX8JfqPb86n34QpxxbYZLtbHpQ6x9/wyL7O5QJYCgZ6g8o6Cs/tYYiZHnjBULMVjkulU6FRtcy5vEDXissaq3n0+Dc7fXc5hClm7NGG5rDiT3OZM5QVnwooMySiDwsaP48n+EVNoKTUvtkrkPzFX9X9j5vkLAAD//w==", "base64"));
  res.write(new Buffer("itUBxVpJfkliThA4kEFRZ6jDBQAAAP//", "base64"));
  res.write(new Buffer("UgCGeTEwJD3z0vKBItVoSgx1lNISk1OBsQEMIR1gsCWm5+UXl2QmgwVquWoBAAAA//8=", "base64"));
  res.write(new Buffer("AwCMHGnGDQIAAA==", "base64"));
  res.end();

  return __filename;
};
