# Change history for ui-ldp

## [1.6.0](https://github.com/folio-org/ui-ldp/tree/v1.6.0) (IN PROGRESS)

* Maintain query-form state when navigating away and returning. Fixes UILDP-10.
* Add a Clear button that resets form state. Fixes UILDP-26.
* Changing schema clears all fields, and they do not reappear when changing back. Fixes UILDP-25.
* Settings page for database connection configuration. Fixes UILDP-14.
* Protect settings pages with permissions. Fixes UILDP-30.
* Factor out common code in `load*` functions. Fixes UILDP-21.
* Add settings page for saved-query GitHub repo details. Fixes UILDP-31.
* Implement browser for saved queries, fetched from GitHub. Fixes UILDP-32.

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

