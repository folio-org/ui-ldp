# ui-ldp

Copyright (C) 2020 The Open Library Foundation

This software is distributed under the terms of the Apache License, Version 2.0. See the [LICENSE](LICENSE) file for more information.

![alt text](https://github.com/library-data-platform/ui-ldp/blob/master/screenshot3.png?raw=true)

Currently has one page, a Query Builder for the Library Data Platform (LDP). 

## Pre-reqs for local development

- This repo is bootstrapped by the Stripes CLI, so an Okapi backend is required to be running to login. The [testing-backend](https://app.vagrantup.com/folio/boxes/testing-backend) Vagrant box will work.
- mod-ldp must be running and registered with Okapi

## Run

```
yarn start
```


## Test

```
yarn test
```
