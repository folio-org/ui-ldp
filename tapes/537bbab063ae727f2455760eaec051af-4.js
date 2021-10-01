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

  res.setHeader("date", "Thu, 30 Sep 2021 18:55:35 GMT");
  res.setHeader("content-type", "application/json");
  res.setHeader("transfer-encoding", "chunked");
  res.setHeader("connection", "keep-alive");
  res.setHeader("vary", "origin");
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-expose-headers", "location,X-Okapi-Trace,X-Okapi-Token,Authorization,X-Okapi-Request-Id,X-Okapi-Module-Id");
  res.setHeader("content-encoding", "gzip");
  res.setHeader("x-okapi-trace", "GET mod-configuration-5.8.0-SNAPSHOT.97 http://10.36.1.13:9133/configurations/entries.. : 200 3556us");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("H4sIAAAAAAAAAKrmAgAAAP//UlBQSs7PS8tML1ayUojmAgAAAP//lJBfS8MwFMW/S15dRpombZNHmQ/CEMH5ZGXcNrcz0K4zf3Qy9t1NNxkiKPhyIef+7jnkHIg1RBOpmOGdZBRQARWZbGnTgKBCQlXJosw6psiMDKOJPSZ+ubhPz7PRHQyT5LAdnVnawQafdriFpsfkHVzEGXmDPk7UoSYGO4h9eHgZ32uia5IxVpNZTQbYf9cu4s1+N7pwkc+6sf7kv5qmT8unmnRjb8e1wwm32w11+BrRB7+2AQd/OvuJRI/Or8EYh97jX8zGjXGXgOfj1AMGMBCA6ANpHUJAs0gj/Y8znlGmaM5WWaFzoXM1L7m8YkwzNlV2pq8/HpPr7an6ppId5hktZcup5Kakqqw4FUYUDBrVMGHSYdyZX2IqLaXO87ks1CXmi/5vzPH4CQAA//8=", "base64"));
  res.write(new Buffer("itUBpZCS/JLEnCBwhIKSiaEOFwAAAP//", "base64"));
  res.write(new Buffer("UgDGbzEw1jzz0vKBItVoSgx1lNISk1OBMW8VHasDjJ3E9Lz84pLMZLBALVctAAAA//8=", "base64"));
  res.write(new Buffer("AwBKkK8qeQIAAA==", "base64"));
  res.end();

  return __filename;
};
