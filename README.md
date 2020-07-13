# ui-ldp

Copyright (C) 2020 The Open Library Foundation

This software is distributed under the terms of the Apache License, Version 2.0. See the [LICENSE](LICENSE) file for more information.

![alt text](https://github.com/library-data-platform/ui-ldp/blob/master/screenshot2.png?raw=true)

Currently connects to a local instance of [mod-ldp](https://github.com/library-data-platform/mod-ldp) which retrieves all logs from the `ldpsystem.log` table.

## Pre-req

This repo is bootstrapped by the Stripes CLI, so an Okapi backend is required to be running to login. The [testing-backend](https://app.vagrantup.com/folio/boxes/testing-backend) Vagrant box will work.

## Run

```
npm start
```


## Test

Currently, there are no tests. When there are:

```
npm run test
```
