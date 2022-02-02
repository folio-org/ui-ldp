var path = require("path");

/**
 * GET /configurations/entries?query=(module==LDP and configName==recordLimits)
 *
 * connection: keep-alive
 * host: folio-snapshot-okapi.dev.folio.org
 * proxy-connection: keep-alive
 * accept: application/json
 * x-okapi-tenant: diku
 * accept-language: en-US
 * x-okapi-token: eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkaWt1X2FkbWluIiwidXNlcl9pZCI6Ijk4ZTU0MjA1LTNiZWQtNWVmNy1iMjJmLTk3MTAyOGMyNWNiMyIsInR5cGUiOiJhY2Nlc3MiLCJpYXQiOjE2NDM4MjQwNzEsInRlbmFudCI6ImRpa3UifQ.kXV7Vk3ZcxaT6BH1xjAuuNnYTDc7Cqlblb4twp6ptPc
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

  res.setHeader("date", "Wed, 02 Feb 2022 17:48:22 GMT");
  res.setHeader("content-type", "application/json");
  res.setHeader("transfer-encoding", "chunked");
  res.setHeader("connection", "keep-alive");
  res.setHeader("vary", "origin");
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-expose-headers", "location,X-Okapi-Trace,X-Okapi-Token,Authorization,X-Okapi-Request-Id,X-Okapi-Module-Id");
  res.setHeader("content-encoding", "gzip");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("H4sIAAAAAAAAAKrmAgAAAP//", "base64"));
  res.write(new Buffer("UlBQSs7PS8tML1ayUojmAgAAAP//lJFfS8MwFMW/S15dRpI2a5tHmQ/CEGHzycpIe29noF1n/szJ2Hc32WSIoCCECzn3d88hN0digCjCK10WWcUocChpnmtBywpaKtqG67yYScE5mZBhhNBj5Bfzx3i9GD3oIUkW29HCwgzGu9jDrW56jN7eBpyQve5Doo41Aex06P3ydXyviaoJZ6wmk5oM+vBdu4p3h91o/VW+6GDc2X+VqovN55p0Y2/GtcWEm+2GWnwL6LxbG4+DO4/9RIJD69YawKJz+BezsWPYReAlEtHWGnRLvUeI0eyUVoNeg/aaqCNpLWqPMI8lPlkwIShLZ8VniheK5dOKZTeMKcbSFi/07cdTDLpPv1GVKHPBJM0aBCqxK2gjREergjNRtkK2TRYHww5+iSlUXirBplLOrjFf9H9jTqdPAAAA//8=", "base64"));
  res.write(new Buffer("itXhAgAAAP//", "base64"));
  res.write(new Buffer("AiaakvySxJwgcByDUo6hDhcAAAD//w==", "base64"));
  res.write(new Buffer("AgoCQw0Yk555aflAoWo0NYY6SmmJyanA1GAVHasDjLHE9Lz84pLMZLBALVctAAAA//8=", "base64"));
  res.write(new Buffer("AwC232ZTjQIAAA==", "base64"));
  res.end();

  return __filename;
};
