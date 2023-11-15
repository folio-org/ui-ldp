# Change history for ui-ldp

## [2.0.1](https://github.com/folio-org/ui-ldp/tree/v2.0.1) (IN PROGRESS)

* In settings page *Report Repositories*, separate individual repositories. Fixes UILDP-120.
* Permissions names changed from "LDP" to "Reporting" to match the rest of the UI. Fixes UILDP-119.
* Available reports are now sorted correctly. Fixes UILDP-122.
* Reports lacking JSON metadata are no longer listed as available. Fixes UILDP-123.
* Permission names tweaked to avoid obsolete reference to "LDP". Fixes UILDP-127.
* Old `scripts` directory merged into `bin`. Fixes UILDP-128.
* Make internal permissions used by mod-settings invisible. Fixes UILDP-127.
* Report metadata files can specify default values for report parameters. Fixes UILDP-124.
* Report metadata files can specify that report parameters are disabled. Fixes UILDP-125.
* Results from query-builder appear in place of, rather than below, the query for. Fixes UILDP-118, though we will revisit this UX in a future release.
* When adding the initial report repository', `+` no longer creates two empty templates. Fixes UILDP-126.
* Submitting a query from the builder, then closing the results, no longer resets to the last loaded query. Fixes UILDP-130.
* List of available schemas in query-builder is now sorted. Fixes UILDP-131.

## [2.0.0](https://github.com/folio-org/ui-ldp/tree/v2.0.0) (2023-09-30)

* _Infrastructure changes_
  * **BREAKING**: upgrade Stripes to v9 and React to v18. Fixes UILDP-102.
  * **BREAKING**: bump `react-intl` to `v6.4.4`. Refs UILDP-109.
  * Update Node.js to v18 in GitHub Actions. Fixes UILDP-106.
  * Leverage cookie-based authentication in all API requests. Fixes UILDP-77.
* Support for MetaDB
  * Port ui-ldp to work with MetaDB as well as LDP Classic. Fixes UILDP-92.
* _New feature: reports_
  * Settings page for maintaining set of GitHub repos containing reports. Fixes UILDP-97.
  * New "Run report" tab that lists available Templated Queries. Fixes UILDP-98.
  * Create dynamic tabs for selected reports. Fixes UILDP-99.
  * Handle form generation and filling for reports. Fixes UILDP-105.
  * Show results of running a report. Fixes UILDP-100.
  * Number of records retrieved for reports is limited according to configured parameters. Fixes UILDP-112.
  * Download results of running a query as CSV. Fixes UILDP-113.
  * Add documentation of [how to author reports and their metadata](doc/reports.md). Fixes UILDP-114.
* _Bug fixes_
  * List all saved queries (not just the first ten), sorted alphabetically. Fixes UILDP-96.
  * `module.ldp.enabled` and `settings.ldp.enabled` permissionss are no longer visible, in accordance with standard practice in FOLIO. Fixes UILDP-95.
  * All appropriate LDP permissions are now correctly included as subpermissions of `ui-ldp.all`. Fixes UILDP-108.
* _Housekeeping_
  * Rip out old redundant copy of stripes-smart-components/ConfigManager. Fixes UILDP-101.
  * Update terminology in UI. Fixes UILDP-111.
  * Change name of app to "Reporting"

## [1.10.1](https://github.com/folio-org/ui-ldp/tree/v1.10.1) (2023-07-28)

* Add `folio-port-ldp-queries` script, used to port old GitHub-based saved queries over to mod-settings. Fixes UILDP-103.

## [1.10.0](https://github.com/folio-org/ui-ldp/tree/v1.10.0) (2023-02-24)

* Upgrade from Stripes v7 to Stripes v8 (though should still work with v7). Fixes UILDP-79.
* `core-js` no longer listed as a dependency. Fixes UILDP-66.
* List of tables in "Table availability" settings page is now sorted correctly. Fixes UILDP-80
* Update Record Limits/Table Availability to use mod-settings. Fixes UILDP-81.
* Modify JSON query saving/loading to use FOLIO storage (mod-settings). Fixes UILDP-57.
* Rework high-level permissions to work with mod-settings. Fixes UILDP-89
* Newly saved queries now appear on the Saved Query list immediately. Fixes UILDP-41.
* This module is no longer dependent on mod-configuration. Fixes UILDP-78.
* Saved queries, once loaded, can be edited and re-saved. Fixes UILDP-45.
* Fix "provided object should contain property key" when saving queries. Fixes UILDP-82.
* Fix "Could not save query [...]: error (): Forbidden". Fixes UILDP-83.
* After saving a query, re-saving the same query no longer creates a duplicate. Fixes UILDP-85.
* Add a **Copy query** button. Fixes UILDP-86.
* Remove all traces of the old `sqconfig` (permissions, settings pages, etc.). Fixes UILDP-91.
* Handle disappearing queries more gracefully. Fixes UILDP-88.
* Saved queries: maintain username/date for both created and updated events. Fixes UILDP-87.
* Record export limit now applies to sets larger than mod-ldp's default of 500. Fixes UILDP-68.

## [1.9.0](https://github.com/folio-org/ui-ldp/tree/v1.9.0) (2022-10-24)

* Fix typo in permission name. Fixes UILDP-59.
* Fix bug: auto-run queries would execute continuously in a loop. Fixes UILDP-64.
* The **Clear** button now consistently disables *Submit*. Fixes UILDP-63.
* Results exported to CSV now include all results, not just those displayed on screen. Fixes UILDP-60.
* Scroll bars are once more working in the result sets of autoRun queries. Fixes UILFP-76.

## [1.8.0](https://github.com/folio-org/ui-ldp/tree/v1.8.0) (2022-07-08)

* Make `autoRun` work when loading a saved query. Fixes UILDP-38.

