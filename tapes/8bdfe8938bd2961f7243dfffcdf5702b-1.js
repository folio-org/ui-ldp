var path = require("path");

/**
 * GET /ldp/db/tables
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

  res.setHeader("date", "Thu, 30 Sep 2021 18:55:07 GMT");
  res.setHeader("content-type", "application/json");
  res.setHeader("transfer-encoding", "chunked");
  res.setHeader("connection", "keep-alive");
  res.setHeader("vary", "origin");
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-expose-headers", "location,X-Okapi-Trace,X-Okapi-Token,Authorization,X-Okapi-Request-Id,X-Okapi-Module-Id");
  res.setHeader("x-okapi-trace", "GET mod-authtoken-2.10.0-SNAPSHOT.92 http://10.36.1.13:9177/ldp/db/tables : 202 13665us, GET mod-ldp-0.0.3-SNAPSHOT.47 http://10.36.1.13:9173/ldp/db/tables : 200 10718us");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("WyB7CiAgInRhYmxlTmFtZSIgOiAidXNlcnNfZ3JvdXBzIiwKICAidGFibGVTY2hlbWEiIDogImZvbGlvX3JlcG9ydGluZyIKfSwgewogICJ0YWJsZU5hbWUiIDogImluc3RhbmNlX2V4dCIsCiAgInRhYmxlU2NoZW1hIiA6ICJmb2xpb19yZXBvcnRpbmciCn0sIHsKICAidGFibGVOYW1lIiA6ICJwb19wcm9kX2lkcyIsCiAgInRhYmxlU2NoZW1hIiA6ICJmb2xpb19yZXBvcnRpbmciCn0sIHsKICAidGFibGVOYW1lIiA6ICJpbnN0YW5jZV9mb3JtYXRzIiwKICAidGFibGVTY2hlbWEiIDogImZvbGlvX3JlcG9ydGluZyIKfSwgewogICJ0YWJsZU5hbWUiIDogImxvYW5zX3JlbmV3YWxfZGF0ZXMiLAogICJ0YWJsZVNjaGVtYSIgOiAiZm9saW9fcmVwb3J0aW5nIgp9LCB7CiAgInRhYmxlTmFtZSIgOiAiaW5zdGFuY2VfaWRlbnRpZmllcnMiLAogICJ0YWJsZVNjaGVtYSIgOiAiZm9saW9fcmVwb3J0aW5nIgp9LCB7CiAgInRhYmxlTmFtZSIgOiAicG9fbGluZXNfY29zdCIsCiAgInRhYmxlU2NoZW1hIiA6ICJmb2xpb19yZXBvcnRpbmciCn0sIHsKICAidGFibGVOYW1lIiA6ICJwb19saW5lc19kZXRhaWxzX3N1YnNjcmlwdGlvbiIsCiAgInRhYmxlU2NoZW1hIiA6ICJmb2xpb19yZXBvcnRpbmciCn0sIHsKICAidGFibGVOYW1lIiA6ICJsb2NhdGlvbnNfc2VydmljZV9wb2ludHMiLAogICJ0YWJsZVNjaGVtYSIgOiAiZm9saW9fcmVwb3J0aW5nIgp9LCB7CiAgInRhYmxlTmFtZSIgOiAiaW5zdGFuY2VfbGFuZ3VhZ2VzIiwKICAidGFibGVTY2hlbWEiIDogImZvbGlvX3JlcG9ydGluZyIKfSwgewogICJ0YWJsZU5hbWUiIDogImluc3RhbmNlX25hdHVyZV9jb250ZW50IiwKICAidGFibGVTY2hlbWEiIDogImZvbGlvX3JlcG9ydGluZyIKfSwgewogICJ0YWJsZU5hbWUiIDogImluc3RhbmNlX25vdGVzIiwKICAidGFibGVTY2hlbWEiIDogImZvbGlvX3JlcG9ydGluZyIKfSwgewogICJ0YWJsZU5hbWUiIDogImluc3RhbmNlX3B1YmxpY2F0aW9uIiwKICAidGFibGVTY2hlbWEiIDogImZvbGlvX3JlcG9ydGluZyIKfSwgewogICJ0YWJsZU5hbWUiIDogImluc3RhbmNlX3JlbGF0aW9uc2hpcHNfZXh0IiwKICAidGFibGVTY2hlbWEiIDogImZvbGlvX3JlcG9ydGluZyIKfSwgewogICJ0YWJsZU5hbWUiIDogImluc3RhbmNlX3NlcmllcyIsCiAgInRhYmxlU2NoZW1hIiA6ICJmb2xpb19yZXBvcnRpbmciCn0sIHsKICAidGFibGVOYW1lIiA6ICJpbnN0YW5jZV9zdGF0aXN0aWNhbF9jb2RlcyIsCiAgInRhYmxlU2NoZW1hIiA6ICJmb2xpb19yZXBvcnRpbmciCn0sIHsKICAidGFibGVOYW1lIiA6ICJwb19saW5lc19lcmVzb3VyY2UiLAogICJ0YWJsZVNjaGVtYSIgOiAiZm9saW9fcmVwb3J0aW5nIgp9LCB7CiAgInRhYmxlTmFtZSIgOiAiaW5zdGFuY2Vfc3ViamVjdHMiLAogICJ0YWJsZVNjaGVtYSIgOiAiZm9saW9fcmVwb3J0aW5nIgp9LCB7CiAgInRhYmxlTmFtZSIgOiAicG9fbGluZXNfZXJfbWF0X3R5cGUiLAogICJ0YWJsZVNjaGVtYSIgOiAiZm9saW9fcmVwb3J0aW5nIgp9LCB7CiAgInRhYmxlTmFtZSIgOiAiaW52b2ljZV9hZGp1c3RtZW50c19pbl9hZGRpdGlvbl90byIsCiAgInRhYmxlU2NoZW1hIiA6ICJmb2xpb19yZXBvcnRpbmciCn0sIHsKICAidGFibGVOYW1lIiA6ICJpbnZvaWNlX2FkanVzdG1lbnRzX2V4dCIsCiAgInRhYmxlU2NoZW1hIiA6ICJmb2xpb19yZXBvcnRpbmciCn0sIHsKICAidGFibGVOYW1lIiA6ICJpbnZvaWNlX2xpbmVzX2FkanVzdG1lbnRzIiwKICAidGFibGVTY2hlbWEiIDogImZvbGlvX3JlcG9ydGluZyIKfSwgewogICJ0YWJsZU5hbWUiIDogImludm9pY2VfbGluZXNfZnVuZF9kaXN0cmlidXRpb25zIiwKICAidGFibGVTY2hlbWEiIDogImZvbGlvX3JlcG9ydGluZyIKfSwgewogICJ0YWJsZU5hbWUiIDogIml0ZW1fZWZmZWN0aXZlX2NhbGxub19jb21wb25lbnRzIiwKICAidGFibGVTY2hlbWEiIDogImZvbGlvX3JlcG9ydGluZyIKfSwgewogICJ0YWJsZU5hbWUiIDogIml0ZW1fZWxlY3Ryb25pY19hY2Nlc3MiLAogICJ0YWJsZVNjaGVtYSIgOiAiZm9saW9fcmVwb3J0aW5nIgp9LCB7CiAgInRhYmxlTmFtZSIgOiAiaXRlbV9leHQiLAogICJ0YWJsZVNjaGVtYSIgOiAiZm9saW9fcmVwb3J0aW5nIgp9LCB7CiAgInRhYmxlTmFtZSIgOiAicG9fbGluZXNfbG9jYXRpb25zIiwKICAidGFibGVTY2hlbWEiIDogImZvbGlvX3JlcG9ydGluZyIKfSwgewogICJ0YWJsZU5hbWUiIDogIml0ZW1fbm90ZXMiLAogICJ0YWJsZVNjaGVtYSIgOiAiZm9saW9fcmVwb3J0aW5nIgp9LCB7CiAgInRhYmxlTmFtZSIgOiAiaXRlbXNfaG9sZGluZ3NfaW5zdGFuY2VzIiwKICAidGFibGVTY2hlbWEiIDogImZvbGlvX3JlcG9ydGluZyIKfSwgewogICJ0YWJsZU5hbWUiIDogIml0ZW1fc3RhdGlzdGljYWxfY29kZXMiLAogICJ0YWJsZVNjaGVtYSIgOiAiZm9saW9fcmVwb3J0aW5nIgp9LCB7CiAgInRhYmxlTmFtZSIgOiAibG9hbnNfcmVuZXdhbF9jb3VudCIsCiAgInRhYmxlU2NoZW1hIiA6ICJmb2xpb19yZXBvcnRpbmciCn0sIHsKICAidGFibGVOYW1lIiA6ICJsb2NhdGlvbnNfbGlicmFyaWVzIiwKICAidGFibGVTY2hlbWEiIDogImZvbGlvX3JlcG9ydGluZyIKfSwgewogICJ0YWJsZU5hbWUiIDogImxvYW5zX2l0ZW1zIiwKICAidGFibGVTY2hlbWEiIDogImZvbGlvX3JlcG9ydGluZyIKfSwgewogICJ0YWJsZU5hbWUiIDogInBvX2FjcV91bml0X2lkcyIsCiAgInRhYmxlU2NoZW1hIiA6ICJmb2xpb19yZXBvcnRpbmciCn0sIHsKICAidGFibGVOYW1lIiA6ICJob2xkaW5nc19lbGVjdHJvbmljX2FjY2VzcyIsCiAgInRhYmxlU2NoZW1hIiA6ICJmb2xpb19yZXBvcnRpbmciCn0sIHsKICAidGFibGVOYW1lIiA6ICJwb19pbnN0YW5jZSIsCiAgInRhYmxlU2NoZW1hIiA6ICJmb2xpb19yZXBvcnRpbmciCn0sIHsKICAidGFibGVOYW1lIiA6ICJob2xkaW5nc19leHQiLAogICJ0YWJsZVNjaGVtYSIgOiAiZm9saW9fcmVwb3J0aW5nIgp9LCB7CiAgInRhYmxlTmFtZSIgOiAiZmVlc2ZpbmVzX2FjY291bnRzX2FjdGlvbnMiLAogICJ0YWJsZVNjaGVtYSIgOiAiZm9saW9fcmVwb3J0aW5nIgp9LCB7CiAgInRhYmxlTmFtZSIgOiAiZmluYW5jZV90cmFuc2FjdGlvbl9wdXJjaGFzZV9vcmRlciIsCiAgInRhYmxlU2NoZW1hIiA6ICJmb2xpb19yZXBvcnRpbmciCn0sIHsKICAidGFibGVOYW1lIiA6ICJob2xkaW5nc19zdGF0ZW1lbnRzX3N1cHBsZW1lbnRzIiwKICAidGFibGVTY2hlbWEiIDogImZvbGlvX3JlcG9ydGluZyIKfSwgewogICJ0YWJsZU5hbWUiIDogInVzZXJzX2FkZHJlc3NlcyIsCiAgInRhYmxlU2NoZW1hIiA6ICJmb2xpb19yZXBvcnRpbmciCn0sIHsKICAidGFibGVOYW1lIiA6ICJwb19saW5lc19waHlzaWNhbCIsCiAgInRhYmxlU2NoZW1hIiA6ICJmb2xpb19yZXBvcnRpbmciCn0sIHsKICAidGFibGVOYW1lIiA6ICJwb19saW5lc19waHlzX21hdF90eXBlIiwKICAidGFibGVTY2hlbWEiIDogImZvbGlvX3JlcG9ydGluZyIKfSwgewogICJ0YWJsZU5hbWUiIDogImhvbGRpbmdzX3N0YXRlbWVudHNfaW5kZXhlcyIsCiAgInRhYmxlU2NoZW1hIiA6ICJmb2xpb19yZXBvcnRpbmciCn0sIHsKICAidGFibGVOYW1lIiA6ICJob2xkaW5nc19zdGF0ZW1lbnRzIiwKICAidGFibGVTY2hlbWEiIDogImZvbGlvX3JlcG9ydGluZyIKfSwgewogICJ0YWJsZU5hbWUiIDogInBvX2xpbmVzX3RhZ3MiLAogICJ0YWJsZVNjaGVtYSIgOiAiZm9saW9fcmVwb3J0aW5nIgp9LCB7CiAgInRhYmxlTmFtZSIgOiAicmVxdWVzdHNfaXRlbXMiLAogICJ0YWJsZVNjaGVtYSIgOiAiZm9saW9fcmVwb3J0aW5nIgp9LCB7CiAgInRhYmxlTmFtZSIgOiAiZmluYW5jZV90cmFuc2FjdGlvbl9pbnZvaWNlcyIsCiAgInRhYmxlU2NoZW1hIiA6ICJmb2xpb19yZXBvcnRpbmciCn0sIHsKICAidGFibGVOYW1lIiA6ICJ1c2Vyc19kZXBhcnRtZW50c191bnBhY2tlZCIsCiAgInRhYmxlU2NoZW1hIiA6ICJmb2xpb19yZXBvcnRpbmciCn0sIHsKICAidGFibGVOYW1lIiA6ICJwb19vcmdhbml6YXRpb24iLAogICJ0YWJsZVNjaGVtYSIgOiAiZm9saW9fcmVwb3J0aW5nIgp9LCB7CiAgInRhYmxlTmFtZSIgOiAiaG9sZGluZ3Nfbm90ZXMiLAogICJ0YWJsZVNjaGVtYSIgOiAiZm9saW9fcmVwb3J0aW5nIgp9LCB7CiAgInRhYmxlTmFtZSIgOiAiaW5zdGFuY2VfZWxlY3Ryb25pY19hY2Nlc3MiLAogICJ0YWJsZVNjaGVtYSIgOiAiZm9saW9fcmVwb3J0aW5nIgp9LCB7CiAgInRhYmxlTmFtZSIgOiAicG9fb25nb2luZyIsCiAgInRhYmxlU2NoZW1hIiA6ICJmb2xpb19yZXBvcnRpbmciCn0sIHsKICAidGFibGVOYW1lIiA6ICJpbnN0YW5jZV9lZGl0aW9ucyIsCiAgInRhYmxlU2NoZW1hIiA6ICJmb2xpb19yZXBvcnRpbmciCn0sIHsKICAidGFibGVOYW1lIiA6ICJob2xkaW5nc19zdGF0aXN0aWNhbF9jb2RlcyIsCiAgInRhYmxlU2NoZW1hIiA6ICJmb2xpb19yZXBvcnRpbmciCn0sIHsKICAidGFibGVOYW1lIiA6ICJpbnN0YW5jZV9hbHRlcm5hdGl2ZV90aXRsZXMiLAogICJ0YWJsZVNjaGVtYSIgOiAiZm9saW9fcmVwb3J0aW5nIgp9LCB7CiAgInRhYmxlTmFtZSIgOiAiaW5zdGFuY2VfY29udHJpYnV0b3JzIiwKICAidGFibGVTY2hlbWEiIDogImZvbGlvX3JlcG9ydGluZyIKfSwgewogICJ0YWJsZU5hbWUiIDogImNpcmN1bGF0aW9uX3BhdHJvbl9hY3Rpb25fc2Vzc2lvbnMiLAogICJ0YWJsZVNjaGVtYSIgOiAicHVibGljIgp9LCB7CiAgInRhYmxlTmFtZSIgOiAiY2lyY3VsYXRpb25fbG9hbl9wb2xpY2llcyIsCiAgInRhYmxlU2NoZW1hIiA6ICJwdWJsaWMiCn0sIHsKICAidGFibGVOYW1lIiA6ICJjaXJjdWxhdGlvbl9wYXRyb25fbm90aWNlX3BvbGljaWVzIiwKICAidGFibGVTY2hlbWEiIDogInB1YmxpYyIKfSwgewogICJ0YWJsZU5hbWUiIDogImNpcmN1bGF0aW9uX3JlcXVlc3RfcG9saWNpZXMiLAogICJ0YWJsZVNjaGVtYSIgOiAicHVibGljIgp9LCB7CiAgInRhYmxlTmFtZSIgOiAiY2lyY3VsYXRpb25fcmVxdWVzdF9wcmVmZXJlbmNlIiwKICAidGFibGVTY2hlbWEiIDogInB1YmxpYyIKfSwgewogICJ0YWJsZU5hbWUiIDogImNpcmN1bGF0aW9uX3JlcXVlc3RzIiwKICAidGFibGVTY2hlbWEiIDogInB1YmxpYyIKfSwgewogICJ0YWJsZU5hbWUiIDogImNpcmN1bGF0aW9uX3NjaGVkdWxlZF9ub3RpY2VzIiwKICAidGFibGVTY2hlbWEiIDogInB1YmxpYyIKfSwgewogICJ0YWJsZU5hbWUiIDogImNpcmN1bGF0aW9uX3N0YWZmX3NsaXBzIiwKICAidGFibGVTY2hlbWEiIDogInB1YmxpYyIKfSwgewogICJ0YWJsZU5hbWUiIDogImNvbmZpZ3VyYXRpb25fZW50cmllcyIsCiAgInRhYmxlU2NoZW1hIiA6ICJwdWJsaWMiCn0sIHsKICAidGFibGVOYW1lIiA6ICJjb3Vyc2VfY291cnNlbGlzdGluZ3MiLAogICJ0YWJsZVNjaGVtYSIgOiAicHVibGljIgp9LCB7CiAgInRhYmxlTmFtZSIgOiAiY291cnNlX2NvdXJzZXMiLAogICJ0YWJsZVNjaGVtYSIgOiAicHVibGljIgp9LCB7CiAgInRhYmxlTmFtZSIgOiAiY291cnNlX2RlcGFydG1lbnRzIiwKICAidGFibGVTY2hlbWEiIDogInB1YmxpYyIKfSwgewogICJ0YWJsZU5hbWUiIDogImNvdXJzZV9yZXNlcnZlcyIsCiAgInRhYmxlU2NoZW1hIiA6ICJwdWJsaWMiCn0sIHsKICAidGFibGVOYW1lIiA6ICJjb3Vyc2Vfcm9sZXMiLAogICJ0YWJsZVNjaGVtYSIgOiAicHVibGljIgp9LCB7CiAgInRhYmxlTmFtZSIgOiAiZmVlc2ZpbmVzX21hbnVhbGJsb2NrcyIsCiAgInRhYmxlU2NoZW1hIiA6ICJwdWJsaWMiCn0sIHsKICAidGFibGVOYW1lIiA6ICJmZWVzZmluZXNfcGF5bWVudHMiLAogICJ0YWJsZVNjaGVtYSIgOiAicHVibGljIgp9LCB7CiAgInRhYmxlTmFtZSIgOiAiZmVlc2ZpbmVzX293bmVycyIsCiAgInRhYmxlU2NoZW1hIiA6ICJwdWJsaWMiCn0sIHsKICAidGFibGVOYW1lIiA6ICJmZWVzZmluZXNfdHJhbnNmZXJzIiwKICAidGFibGVTY2hlbWEiIDogInB1YmxpYyIKfSwgewogICJ0YWJsZU5hbWUiIDogImZlZXNmaW5lc193YWl2ZXMiLAogICJ0YWJsZVNjaGVtYSIgOiAicHVibGljIgp9LCB7CiAgInRhYmxlTmFtZSIgOiAiZmluYW5jZV9idWRnZXRzIiwKICAidGFibGVTY2hlbWEiIDogInB1YmxpYyIKfSwgewogICJ0YWJsZU5hbWUiIDogImZpbmFuY2VfZmlzY2FsX3llYXJzIiwKICAidGFibGVTY2hlbWEiIDogInB1YmxpYyIKfSwgewogICJ0YWJsZU5hbWUiIDogImZpbmFuY2VfZ3JvdXBzIiwKICAidGFibGVTY2hlbWEiIDogInB1YmxpYyIKfSwgewogICJ0YWJsZU5hbWUiIDogImZpbmFuY2VfbGVkZ2VycyIsCiAgInRhYmxlU2NoZW1hIiA6ICJwdWJsaWMiCn0sIHsKICAidGFibGVOYW1lIiA6ICJpbnZlbnRvcnlfYWx0ZXJuYXRpdmVfdGl0bGVfdHlwZXMiLAogICJ0YWJsZVNjaGVtYSIgOiAicHVibGljIgp9LCB7CiAgInRhYmxlTmFtZSIgOiAiaW52ZW50b3J5X2NvbnRyaWJ1dG9yX25hbWVfdHlwZXMiLAogICJ0YWJsZVNjaGVtYSIgOiAicHVibGljIgp9LCB7CiAgInRhYmxlTmFtZSIgOiAiaW52ZW50b3J5X2hvbGRpbmdzX3R5cGVzIiwKICAidGFibGVTY2hlbWEiIDogInB1YmxpYyIKfSwgewogICJ0YWJsZU5hbWUiIDogImludmVudG9yeV9jb250cmlidXRvcl90eXBlcyIsCiAgInRhYmxlU2NoZW1hIiA6ICJwdWJsaWMiCn0sIHsKICAidGFibGVOYW1lIiA6ICJpbnZlbnRvcnlfaG9sZGluZ3Nfbm90ZV90eXBlcyIsCiAgInRhYmxlU2NoZW1hIiA6ICJwdWJsaWMiCn0sIHsKICAidGFibGVOYW1lIiA6ICJpbnZlbnRvcnlfaWxsX3BvbGljaWVzIiwKICAidGFibGVTY2hlbWEiIDogInB1YmxpYyIKfSwgewogICJ0YWJsZU5hbWUiIDogImludmVudG9yeV9pbnN0YW5jZV9mb3JtYXRzIiwKICAidGFibGVTY2hlbWEiIDogInB1YmxpYyIKfSwgewogICJ0YWJsZU5hbWUiIDogImludmVudG9yeV9pbnN0YW5jZV9yZWxhdGlvbnNoaXBzIiwKICAidGFibGVTY2hlbWEiIDogInB1YmxpYyIKfSwgewogICJ0YWJsZU5hbWUiIDogImludmVudG9yeV9pbnN0YW5jZV90eXBlcyIsCiAgInRhYmxlU2NoZW1hIiA6ICJwdWJsaWMiCn0sIHsKICAidGFibGVOYW1lIiA6ICJpbnZlbnRvcnlfbGlicmFyaWVzIiwKICAidGFibGVTY2hlbWEiIDogInB1YmxpYyIKfSwgewogICJ0YWJsZU5hbWUiIDogImludmVudG9yeV9pdGVtX2RhbWFnZWRfc3RhdHVzZXMiLAogICJ0YWJsZVNjaGVtYSIgOiAicHVibGljIgp9LCB7CiAgInRhYmxlTmFtZSIgOiAiaW52ZW50b3J5X2luc3RpdHV0aW9ucyIsCiAgInRhYmxlU2NoZW1hIiA6ICJwdWJsaWMiCn0sIHsKICAidGFibGVOYW1lIiA6ICJpbnZlbnRvcnlfbG9jYXRpb25zIiwKICAidGFibGVTY2hlbWEiIDogInB1YmxpYyIKfSwgewogICJ0YWJsZU5hbWUiIDogImludmVudG9yeV9tYXRlcmlhbF90eXBlcyIsCiAgInRhYmxlU2NoZW1hIiA6ICJwdWJsaWMiCn0sIHsKICAidGFibGVOYW1lIiA6ICJpbnZlbnRvcnlfbW9kZXNfb2ZfaXNzdWFuY2UiLAogICJ0YWJsZVNjaGVtYSIgOiAicHVibGljIgp9LCB7CiAgInRhYmxlTmFtZSIgOiAiaW52ZW50b3J5X3NlcnZpY2VfcG9pbnRzX3VzZXJzIiwKICAidGFibGVTY2hlbWEiIDogInB1YmxpYyIKfSwgewogICJ0YWJsZU5hbWUiIDogImludmVudG9yeV9zdGF0aXN0aWNhbF9jb2RlX3R5cGVzIiwKICAidGFibGVTY2hlbWEiIDogInB1YmxpYyIKfSwgewogICJ0YWJsZU5hbWUiIDogImludm9pY2VfbGluZXMiLAogICJ0YWJsZVNjaGVtYSIgOiAicHVibGljIgp9LCB7CiAgInRhYmxlTmFtZSIgOiAiaW52b2ljZV9pbnZvaWNlcyIsCiAgInRhYmxlU2NoZW1hIiA6ICJwdWJsaWMiCn0sIHsKICAidGFibGVOYW1lIiA6ICJub3RlcyIsCiAgInRhYmxlU2NoZW1hIiA6ICJwdWJsaWMiCn0sIHsKICAidGFibGVOYW1lIiA6ICJhY3F1aXNpdGlvbnNfbWVtYmVyc2hpcHMiLAogICJ0YWJsZVNjaGVtYSIgOiAicHVibGljIgp9LCB7CiAgInRhYmxlTmFtZSIgOiAicG9fcmVwb3J0aW5nX2NvZGVzIiwKICAidGFibGVTY2hlbWEiIDogInB1YmxpYyIKfSwgewogICJ0YWJsZU5hbWUiIDogIm9yZ2FuaXphdGlvbl9jYXRlZ29yaWVzIiwKICAidGFibGVTY2hlbWEiIDogInB1YmxpYyIKfSwgewogICJ0YWJsZU5hbWUiIDogIm9yZ2FuaXphdGlvbl9hZGRyZXNzZXMiLAogICJ0YWJsZVNjaGVtYSIgOiAicHVibGljIgp9LCB7CiAgInRhYmxlTmFtZSIgOiAib3JnYW5pemF0aW9uX2NvbnRhY3RzIiwKICAidGFibGVTY2hlbWEiIDogInB1YmxpYyIKfSwgewogICJ0YWJsZU5hbWUiIDogIm9yZ2FuaXphdGlvbl9lbWFpbHMiLAogICJ0YWJsZVNjaGVtYSIgOiAicHVibGljIgp9LCB7CiAgInRhYmxlTmFtZSIgOiAib3JnYW5pemF0aW9uX2ludGVyZmFjZXMiLAogICJ0YWJsZVNjaGVtYSIgOiAicHVibGljIgp9LCB7CiAgInRhYmxlTmFtZSIgOiAib3JnYW5pemF0aW9uX3Bob25lX251bWJlcnMiLAogICJ0YWJsZVNjaGVtYSIgOiAicHVibGljIgp9LCB7CiAgInRhYmxlTmFtZSIgOiAib3JnYW5pemF0aW9uX3VybHMiLAogICJ0YWJsZVNjaGVtYSIgOiAicHVibGljIgp9LCB7CiAgInRhYmxlTmFtZSIgOiAidXNlcl9ncm91cHMiLAogICJ0YWJsZVNjaGVtYSIgOiAicHVibGljIgp9LCB7CiAgInRhYmxlTmFtZSIgOiAiZmVlc2ZpbmVzX2FjY291bnRzIiwKICAidGFibGVTY2hlbWEiIDogInB1YmxpYyIKfSwgewogICJ0YWJsZU5hbWUiIDogInVzZXJfYWRkcmVzc3R5cGVzIiwKICAidGFibGVTY2hlbWEiIDogInB1YmxpYyIKfSwgewogICJ0YWJsZU5hbWUiIDogInVzZXJfdXNlcnMiLAogICJ0YWJsZVNjaGVtYSIgOiAicHVibGljIgp9LCB7CiAgInRhYmxlTmFtZSIgOiAicG9fcHVyY2hhc2Vfb3JkZXJzIiwKICAidGFibGVTY2hlbWEiIDogInB1YmxpYyIKfSwgewogICJ0YWJsZU5hbWUiIDogInBvX3BpZWNlcyIsCiAgInRhYmxlU2NoZW1hIiA6ICJwdWJsaWMiCn0sIHsKICAidGFibGVOYW1lIiA6ICJjaXJjdWxhdGlvbl9jYW5jZWxsYXRpb25fcmVhc29ucyIsCiAgInRhYmxlU2NoZW1hIiA6ICJwdWJsaWMiCn0sIHsKICAidGFibGVOYW1lIiA6ICJjb3Vyc2VfY29weXJpZ2h0c3RhdHVzZXMiLAogICJ0YWJsZVNjaGVtYSIgOiAicHVibGljIgp9LCB7CiAgInRhYmxlTmFtZSIgOiAiY291cnNlX2NvdXJzZXR5cGVzIiwKICAidGFibGVTY2hlbWEiIDogInB1YmxpYyIKfSwgewogICJ0YWJsZU5hbWUiIDogImNvdXJzZV9wcm9jZXNzaW5nc3RhdHVzZXMiLAogICJ0YWJsZVNjaGVtYSIgOiAicHVibGljIgp9LCB7CiAgInRhYmxlTmFtZSIgOiAiZW1haWxfZW1haWwiLAogICJ0YWJsZVNjaGVtYSIgOiAicHVibGljIgp9LCB7CiAgInRhYmxlTmFtZSIgOiAiY291cnNlX3Rlcm1zIiwKICAidGFibGVTY2hlbWEiIDogInB1YmxpYyIKfSwgewogICJ0YWJsZU5hbWUiIDogImZlZXNmaW5lc19mZWVmaW5lcyIsCiAgInRhYmxlU2NoZW1hIiA6ICJwdWJsaWMiCn0sIHsKICAidGFibGVOYW1lIiA6ICJmZWVzZmluZXNfY29tbWVudHMiLAogICJ0YWJsZVNjaGVtYSIgOiAicHVibGljIgp9LCB7CiAgInRhYmxlTmFtZSIgOiAiZmVlc2ZpbmVzX2xvc3RfaXRlbV9mZWVzX3BvbGljaWVzIiwKICAidGFibGVTY2hlbWEiIDogInB1YmxpYyIKfSwgewogICJ0YWJsZU5hbWUiIDogImZlZXNmaW5lc19vdmVyZHVlX2ZpbmVzX3BvbGljaWVzIiwKICAidGFibGVTY2hlbWEiIDogInB1YmxpYyIKfSwgewogICJ0YWJsZU5hbWUiIDogImZlZXNmaW5lc19yZWZ1bmRzIiwKICAidGFibGVTY2hlbWEiIDogInB1YmxpYyIKfSwgewogICJ0YWJsZU5hbWUiIDogImZlZXNmaW5lc190cmFuc2Zlcl9jcml0ZXJpYXMiLAogICJ0YWJsZVNjaGVtYSIgOiAicHVibGljIgp9LCB7CiAgInRhYmxlTmFtZSIgOiAiZmluYW5jZV9leHBlbnNlX2NsYXNzZXMiLAogICJ0YWJsZVNjaGVtYSIgOiAicHVibGljIgp9LCB7CiAgInRhYmxlTmFtZSIgOiAiZmluYW5jZV9mdW5kX3R5cGVzIiwKICAidGFibGVTY2hlbWEiIDogInB1YmxpYyIKfSwgewogICJ0YWJsZU5hbWUiIDogImZpbmFuY2VfZnVuZHMiLAogICJ0YWJsZVNjaGVtYSIgOiAicHVibGljIgp9LCB7CiAgInRhYmxlTmFtZSIgOiAiZmluYW5jZV9ncm91cF9mdW5kX2Zpc2NhbF95ZWFycyIsCiAgInRhYmxlU2NoZW1hIiA6ICJwdWJsaWMiCn0sIHsKICAidGFibGVOYW1lIiA6ICJpbnZlbnRvcnlfY2xhc3NpZmljYXRpb25fdHlwZXMiLAogICJ0YWJsZVNjaGVtYSIgOiAicHVibGljIgp9LCB7CiAgInRhYmxlTmFtZSIgOiAiaW52ZW50b3J5X2NhbGxfbnVtYmVyX3R5cGVzIiwKICAidGFibGVTY2hlbWEiIDogInB1YmxpYyIKfSwgewogICJ0YWJsZU5hbWUiIDogImludmVudG9yeV9jYW1wdXNlcyIsCiAgInRhYmxlU2NoZW1hIiA6ICJwdWJsaWMiCn0sIHsKICAidGFibGVOYW1lIiA6ICJpbnZlbnRvcnlfZWxlY3Ryb25pY19hY2Nlc3NfcmVsYXRpb25zaGlwcyIsCiAgInRhYmxlU2NoZW1hIiA6ICJwdWJsaWMiCn0sIHsKICAidGFibGVOYW1lIiA6ICJpbnZlbnRvcnlfaWRlbnRpZmllcl90eXBlcyIsCiAgInRhYmxlU2NoZW1hIiA6ICJwdWJsaWMiCn0sIHsKICAidGFibGVOYW1lIiA6ICJpbnZlbnRvcnlfaW5zdGFuY2VfcmVsYXRpb25zaGlwX3R5cGVzIiwKICAidGFibGVTY2hlbWEiIDogInB1YmxpYyIKfSwgewogICJ0YWJsZU5hbWUiIDogImludmVudG9yeV9pbnN0YW5jZV9ub3RlX3R5cGVzIiwKICAidGFibGVTY2hlbWEiIDogInB1YmxpYyIKfSwgewogICJ0YWJsZU5hbWUiIDogImludmVudG9yeV9pbnN0YW5jZV9zdGF0dXNlcyIsCiAgInRhYmxlU2NoZW1hIiA6ICJwdWJsaWMiCn0sIHsKICAidGFibGVOYW1lIiA6ICJpbnZlbnRvcnlfaXRlbV9ub3RlX3R5cGVzIiwKICAidGFibGVTY2hlbWEiIDogInB1YmxpYyIKfSwgewogICJ0YWJsZU5hbWUiIDogImludmVudG9yeV9sb2FuX3R5cGVzIiwKICAidGFibGVTY2hlbWEiIDogInB1YmxpYyIKfSwgewogICJ0YWJsZU5hbWUiIDogImludmVudG9yeV9uYXR1cmVfb2ZfY29udGVudF90ZXJtcyIsCiAgInRhYmxlU2NoZW1hIiA6ICJwdWJsaWMiCn0sIHsKICAidGFibGVOYW1lIiA6ICJpbnZlbnRvcnlfc2VydmljZV9wb2ludHMiLAogICJ0YWJsZVNjaGVtYSIgOiAicHVibGljIgp9LCB7CiAgInRhYmxlTmFtZSIgOiAiaW52ZW50b3J5X3N0YXRpc3RpY2FsX2NvZGVzIiwKICAidGFibGVTY2hlbWEiIDogInB1YmxpYyIKfSwgewogICJ0YWJsZU5hbWUiIDogImludm9pY2Vfdm91Y2hlcl9saW5lcyIsCiAgInRhYmxlU2NoZW1hIiA6ICJwdWJsaWMiCn0sIHsKICAidGFibGVOYW1lIiA6ICJpbnZvaWNlX3ZvdWNoZXJzIiwKICAidGFibGVTY2hlbWEiIDogInB1YmxpYyIKfSwgewogICJ0YWJsZU5hbWUiIDogInBvX29yZGVyX2ludm9pY2VfcmVsbnMiLAogICJ0YWJsZVNjaGVtYSIgOiAicHVibGljIgp9LCB7CiAgInRhYmxlTmFtZSIgOiAicG9fYWxlcnRzIiwKICAidGFibGVTY2hlbWEiIDogInB1YmxpYyIKfSwgewogICJ0YWJsZU5hbWUiIDogImFjcXVpc2l0aW9uc191bml0cyIsCiAgInRhYmxlU2NoZW1hIiA6ICJwdWJsaWMiCn0sIHsKICAidGFibGVOYW1lIiA6ICJwb19vcmRlcl90ZW1wbGF0ZXMiLAogICJ0YWJsZVNjaGVtYSIgOiAicHVibGljIgp9LCB7CiAgInRhYmxlTmFtZSIgOiAib3JnYW5pemF0aW9uX29yZ2FuaXphdGlvbnMiLAogICJ0YWJsZVNjaGVtYSIgOiAicHVibGljIgp9LCB7CiAgInRhYmxlTmFtZSIgOiAidXNlcl9kZXBhcnRtZW50cyIsCiAgInRhYmxlU2NoZW1hIiA6ICJwdWJsaWMiCn0sIHsKICAidGFibGVOYW1lIiA6ICJ1c2VyX3Byb3hpZXNmb3IiLAogICJ0YWJsZVNjaGVtYSIgOiAicHVibGljIgp9LCB7CiAgInRhYmxlTmFtZSIgOiAiaW52ZW50b3J5X2hvbGRpbmdzX3NvdXJjZXMiLAogICJ0YWJsZVNjaGVtYSIgOiAicHVibGljIgp9LCB7CiAgInRhYmxlTmFtZSIgOiAic3JzX21hcmMiLAogICJ0YWJsZVNjaGVtYSIgOiAicHVibGljIgp9LCB7CiAgInRhYmxlTmFtZSIgOiAic3JzX3JlY29yZHMiLAogICJ0YWJsZVNjaGVtYSIgOiAicHVibGljIgp9LCB7CiAgInRhYmxlTmFtZSIgOiAiaW52ZW50b3J5X2luc3RhbmNlcyIsCiAgInRhYmxlU2NoZW1hIiA6ICJwdWJsaWMiCn0sIHsKICAidGFibGVOYW1lIiA6ICJpbnZlbnRvcnlfaXRlbXMiLAogICJ0YWJsZVNjaGVtYSIgOiAicHVibGljIgp9LCB7CiAgInRhYmxlTmFtZSIgOiAiaW52ZW50b3J5X2hvbGRpbmdzIiwKICAidGFibGVTY2hlbWEiIDogInB1YmxpYyIKfSwgewogICJ0YWJsZU5hbWUiIDogInBvX3JlY2VpdmluZ19oaXN0b3J5IiwKICAidGFibGVTY2hlbWEiIDogInB1YmxpYyIKfSwgewogICJ0YWJsZU5hbWUiIDogImNpcmN1bGF0aW9uX2xvYW5faGlzdG9yeSIsCiAgInRhYmxlU2NoZW1hIiA6ICJwdWJsaWMiCn0sIHsKICAidGFibGVOYW1lIiA6ICJhdWRpdF9jaXJjdWxhdGlvbl9sb2dzIiwKICAidGFibGVTY2hlbWEiIDogInB1YmxpYyIKfSwgewogICJ0YWJsZU5hbWUiIDogImNpcmN1bGF0aW9uX2xvYW5zIiwKICAidGFibGVTY2hlbWEiIDogInB1YmxpYyIKfSwgewogICJ0YWJsZU5hbWUiIDogInBvX2xpbmVzIiwKICAidGFibGVTY2hlbWEiIDogInB1YmxpYyIKfSwgewogICJ0YWJsZU5hbWUiIDogImZpbmFuY2VfdHJhbnNhY3Rpb25zIiwKICAidGFibGVTY2hlbWEiIDogInB1YmxpYyIKfSwgewogICJ0YWJsZU5hbWUiIDogImZlZXNmaW5lc19mZWVmaW5lYWN0aW9ucyIsCiAgInRhYmxlU2NoZW1hIiA6ICJwdWJsaWMiCn0sIHsKICAidGFibGVOYW1lIiA6ICJjaXJjdWxhdGlvbl9jaGVja19pbnMiLAogICJ0YWJsZVNjaGVtYSIgOiAicHVibGljIgp9LCB7CiAgInRhYmxlTmFtZSIgOiAiY2lyY3VsYXRpb25fZml4ZWRfZHVlX2RhdGVfc2NoZWR1bGVzIiwKICAidGFibGVTY2hlbWEiIDogInB1YmxpYyIKfSBd", "base64"));
  res.end();

  return __filename;
};
