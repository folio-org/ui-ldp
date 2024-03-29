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
 * referer: http://localhost:3001/settings/ldp/limits
 * accept-encoding: gzip
 */

module.exports = function (req, res) {
  res.statusCode = 200;

  res.setHeader("date", "Wed, 02 Feb 2022 17:48:16 GMT");
  res.setHeader("content-type", "application/json");
  res.setHeader("transfer-encoding", "chunked");
  res.setHeader("connection", "keep-alive");
  res.setHeader("vary", "origin");
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-expose-headers", "location,X-Okapi-Trace,X-Okapi-Token,Authorization,X-Okapi-Request-Id,X-Okapi-Module-Id");
  res.setHeader("content-encoding", "gzip");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("H4sIAAAAAAAAAKrmAgAAAP//", "base64"));
  res.write(new Buffer("UlBQSs7PS8tML1ayUojmAgAAAP//lJBBT8MwDIX/S64sk5M2S5sjGgekCSFtnCgHt/ZEpZaONB1D0/47CRtw4jApspTPL+/ZOYqWhBOqxMJmJUhSVMg8Ry2Lkhqpm1phbhdGKyVmoh9o6jjqV8vHeD0bPWCfkOdm8LRq+zaMscdvWHccvYOfeCb22E1JdawE8RanLqxfh49KuEqoSswq0ePhj8APujvsBh8uEM6Y2vHbepPqGHvPL5G+T+xbHte4Z4oMTmlcDkgYULijaDxjYFrGEsfQoLWEdDZq4ZR1kM9LyG4AHEDa7Ky+/Xwa2d+nHyoLNrkGI7OaSRreWllrvZWlVaCLRpumzuLDaUf/xFiXF04t5sbY35iL+tqY0+kLAAD//w==", "base64"));
  res.write(new Buffer("itXhAgAAAP//", "base64"));
  res.write(new Buffer("AkZkSX5JYk4QONxBsWmowwUAAAD//w==", "base64"));
  res.write(new Buffer("AgoWpRYDQ9czLy0fKFSNpsZQRyktMTkVGEOgUAMGZWJ6Xn5xSWYyWKCWqxYAAAD//w==", "base64"));
  res.write(new Buffer("AwB+Nng8IQIAAA==", "base64"));
  res.end();

  return __filename;
};