## [1.7.0](https://github.com/folio-org/ui-ldp/tree/v1.7.0) (2022-07-07)

* Allow user to specify operation in column filters. Fixes UILDP-50.
* Clear button in query-builder now works consistently. Fixes UILDP-34.
* Allow for non-display of JDBC password and GitHub token. Fixes UILDP-42.
* Updates to documentation. Fixes UILDP-51.
* Upgrade from `babel-eslint` (now deprecated) to `@babel/eslint-parser`. Fixes UILDP-53.

## [1.6.2](https://github.com/folio-org/ui-ldp/tree/v1.6.2) (2022-04-04)

* If any schema-names loaded into the form from the previous session's state refer to schemas no longer supported by the back-end database, they are now changed to refer to a valid schema instead. Fixes UILDP-48.
* Complete revamp of permissions. Fixes UILDP-47.
* When saving a new query, the filename is auto-generated from the display-name. Fixes UILDP-46.
* Saved queries can now be deleted. Fixes UILDP-49.

## 1.6.1 does not exist

* There was some weirdness in the release procedure, with Jenkins getting confused by the v1.6.1 tag due to there once having been a branch of the same name. The simplest thing was just start again and call it v1.6.2.

## [1.6.0](https://github.com/folio-org/ui-ldp/tree/v1.6.0) (2022-03-02)

* Maintain query-form state when navigating away and returning. Fixes UILDP-10.
* Add a Clear button that resets form state. Fixes UILDP-26.
* Changing schema clears all fields, and they do not reappear when changing back. Fixes UILDP-25.
* Settings page for database connection configuration. Fixes UILDP-14.
* Protect settings pages with permissions. Fixes UILDP-30.
* Factor out common code in `load*` functions. Fixes UILDP-21.
* Add settings page for saved-query GitHub repo details. Fixes UILDP-31.
* Fix translation tags used for aria-labels when choosing sorting criteria. Fixes UILDP-33.
* Better error-reporting for when the LDP database is unavailable. Fixes UILDP-27.
* Show null values as `[NULL]` in grey. Fixes UILDP-22.
* Implement browser saved queries, fetched from GitHub, able to select and run. Fixes UILDP-32.
* Ability to save a query to GitHub. Fixes UILDP-35.

## [1.5.0](https://github.com/folio-org/ui-ldp/tree/v1.5.0) (2021-10-01)

* Repair tests, which had broken due to changes in Stripes. Fixes UILDP-3.
* Add [`PERSONAL_DATA_DISCLOSURE.md`](PERSONAL_DATA_DISCLOSURE.md) file. Fixes UILDP-6.
* Fixes for WCAG 2.1 accessibility. As described in detail in the Jira issue, it is not possible to achieve full compliance at this time due to extensive issues in Stripes itself, but I believe that when those are fixed this app will be clean. Fixes UILDP-5.
* `yarn test` now runs from yakbak tapes, which can be regenerated using `yarn regenerate`. Fixes UILDP-11.
* The move from the `library-data-platform` GitHub area to `folio-org` is complete. The [`README.md`](README.md) file has been updated accordingly. Fixes UILDP-9.

## [1.4.0](https://github.com/folio-org/ui-ldp/tree/v1.4.0) (2021-09-27)

* Upgrade to run under either v6 or v7 of the Stripes framework. Fixes UILDP-1.
* Extend timeouts for test suite.

## [1.3.2](https://github.com/folio-org/ui-ldp/tree/v1.3.2) (2020-06-17)

* More robust selectors for filter-field choice in tests.

## [1.3.1](https://github.com/folio-org/ui-ldp/tree/v1.3.1) (2020-06-17)

* Increase testing timeout to 10 seconds, to allow for slow CI environment.
* Adjust a test which seemed affected by this.

## [1.3.0](https://github.com/folio-org/ui-ldp/tree/v1.3.0) (2020-06-17)

* Updated to use Babel 7.
* Updated `stripes` to v3.0.0.
* Updated `eslint` to v6.2.1.
* Made the code lint-clean. Fixes #25.
* Updated package file to use modern Stripes-module description. Fixes #27.
* Created and implemented an icon for this app. Fixes #26.
* Updated `stripes` to v6; removed unused incompatible deps (redux, react-redux). Fixes #29.
* Support side-loading mod-ldp as an aid to local development. Fixes #34.
* Add optional user-specified limit. Fixes #14.
* Handle server-side internal errors more gracefully: non-2xx HTTP statuses are now reported as a `<BigError>`. Fixes #35.
* Add setting to limit number of results displayed and retrieved. Fixes #13.
* Add support for configuration of available tables. Fixes #16.
* Get rid of MCL-formatter console warnings by providing a dynamic `formater`. Fixes #39.
* Do not needlessly pass the okapi object through the components. Fixes #42.
* Use full width of page for results list. Fixes #28.
* Fix error handling on main page. Fixes #46.
* Prefer `@folio/stripes` exports to private paths when importing components. Fixes #44.
* Refactor to use stripes-util's `exportCsv` instead of stripes-components' `exportToCsv`. Fixes #45.
* Add sorting options: user can now add any number of [column, direction, null-handling] triples via the UI -- though the null-handling specifications are ignored by the back-end due to limitations in the SQL-building tool. Fixes #12.
* Report number of hits, specifying when it is greater than those displayed. Fixes #37.
* Display debug info only when the `showDevInfo` config item is true. Fixes #47.
* Internationalization. Fixes #31.
* Add test-suite using Cypress.io. Fixes #32.
* Clear ordering criteria when the table changes. Fixes #51.
* Clarify null ordering options in "order by column". Fixes #52.

## [1.0.0](https://github.com/folio-org/ui-app-template/tree/v1.0.0) (2020-03-02)

* New app created with stripes-cli

