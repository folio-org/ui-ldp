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

## Additional information

### Other documentation

[Library Data Platform](https://github.com/library-data-platform/ldp) (LDP)
-- an open source platform for analytics in libraries.

[mod-ldp](https://github.com/library-data-platform/mod-ldp)
-- LDP query builder server-side module for FOLIO/ReShare.

### Issue tracker

The project use this GitHub [issue tracker](https://github.com/library-data-platform/ui-ldp/issues).
