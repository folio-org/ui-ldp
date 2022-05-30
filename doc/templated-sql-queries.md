# Templated SQL queries for the LDP app

<!-- md2toc -l 2 templated-sql-queries.md -->
* [Overview](#overview)
* [The requirement](#the-requirement)
* [Front-end work](#front-end-work)
* [Back-end work](#back-end-work)
* [Metadata file format](#metadata-file-format)



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

For #1, we will need a new settings page that is capable of managing (add, edit, delete) a whole set of git-repository records, each resembling [the current saved-queries configutation](https://folio-snapshot.dev.folio.org/settings/ldp/savedqueries) consisting of repository owner, repository name, brach and an OAuth token. A separate such list of repositories will exist for each user.

For #2, we need a third top-level page, "Templated queries", to go alongside the existing "Query builder" and "Saved queries".

For #3, we will need the ability to fetch the user's list of repositories, to list them, and to allow the user to select one.

For #4, we will need to visit the specified repository and use the configured credentials to obtain a list of the templated queries that are stored there. This will entail using the GitHub WSAPI. For the display, we probably only need a simple bit of UI work; but if the number of queries made available used by a single user becomes large, we might need to add facilities to filter and sort the list. Not very likely.

For #5, we should find it easy enough to obtain and display the relevant information obtained from git.

For #6, we will need a separate metadata file associated with the templated query, which specifies what template parameters exist and how they should be supplied. We will need to auto-generate a form for the user to enter values for these parameters. Some parameters will be free-text, some selected from a controlled vocabulary. Other requirements may arise, e.g. the ability to allow the user to enter a number only within a certain range.

For #7, we will need to perform the template substitution, which in general is somewhat complex if we need to do more than a very shallow parse of the SQL, and submit the resulting query to the back-end. We should be able then to re-use the existing components to display the result of the query.


## Back-end work

For #1, we will need a way to store the git repository information. For the existing saved-queries git repository information, we use mod-ldp's key-value configuration store, but that will not suffice here for two reasons. First, we need to store information about many repositories, not just one; and second, each user will need a separate set of repositories. (We _could_ doubly overload the configation facility so that we use keys of the form `repository.<USERNAME>.<INDEX>`, such as `repository.mike.3`, but that would be grossly inefficient as well as insecure.)

For #3, we need the ability to return the set of git repositories that are associated with the current user, in a secure way that uses the logged-in identity of the user rather than a parameter, so that the backend enforces that no-one can see anyone else's data -- especially credentials.

For #7, we need a new ability to submit a literal SQL query, as opposed to the present searching WSAPI provided by mod-ldp, which accepts a set of form-values and builds the SQL itself. Depending on exactly how we do this, we may want to include the parameter values separately from the query instead of substituting them in.

Stages #2, 4, 5 and 6 do not require any new back-end support.


## Metadata file format

Apart from the stored configuration information about what git repositories contain templated queries, we are concerned with two types of file.
* The SQL queries themselves, exactly or largely as the currently exist.
* Associated metadata file, one per query, containing information about what templated parameters exist and how they should be filled in by the user. This file may also contain additional whole-query information, such as a human-readable description or a guide to providing parameter values.

The metadata file will require the following information for each templated parameter:
* Machine-readable name, to guide the templating process.
* Human-readable name (if different from the machine-readable name)
* Whether mandatory or optional
* Type (e.g. `text`, `number`, `controlled`, `range`, `date`)
* For some types, additonal information such as;
  * For `controlled`, list of acceptable values
  * For `range`, minimum and maximum allowed values

Such a file might look like this (for [this SQL query[(https://github.com/folio-org/folio-analytics/blob/main/sql/report_queries/title_count/title_count.sql)):
```
{
  "displayName": "Title count",
  "description": "Displays information about titles in inventory ...",
  "instructions": "Fill in the start end end dates ...",
  "parameters": [
    {
      "name": "cataloged_date_start_date",
      "displayName": "Cataloged date (start date)",
      "type": "date",
      "required": false
    },
    {
      "name": "instance_mode_of_issuance_filter",
      "displayName": "Mode of issuance for instance",
      "type": "controlled",
      "required": false,
      "controlled.options": [
        "integrating resource",
        "serial",
        "multipart monograph"
      ],
      "controlled.allowOtherValues": true
    }
  ]
}
```
