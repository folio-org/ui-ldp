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
 * referer: http://localhost:3001/settings/ldp/limits
 * accept-encoding: gzip
 */

module.exports = function (req, res) {
  res.statusCode = 200;

  res.setHeader("date", "Tue, 02 Nov 2021 15:10:48 GMT");
  res.setHeader("content-type", "application/json");
  res.setHeader("transfer-encoding", "chunked");
  res.setHeader("connection", "keep-alive");
  res.setHeader("vary", "origin");
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-expose-headers", "location,X-Okapi-Trace,X-Okapi-Token,Authorization,X-Okapi-Request-Id,X-Okapi-Module-Id");
  res.setHeader("content-encoding", "gzip");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("H4sIAAAAAAAAAKrmAgAAAP//UlBQSs7PS8tML1ayUojmAgAAAP//", "base64"));
  res.write(new Buffer("lJBBT4QwEIX/y1ylZlooLT2a9WCyMSauJ/Ew0G4kAdmUomsI/91W1njeyyTzzZv32lmgs2CgKcvWWZszXmjHCqUV0y02zBKS0EpqxAoyGEY79y7q97un2G5GjzQk5F07ervvhi5MceY+qOld9A5+dhl8Uj8n1VKDdUea+/D8Pn7VYGrgNWQ1DHT+J/iH7s+n0YcLxA3bbvq1PqQ6xdnr25re5gJZCgRmgdY7Cs7uYomZAgVnnDMUBy4NR1PoWyGrG0SDmL6xqe++XybnH9I5pM5bzNWRlTqeQ8qiZBpzZLrislGKKlGUcXE+2StiLuprY9b1BwAA//8=", "base64"));
  res.write(new Buffer("itUBxVpJfkliThA4kEFRZ6jDBQAAAP//", "base64"));
  res.write(new Buffer("UgCGeTEwJD3z0vKBItVoSgx1lNISk1OBsQEMIR1gsCWm5+UXl2QmgwVquWoBAAAA//8=", "base64"));
  res.write(new Buffer("AwCgq9J+DQIAAA==", "base64"));
  res.end();

  return __filename;
};
