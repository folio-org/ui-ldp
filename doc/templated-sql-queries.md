# Templated SQL queries for the LDP app

<!-- md2toc -l 2 templated-sql-queries.md -->
* [Overview](#overview)
* [The requirement](#the-requirement)
* [Front-end work](#front-end-work)
* [Back-end work](#back-end-work)
* [Metadata file format](#metadata-file-format)
* [Handling configuration storage](#handling-configuration-storage)



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

Stages #2, 4, 5 and 6 do not require any new back-end support. Stage 7 unambigously requires a new back-end facility, but it should 
be trivial to provide. For stages 1 and 3 there may be a workaround -- see [Handling configuration storage](#handling-configuration-storage) below.


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


## Handling configuration storage

The requirements for back-end storage of GitHub repositories are as follows:
1. Each FOLIO user must have his own set of repositories, and we need a way of fetching a given user's repositories.
2. Each user's set can contain arbitrarily many repositories.
3. We want a user to be able to retrieve all their own configuration information efficiently.
4. For each repository, we need to store repository owner, repository name, branch, and taken.
5. We want to prevent any user from seeing any other user's authentication tokens, and ideally any of their data.

Two facilities are presently available to use:
* `mod-ldp`'s built-in key-value store (`/ldp/config`), which we use to store the existing git-repository configuration for saved queries. In this case, the key is `sqconfig` and the value is a JSON document such as `{"owner":"RandomOtherGuy","repo":"ldp-queries","token":"ghp_x66hILMfl7NXP4AbLVLA4P0L2h5FJL1eAdLV"}`.
* [`mod-configuration`](https://github.com/folio-org/mod-configuration), a core module used by much of FOLIO, which provides much more functionality, including user-specific values. However, the module is not widely loved and is in fact deprecated -- though not in favour of anything but the suggestion that modules should DIY their configuration storage. For historical reasons, `mod-ldp` uses this facility for some of its configuration (record limits and table availability).

This situation is unsatisfactory in multiple ways:
* The LDP module should not use two separate storage solutions for its configuration.
* The built-in facility is in multiple respects too primitive for what we want to do here.
* `mod-configuration`, while better, is deprecated.
* `mod-configuration` does not provide a way to protect one user's data from another user (which is one reason it's deprecated).
* It seems there is no real plan within FOLIO to replace `mod-configuration`.

From this structure, we have to build the necessary configuration storage for the LDP app.

Ideally, we would do this entirely with existing facilities, not requiring any new back-end work. Unfortunately there is no way to enforce user separation with either of the current facilities. This means that we have no option but to require new back-end developement in `mod-ldp`.

This being so, the obvious thing to do is update the config facility to handle everything we need, and also to change the UI module's existing use of `mod-configuration` to use LDP-specific configuration.

But it's ridiculous for us in the LDP project to design and build a general-purpose configuration facility when so many other modules are all solving the same problem at the same time. There was [some effort to address the configuration problem on a FOLIO-wide basis](https://wiki.folio.org/display/DD/Distributed+Configuration) but this seems to have faded away into nothing -- the most recent comments are from Septemeber 2020.

Perhaps the best thing we could do is create a general configuration system as a Java library that `mod-config` uses, and offer it to the rest of the the FOLIO community to use as they wish. On the other hand, perhaps given the amount of work involved in doing this, we would do better to bodge the problem for now, using mod-configuration (security issues and all) until the wider community comes up with its own solution.

