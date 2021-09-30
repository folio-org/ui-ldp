var path = require("path");

/**
 * GET /ldp/db/columns?schema=public&table=user_users
 *
 * connection: keep-alive
 * host: folio-snapshot-load-okapi.dev.folio.org
 * proxy-connection: keep-alive
 * x-okapi-tenant: diku
 * x-okapi-token: eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkaWt1X2FkbWluIiwidXNlcl9pZCI6IjViODVmZTMxLTc1YzItNTJkNy05NzgyLTRkNDYwYWI5YjA0ZCIsImlhdCI6MTYzMzAyODE1OCwidGVuYW50IjoiZGlrdSJ9.tlnR9tVL5k1TC_IHXZiqVY0xaCV7hFKG6XyZZsFx74Q
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

  res.setHeader("date", "Thu, 30 Sep 2021 18:56:08 GMT");
  res.setHeader("content-type", "application/json");
  res.setHeader("transfer-encoding", "chunked");
  res.setHeader("connection", "keep-alive");
  res.setHeader("vary", "origin");
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-expose-headers", "location,X-Okapi-Trace,X-Okapi-Token,Authorization,X-Okapi-Request-Id,X-Okapi-Module-Id");
  res.setHeader("x-okapi-trace", "GET mod-authtoken-2.10.0-SNAPSHOT.92 http://10.36.1.13:9177/ldp/db/columns.. : 202 48603us, GET mod-ldp-0.0.3-SNAPSHOT.47 http://10.36.1.13:9173/ldp/db/columns.. : 200 9122us");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("WyB7CiAgImNvbHVtbk5hbWUiIDogImlkIiwKICAiZGF0YV90eXBlIiA6ICJjaGFyYWN0ZXIgdmFyeWluZyIsCiAgIm9yZGluYWxQb3NpdGlvbiIgOiAiMSIsCiAgInRhYmxlU2NoZW1hIiA6ICJwdWJsaWMiLAogICJ0YWJsZU5hbWUiIDogInVzZXJfdXNlcnMiCn0sIHsKICAiY29sdW1uTmFtZSIgOiAiYWN0aXZlIiwKICAiZGF0YV90eXBlIiA6ICJib29sZWFuIiwKICAib3JkaW5hbFBvc2l0aW9uIiA6ICIyIiwKICAidGFibGVTY2hlbWEiIDogInB1YmxpYyIsCiAgInRhYmxlTmFtZSIgOiAidXNlcl91c2VycyIKfSwgewogICJjb2x1bW5OYW1lIiA6ICJiYXJjb2RlIiwKICAiZGF0YV90eXBlIiA6ICJjaGFyYWN0ZXIgdmFyeWluZyIsCiAgIm9yZGluYWxQb3NpdGlvbiIgOiAiMyIsCiAgInRhYmxlU2NoZW1hIiA6ICJwdWJsaWMiLAogICJ0YWJsZU5hbWUiIDogInVzZXJfdXNlcnMiCn0sIHsKICAiY29sdW1uTmFtZSIgOiAiY3JlYXRlZF9kYXRlIiwKICAiZGF0YV90eXBlIiA6ICJ0aW1lc3RhbXAgd2l0aCB0aW1lIHpvbmUiLAogICJvcmRpbmFsUG9zaXRpb24iIDogIjQiLAogICJ0YWJsZVNjaGVtYSIgOiAicHVibGljIiwKICAidGFibGVOYW1lIiA6ICJ1c2VyX3VzZXJzIgp9LCB7CiAgImNvbHVtbk5hbWUiIDogImVucm9sbG1lbnRfZGF0ZSIsCiAgImRhdGFfdHlwZSIgOiAidGltZXN0YW1wIHdpdGggdGltZSB6b25lIiwKICAib3JkaW5hbFBvc2l0aW9uIiA6ICI1IiwKICAidGFibGVTY2hlbWEiIDogInB1YmxpYyIsCiAgInRhYmxlTmFtZSIgOiAidXNlcl91c2VycyIKfSwgewogICJjb2x1bW5OYW1lIiA6ICJleHBpcmF0aW9uX2RhdGUiLAogICJkYXRhX3R5cGUiIDogInRpbWVzdGFtcCB3aXRoIHRpbWUgem9uZSIsCiAgIm9yZGluYWxQb3NpdGlvbiIgOiAiNiIsCiAgInRhYmxlU2NoZW1hIiA6ICJwdWJsaWMiLAogICJ0YWJsZU5hbWUiIDogInVzZXJfdXNlcnMiCn0sIHsKICAiY29sdW1uTmFtZSIgOiAicGF0cm9uX2dyb3VwIiwKICAiZGF0YV90eXBlIiA6ICJjaGFyYWN0ZXIgdmFyeWluZyIsCiAgIm9yZGluYWxQb3NpdGlvbiIgOiAiNyIsCiAgInRhYmxlU2NoZW1hIiA6ICJwdWJsaWMiLAogICJ0YWJsZU5hbWUiIDogInVzZXJfdXNlcnMiCn0sIHsKICAiY29sdW1uTmFtZSIgOiAidHlwZSIsCiAgImRhdGFfdHlwZSIgOiAiY2hhcmFjdGVyIHZhcnlpbmciLAogICJvcmRpbmFsUG9zaXRpb24iIDogIjgiLAogICJ0YWJsZVNjaGVtYSIgOiAicHVibGljIiwKICAidGFibGVOYW1lIiA6ICJ1c2VyX3VzZXJzIgp9LCB7CiAgImNvbHVtbk5hbWUiIDogInVwZGF0ZWRfZGF0ZSIsCiAgImRhdGFfdHlwZSIgOiAidGltZXN0YW1wIHdpdGggdGltZSB6b25lIiwKICAib3JkaW5hbFBvc2l0aW9uIiA6ICI5IiwKICAidGFibGVTY2hlbWEiIDogInB1YmxpYyIsCiAgInRhYmxlTmFtZSIgOiAidXNlcl91c2VycyIKfSwgewogICJjb2x1bW5OYW1lIiA6ICJ1c2VybmFtZSIsCiAgImRhdGFfdHlwZSIgOiAiY2hhcmFjdGVyIHZhcnlpbmciLAogICJvcmRpbmFsUG9zaXRpb24iIDogIjEwIiwKICAidGFibGVTY2hlbWEiIDogInB1YmxpYyIsCiAgInRhYmxlTmFtZSIgOiAidXNlcl91c2VycyIKfSBd", "base64"));
  res.end();

  return __filename;
};
