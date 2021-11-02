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

  res.setHeader("date", "Tue, 02 Nov 2021 15:10:53 GMT");
  res.setHeader("content-type", "application/json");
  res.setHeader("transfer-encoding", "chunked");
  res.setHeader("connection", "keep-alive");
  res.setHeader("vary", "origin");
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-expose-headers", "location,X-Okapi-Trace,X-Okapi-Token,Authorization,X-Okapi-Request-Id,X-Okapi-Module-Id");
  res.setHeader("content-encoding", "gzip");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("H4sIAAAAAAAAAKrmAgAAAP//UlBQSs7PS8tML1ayUojmAgAAAP//lJBfS8MwFMW/S15dxk3atGkfZT4IQwTnk5WRNrcz0K4zf3Qy9t1NNhniw8CXCzn3d88h50CMJjVpi6JDrTPKcok0L2VJZQct1QoUl6WQABWZkXHSYcDILxeP8Xk2elBjkix2k9VLMxrv4g63qh0wensbcEY+1BASdWiIxl6FwT+9TZ8NqRvCABoya8io9r+1i3i3303WX+Szro07+a/SdHH50pB+Gsy0tphws91Qi+8BnXdr43F0p7O/SHBo3VppbdE5vMZs7BR2EXg9ph7QK628IvWBdBaVR72II/6PA2eUMQp8xUTNoM7lnIvqBqAGSJWd6duv5+h6n6oXMusgK3tayFi9EHlBJWRAZcVEW5aq4nkRD8NOX4sRfJ4zcYn5of8bczx+AwAA//8=", "base64"));
  res.write(new Buffer("itUBpZCS/JLEnCBwhIKSiaEOFwAAAP//", "base64"));
  res.write(new Buffer("UgDGbzEw1jzz0vKBItVoSgx1lNISk1OBMW8VHasDjJ3E9Lz84pLMZLBALVctAAAA//8=", "base64"));
  res.write(new Buffer("AwA299Q2eQIAAA==", "base64"));
  res.end();

  return __filename;
};
