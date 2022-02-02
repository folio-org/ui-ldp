var path = require("path");

/**
 * GET /ldp/db/columns?schema=public&table=user_users
 *
 * connection: keep-alive
 * host: folio-snapshot-okapi.dev.folio.org
 * proxy-connection: keep-alive
 * x-okapi-tenant: diku
 * x-okapi-token: eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkaWt1X2FkbWluIiwidXNlcl9pZCI6Ijk4ZTU0MjA1LTNiZWQtNWVmNy1iMjJmLTk3MTAyOGMyNWNiMyIsInR5cGUiOiJhY2Nlc3MiLCJpYXQiOjE2NDM4MjQxMjQsInRlbmFudCI6ImRpa3UifQ.muoNJftK7GH2hInrD1bfzFcCmRltZX33SsFh8GwPsuk
 * user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Cypress/7.7.0 Chrome/89.0.4328.0 Electron/12.0.0-beta.14 Safari/537.36
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

  res.setHeader("date", "Wed, 02 Feb 2022 17:48:50 GMT");
  res.setHeader("content-type", "application/json");
  res.setHeader("transfer-encoding", "chunked");
  res.setHeader("connection", "keep-alive");
  res.setHeader("vary", "origin");
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-expose-headers", "location,X-Okapi-Trace,X-Okapi-Token,Authorization,X-Okapi-Request-Id,X-Okapi-Module-Id");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("WyB7CiAgImNvbHVtbk5hbWUiIDogImlkIiwKICAiZGF0YV90eXBlIiA6ICJjaGFyYWN0ZXIgdmFyeWluZyIsCiAgIm9yZGluYWxQb3NpdGlvbiIgOiAiMSIsCiAgInRhYmxlU2NoZW1hIiA6ICJwdWJsaWMiLAogICJ0YWJsZU5hbWUiIDogInVzZXJfdXNlcnMiCn0sIHsKICAiY29sdW1uTmFtZSIgOiAiYWN0aXZlIiwKICAiZGF0YV90eXBlIiA6ICJib29sZWFuIiwKICAib3JkaW5hbFBvc2l0aW9uIiA6ICIyIiwKICAidGFibGVTY2hlbWEiIDogInB1YmxpYyIsCiAgInRhYmxlTmFtZSIgOiAidXNlcl91c2VycyIKfSwgewogICJjb2x1bW5OYW1lIiA6ICJiYXJjb2RlIiwKICAiZGF0YV90eXBlIiA6ICJjaGFyYWN0ZXIgdmFyeWluZyIsCiAgIm9yZGluYWxQb3NpdGlvbiIgOiAiMyIsCiAgInRhYmxlU2NoZW1hIiA6ICJwdWJsaWMiLAogICJ0YWJsZU5hbWUiIDogInVzZXJfdXNlcnMiCn0sIHsKICAiY29sdW1uTmFtZSIgOiAiY3JlYXRlZF9kYXRlIiwKICAiZGF0YV90eXBlIiA6ICJ0aW1lc3RhbXAgd2l0aCB0aW1lIHpvbmUiLAogICJvcmRpbmFsUG9zaXRpb24iIDogIjQiLAogICJ0YWJsZVNjaGVtYSIgOiAicHVibGljIiwKICAidGFibGVOYW1lIiA6ICJ1c2VyX3VzZXJzIgp9LCB7CiAgImNvbHVtbk5hbWUiIDogImVucm9sbG1lbnRfZGF0ZSIsCiAgImRhdGFfdHlwZSIgOiAidGltZXN0YW1wIHdpdGggdGltZSB6b25lIiwKICAib3JkaW5hbFBvc2l0aW9uIiA6ICI1IiwKICAidGFibGVTY2hlbWEiIDogInB1YmxpYyIsCiAgInRhYmxlTmFtZSIgOiAidXNlcl91c2VycyIKfSwgewogICJjb2x1bW5OYW1lIiA6ICJleHBpcmF0aW9uX2RhdGUiLAogICJkYXRhX3R5cGUiIDogInRpbWVzdGFtcCB3aXRoIHRpbWUgem9uZSIsCiAgIm9yZGluYWxQb3NpdGlvbiIgOiAiNiIsCiAgInRhYmxlU2NoZW1hIiA6ICJwdWJsaWMiLAogICJ0YWJsZU5hbWUiIDogInVzZXJfdXNlcnMiCn0sIHsKICAiY29sdW1uTmFtZSIgOiAicGF0cm9uX2dyb3VwIiwKICAiZGF0YV90eXBlIiA6ICJjaGFyYWN0ZXIgdmFyeWluZyIsCiAgIm9yZGluYWxQb3NpdGlvbiIgOiAiNyIsCiAgInRhYmxlU2NoZW1hIiA6ICJwdWJsaWMiLAogICJ0YWJsZU5hbWUiIDogInVzZXJfdXNlcnMiCn0sIHsKICAiY29sdW1uTmFtZSIgOiAidHlwZSIsCiAgImRhdGFfdHlwZSIgOiAiY2hhcmFjdGVyIHZhcnlpbmciLAogICJvcmRpbmFsUG9zaXRpb24iIDogIjgiLAogICJ0YWJsZVNjaGVtYSIgOiAicHVibGljIiwKICAidGFibGVOYW1lIiA6ICJ1c2VyX3VzZXJzIgp9LCB7CiAgImNvbHVtbk5hbWUiIDogInVwZGF0ZWRfZGF0ZSIsCiAgImRhdGFfdHlwZSIgOiAidGltZXN0YW1wIHdpdGggdGltZSB6b25lIiwKICAib3JkaW5hbFBvc2l0aW9uIiA6ICI5IiwKICAidGFibGVTY2hlbWEiIDogInB1YmxpYyIsCiAgInRhYmxlTmFtZSIgOiAidXNlcl91c2VycyIKfSwgewogICJjb2x1bW5OYW1lIiA6ICJ1c2VybmFtZSIsCiAgImRhdGFfdHlwZSIgOiAiY2hhcmFjdGVyIHZhcnlpbmciLAogICJvcmRpbmFsUG9zaXRpb24iIDogIjEwIiwKICAidGFibGVTY2hlbWEiIDogInB1YmxpYyIsCiAgInRhYmxlTmFtZSIgOiAidXNlcl91c2VycyIKfSBd", "base64"));
  res.end();

  return __filename;
};
