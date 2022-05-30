# Templated SQL queries

<!-- md2toc -l 2 templated-sql-queries.md -->
* [Overview](#overview)
* [The requirement](#the-requirement)
* [Front-end work](#front-end-work)
* [Back-end work](#back-end-work)



## Overview

One of the larger new facilities required in the LDP app is [UILDP-17](https://issues.folio.org/browse/UILDP-17) (Add support for retrieving and running parameterized reports from a Git repository). This facility involves significant changes in both the UI and the backend. The present document attempts to scope out what is required.


## The requirement

From a user's perspective, the need is as follows:
1. In LDP settings, provide user-specific details of multiple git repositories that templated queries can be loaded from.
2. In the LDP app, navigate to a "Templated queries" section.
3. In that section, choose from the list of supported git repositories.
4. From the selected git repository, choose from the list of templated queries that it contains.
5. See the query's metadata (e.g. human-readable description).
6. Fill in the templated parameters, in some cases from controlled vocabularies.
7. Submit the templated query with the specified parameter values and see the result.

Note that there is _no requirement_ to author or edit templated queries from the LDP app. This is done elsewhere: the app only consumes them.


## Front-end work

XXX


## Back-end work

XXX


