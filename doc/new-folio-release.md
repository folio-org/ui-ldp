# Preparing for a new FOLIO release

<!-- md2toc -l 2 new-folio-release.md -->
* [Introduction](#introduction)
* [What needs to be re-released?](#what-needs-to-be-re-released)
    * [What versions were in the previous release?](#what-versions-were-in-the-previous-release)
    * [What has changed since the previous release?](#what-has-changed-since-the-previous-release)
    * [Do dependencies need to be updated?](#do-dependencies-need-to-be-updated)


## Introduction

In general each flower release of FOLIO requires many modules to be re-released. The procedures are fairly involved, so I am documenting them here to save myself having to think through them from first principles every time a release comes around. To make the general concrete, I will refer to the Morning Glory release which is forthcoming at the time of writing, and about my own set of modules, which is:

* `ui-courses` (seems to have landed back with me since we lost Mark)
* `ui-plugin-eusage-reports`
* `ui-ldp`
* `ui-harvester-admin` (not in MG, but needs to be compatible with it)
* `mod-graphql` (not Stripes, but part of the periodic release pain)
* `Net-Z3950-FOLIO` (likewise)

(We will ignore the `harvester-admin` app, as not being included in `platform-complete` means that it is not tied to the Flower-release schedule. We will still need to ensure that periodic updates keep it compatible with recent versions of the FOLIO platform, but that is not the concern of the present document.)


## What needs to be re-released?


### What versions were in the previous release?

The first thing to do is establish which of these modules even need a release for the new FOLIO release: some may not have changed at all. Begin by [finding which versions of your modules were included in the previous flower release](https://github.com/folio-org/platform-complete/blob/master/doc/finding-module-versions.md). Following the instructions in that document, we find:
1. The release before Morning Glory was Lotus, and it is release R1 2022.
2. The most recent tag for this release in [platform-complete](https://github.com/folio-org/platform-complete/tags) is `R1-hotfix-1`.
3. Its branch is https://github.com/folio-org/platform-complete/tree/R1-2022-hotfix-1

From here we can find the versions of the  UI modules in [`package.json`](https://github.com/folio-org/platform-complete/blob/R1-2022-hotfix-1/package.json):
* `@folio/courses`: 5.1.0
* `@folio/plugin-eusage-reports`: 2.2.3
* `@folio/ldp`: 1.6.2

And we can find the versions of the backend modules in [`install-extras.json`](https://github.com/folio-org/platform-complete/blob/R1-2022-hotfix-1/install-extras.json):
* `mod-graphql-1.9.0`
* `mod-z3950-2.4.0`


### What has changed since the previous release?

Now we can compare the present state of these modules with those included in the previous release:
* [The `ui-courses` change-log](https://github.com/folio-org/ui-courses/blob/master/CHANGELOG.md) says the most recent release was 5.1.0, and that no signficant changes have been made since then. [The whole-project commit history](https://github.com/folio-org/ui-courses/commits/master) shows that there have been several commits since release 5.1.0, but they have all been updates to the translation files. [Comparing the `v5.1.0` tag with `master`](https://github.com/folio-org/ui-courses/compare/v5.1.0...master) shows that there are about 43 added translations across seven locales. It is a matter of judgement whether that is enough change to warrant a new release.
* [The `ui-plugin-eusage-reports` change-log](https://github.com/folio-org/ui-plugin-eusage-reports/blob/master/CHANGELOG.md) says the most recent release was 2.2.3, and that no signficant changes have been made since then. [The whole-project commit history](https://github.com/folio-org/ui-plugin-eusage-reports/commits/master) shows that there have been several commits since release 2.2.3, but they have all been updates to the translation files. [Comparing the `v2.2.3` tag with `master`](https://github.com/folio-org/ui-plugin-eusage-reports/compare/v2.2.3...master) shows that there are about 99 added translations across ten locales. Again, it is a matter of judgement whether that is enough change to warrant a new release.
* [The `ui-ldp` change-log](https://github.com/folio-org/ui-ldp/blob/master/CHANGELOG.md) says the most recent release was 1.6.2, but that two signficant changes have been made since then -- [UILDP-50](https://issues.folio.org/browse/UILDP-50) and [UILDP-34](https://issues.folio.org/browse/UILDP-34) -- so a release is warranted irrespective of what other small changes may also have happened.
* [The `mod-graphql` change-log](https://github.com/folio-org/mod-graphql/blob/master/CHANGELOG.md) says the most recent release was 1.9.0, and that no signficant changes have been made since then. However, [the whole-project commit history](https://github.com/folio-org/mod-graphql/commits/master) shows that there have been several commits since release 1.9.0. Most of them are just bumping versions of dependencies with minor security alerts, but [comparing the `v1.9.0` tag with `master`](https://github.com/folio-org/mod-graphql/compare/v1.9.0...master) shows that a significant change is also included: a switch from using Node 10 to Node 14. That is enough to warrant a new release, and indeed should have been noted in the change-log as a fix to [MODGQL-142](https://issues.folio.org/browse/MODGQL-142).
* [The `Net-Z3950-FOLIO` change-log](https://github.com/folio-org/Net-Z3950-FOLIO/blob/master/Changes.md) says the most recent release was 2.5.0, and that no signficant changes have been made since then. However, [the whole-project commit history](https://github.com/folio-org/Net-Z3950-FOLIO/commits/master) shows that there have been no commits since release 2.5.0, and [comparing the `v2.5.0` tag with `master`](https://github.com/folio-org/Net-Z3950-FOLIO/compare/v2.5.0...master) confirms this. Currently, then, no release is required.


### Do dependencies need to be updated?

Front-end modules depend on the Stripes toolkit. In accordance with standard [semantic versioning](https://semver.org/) rules, if the version of [`@folio/stripes`](https://github.com/folio-org/stripes) included in a FOLIO release is still on the same major version as that required by a UI module, then everything should work fine. But if the new FOLIO release goes to a new major version of Stripes, then modules using the older version must be upgraded -- often just by changing the dependency -- and re-released. In the present case, the more recent release of Stripes was [v7.2.0](https://github.com/folio-org/stripes/releases/tag/v7.2.0) of 15 June 2022. For the three UI modules:
* `ui-courses` v5.1.0 [depends on `@folio/stripes: ^7.0.0`](https://github.com/folio-org/ui-courses/blob/v5.1.0/package.json#L202)
* `ui-plugin-eusage-reports` v2.2.3 [depends on `@folio/stripes: ^7.0.0`](https://github.com/folio-org/ui-plugin-eusage-reports/blob/v2.2.3/package.json#L102)
* `ui-ldp` v1.6.2 [depends on `@folio/stripes: ^6.0.0 || ^7.0.0`](https://github.com/folio-org/ui-ldp/blob/v1.6.2/package.json#L87)

So all of these are fine.

(Similarly, back-end modules may depend on RMB, some kind of Spring Way library or other things. Fortunately none of those pertain in the case of mod-graphql or the Z39.50 server, so I have no need to consider major-version dependency upgrades.)


