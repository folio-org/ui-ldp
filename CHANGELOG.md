# Change history for ui-ldp

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

