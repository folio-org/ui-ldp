# ui-ldp

Copyright (C) 2020-2021 The Open Library Foundation

This software is distributed under the terms of the Apache License, Version 2.0. See the [LICENSE](LICENSE) file for more information.

## Introduction

LDP query builder UI for FOLIO/ReShare.

![Screenshot of the module in action](screenshot3.png)

Currently has one page, a Query Builder for the [Library Data Platform](https://github.com/library-data-platform/ldp) (LDP).

## Pre-reqs for local development

- This repo is bootstrapped by the Stripes CLI, so an Okapi backend is required to be running to login. The [testing-backend](https://app.vagrantup.com/folio/boxes/testing-backend) Vagrant box will work.
- mod-ldp must be running and registered with Okapi

## Run

```
yarn start --okapi https://folio-snapshot-okapi.dev.folio.org
```

## Side-loading mod-ldp

If developing mod-ldp locally, it's desirable to make ui-ldp refer to the local instance rather than the one of the backend that is used for other FOLIO modules, such as mod-configuration and mod-users-bl. The conceptually simplest way to do this is to run the whole FOLIO stack locally, but this is complex in practice, and requires a vast amount of memory.

An alternative is to "side-load" the locally running copy of mod-ldp. This can be done by setting the Stripes configuration element `modLdpUrl` to the URL of the running instance -- for example, `http://localhost:8001` if running simply with `java -jar target/mod-ldp-0.0.1-SNAPSHOT.jar`.

_However_ ... it's never that easy, it? ... Done naively, this will fail because the browser's common origin policy will refuse to perform GETs and POST against servers such as mod-ldp that do not supply the `Access-Control-Allow-Origin: *` header in OPTIONS responses. In order to work around this, it's necessary to use a proxy that inserts this header, such as [Local CORS Anywhere](https://github.com/dkaoster/local-cors-anywhere), and to modify the `modLdpUrl` setting accordingly.

The `modLdpUrl` setting can be placed in a Stripes config file such as the supplied [`stripes.config.js`](stripes.config.js). To use it, ensure that its Okapi URL setting is correct, and run as
```
yarn start stripes.config.js
```

## Configuration

The LDP app is configured primarily by means of [mod-ldp's own configuration WSAPI](https://s3.amazonaws.com/foliodocs/api/mod-ldp/p/ldp.html), which functions as a simple key-value store in which the values are conventionally JSON strings. The following configuration entries are used:

### dbinfo

The value is a JSON structure of three keys specifying how to access the underlying LDP database.

* `url` -- the full URL to the LDP database, e.g. `jdbc:postgresql://some.domain.com:5432/ldp`
* `user` -- the username that should be used to access the database: the nominated user need only have read access to the relevant tables and indexes, and should not have additional and unnecessary write access for security reasons
* `pass` -- the password corresponding to this username

### sqconfig

The value is a JSON structure of four keys which indicate where in GitHub the saved queries are stored, and how to gain access to them.

* `owner` -- The name of a GitHub account, such as `RandomOtherGuy`
* `repo` -- The name of a repository owned by that GItHub user, such as `ldp-queries`
* `branch` -- If specifed, the name of a particular branch of the repository to use; if omitted, then the master or main branch is used.
* `token` -- A GitHub application token that has access to both read and write specified branch of the specified repository.

For example, if `owner` is set to `RandomOtherGuy`, `repo` to `ldp-queries` and `branch` left empty, then the reference is to the repository at https://github.com/RandomOtherGuy/ldp-queries

### Use of mod-configuration

For historical reasons, ui-ldp also makes use of mod-configuration to store two further peices of configuration information: the limits on how many records to show in search results, and the tables to be disabled for searching. Both of these should probably be moved to use mod-ldp's own configuration store.

## Additional information

### Other documentation

[Library Data Platform](https://github.com/library-data-platform/ldp) (LDP)
-- an open source platform for analytics in libraries.

[mod-ldp](https://github.com/folio-org/mod-ldp)
-- LDP query builder server-side module for FOLIO/ReShare.

### Code of Conduct

Refer to the Wiki [FOLIO Code of Conduct](https://wiki.folio.org/display/COMMUNITY/FOLIO+Code+of+Conduct).

### Issue tracker

This project intially used [its own GitHub issue tracker](https://github.com/folio-org/ui-ldp/issues).
It is in the process of transitioning to [a JIRA tracker](https://issues.folio.org/projects/UILDP).
For the present, issues may be found in both places.

