var path = require("path");

/**
 * POST /ldp/db/query
 *
 * connection: keep-alive
 * host: folio-snapshot-load-okapi.dev.folio.org
 * proxy-connection: keep-alive
 * content-length: 190
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

  res.setHeader("date", "Thu, 30 Sep 2021 18:56:15 GMT");
  res.setHeader("content-type", "application/json");
  res.setHeader("transfer-encoding", "chunked");
  res.setHeader("connection", "keep-alive");
  res.setHeader("vary", "origin");
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-expose-headers", "location,X-Okapi-Trace,X-Okapi-Token,Authorization,X-Okapi-Request-Id,X-Okapi-Module-Id");
  res.setHeader("x-okapi-trace", "POST mod-ldp-0.0.3-SNAPSHOT.47 http://10.36.1.13:9173/ldp/db/query : 200 4018us");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("WyB7CiAgImlkIiA6ICI1Yjg1ZmUzMS03NWMyLTUyZDctOTc4Mi00ZDQ2MGFiOWIwNGQiLAogICJhY3RpdmUiIDogdHJ1ZSwKICAiYmFyY29kZSIgOiBudWxsLAogICJjcmVhdGVkX2RhdGUiIDogIjIwMjEtMDktMzBUMTY6MTk6MjMuMjU5KzAwOjAwIiwKICAiZW5yb2xsbWVudF9kYXRlIiA6IG51bGwsCiAgImV4cGlyYXRpb25fZGF0ZSIgOiBudWxsLAogICJwYXRyb25fZ3JvdXAiIDogIjM2ODRhNzg2LTY2NzEtNDI2OC04ZWQwLTlkYjgyZWJjYTYwYiIsCiAgInR5cGUiIDogbnVsbCwKICAidXBkYXRlZF9kYXRlIiA6ICIyMDIxLTA5LTMwVDE2OjE5OjIzLjI1OSswMDowMCIsCiAgInVzZXJuYW1lIiA6ICJkaWt1X2FkbWluIiwKICAiZGF0YSIgOiB7CiAgICAidHlwZSIgOiAianNvbiIsCiAgICAidmFsdWUiIDogIntcbiAgICBcImlkXCI6IFwiNWI4NWZlMzEtNzVjMi01MmQ3LTk3ODItNGQ0NjBhYjliMDRkXCIsXG4gICAgXCJhY3RpdmVcIjogdHJ1ZSxcbiAgICBcImNyZWF0ZWREYXRlXCI6IFwiMjAyMS0wOS0zMFQxNjoxOToyMy4yNTkrMDA6MDBcIixcbiAgICBcImRlcGFydG1lbnRzXCI6IFtdLFxuICAgIFwibWV0YWRhdGFcIjoge1xuICAgICAgICBcImNyZWF0ZWREYXRlXCI6IFwiMjAyMS0wOS0zMFQxNjoxNjowNS40NjArMDA6MDBcIixcbiAgICAgICAgXCJ1cGRhdGVkQnlVc2VySWRcIjogXCI1Yjg1ZmUzMS03NWMyLTUyZDctOTc4Mi00ZDQ2MGFiOWIwNGRcIixcbiAgICAgICAgXCJ1cGRhdGVkRGF0ZVwiOiBcIjIwMjEtMDktMzBUMTY6MTk6MjMuMjU0KzAwOjAwXCJcbiAgICB9LFxuICAgIFwicGF0cm9uR3JvdXBcIjogXCIzNjg0YTc4Ni02NjcxLTQyNjgtOGVkMC05ZGI4MmViY2E2MGJcIixcbiAgICBcInBlcnNvbmFsXCI6IHtcbiAgICAgICAgXCJhZGRyZXNzZXNcIjogW10sXG4gICAgICAgIFwiZW1haWxcIjogXCJhZG1pbkBkaWt1LmV4YW1wbGUub3JnXCIsXG4gICAgICAgIFwiZmlyc3ROYW1lXCI6IFwiRElLVVwiLFxuICAgICAgICBcImxhc3ROYW1lXCI6IFwiQURNSU5JU1RSQVRPUlwiXG4gICAgfSxcbiAgICBcInByb3h5Rm9yXCI6IFtdLFxuICAgIFwidXBkYXRlZERhdGVcIjogXCIyMDIxLTA5LTMwVDE2OjE5OjIzLjI1OSswMDowMFwiLFxuICAgIFwidXNlcm5hbWVcIjogXCJkaWt1X2FkbWluXCJcbn0iCiAgfQp9IF0=", "base64"));
  res.end();

  return __filename;
};
