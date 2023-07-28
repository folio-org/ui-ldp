# folio-port-ldp-queries

## Overview

[`folio-port-ldp-queries`](folio-port-ldp-queries.mjs)
is a script that reads old saved queries from their storage in GitHub and saves them in the new format within FOLIO itself (in mod-settings).
(The move to mod-settings is described in
[UILDP-57](https://issues.folio.org/browse/UILDP-57);
the script to move old queries across is described in
[UILDP-94](https://issues.folio.org/browse/UILDP-94).)

It is written in module-aware Node, and uses
[the FolioJS library](https://github.com/MikeTaylor/foliojs)
for access to FOLIO.

## Installation

Before you can run `folio-port-ldp-queries`, you will need to install the FolioJS library. You can do this using

	yarn global add @indexdata/foliojs

There is no need to install the script itself: you can run it directly from here.

## Environment

As a FolioJS script, `folio-port-ldp-queries` is configured by the _de-facto_ set of environment variables:
* `OKAPI_URL` -- The base URL of the FOLIO instance where the queries are to be added
* `OKAPI_TENANT` -- The tenant on whose behalf the queries are to be added
* `OKAPI_USER` -- The user to act as when inserting the queries
* `OKAPI_PW` -- The password to use when logging in as the specified user

For example, it is possible to port queries into [FOLIO Snapshot](https://folio-snapshot.dev.folio.org/) using:
```
export OKAPI_URL=https://folio-snapshot-okapi.dev.folio.org
export OKAPI_TENANT=diku
export OKAPI_USER=diku_admine
export OKAPI_PW=********
```

Like all FolioJS scripts, `folio-port-ldp-queries` also honours the `LOGCAT` environment variable to control logging. For example, if it is set to `status,ldp`, it will log the status of all FOLIO HTTP responses, and information specific to this LDP script.

## Command-line

Invoke the script with two command-line arguments: the owner of the GitHub repository, and the name of the repository within that owner's space. For example, to import queries from the https://github.com/RandomOtherGuy/ldp-queries/ repository, run as:
```
folio-port-ldp-queries.mjs RandomOtherGuy ldp-queries
```

