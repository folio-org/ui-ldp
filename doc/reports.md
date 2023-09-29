# Authoring reports for the FOLIO Reporting App

<!-- md2toc -l 2 reports.md -->
* [Overview](#overview)
* [Storing and publishing reports](#storing-and-publishing-reports)
* [Writing your SQL query](#writing-your-sql-query)
* [Writing JSON metadata for your query](#writing-json-metadata-for-your-query)
* [Setting up the Reporting app to find your report](#setting-up-the-reporting-app-to-find-your-report)
* [Using your query](#using-your-query)



## Overview

Version 2.0 of the FOLIO Reporting App (formerly known as LDP) introduced a major new feature in reporting. This facility allows users to run reports created and stored by database experts, filling in parameters to get the specific information they need. (Go to the "Run report" tab of the Reporting app in your FOLIO instance.)

While the reporting facility is easy for end-users to use, authoring reports to be used by this facility requires more expertise. This document provides and overview of the requirements.


##  Storing and publishing reports

Authoring and editing of templated reports is not done from within from the Reporting app. This is done elsewhere using whatever tools the developer finds optimal: the app only consumes them.

Reports consist of two files that share a basename: one is the query itself, written in SQL and named `NAME.sql`; the other in metadata about the query, written in JSON and named `NAME.json`. Optionally a third file, `NAME.md` can be created to hold further documentation about the report.

Reports are published by pushing them to a GitHub repository -- specifically, a particular directory within a particular branch of a repository. The source is specific as a GitHub user, repository name, branch name and directory.

Since the Reporting app can draw reports from multiple sources (see below), it's possible for a FOLIO instance to be configured with (for example) a global source holding reports developed by the FOLIO reporting community, a local source for reports developed within the institition, and perhaps a development source for reports still being worked on. Other configurations are possible.

For example, https://github.com/MikeTaylor/dummy-ldp-queries/tree/main/queries contains some dummy reports created during the software development process. One is represented by the files `sers_by_creation_date.sql` and `sers_by_creation_date.json`, the other by the files `mikes_query.sql`, `mikes_query.json` and (for documentation only) `mikes_query.md`.


## Writing your SQL query

XXX Nassib to write this part. Explain:
* The magic comment at the start
* Creating functions and specifying types
* Injecting parameters into the query
* The `LANGUAGE SQL` / `STABLE` / `PARALLEL SAFE` stuff at the end
* Any other conventions

In a simple report to list users created between specified dates, the SQL query might look like this:
```
--ldp:function get_users

CREATE FUNCTION get_users(
    start_date date DEFAULT '2000-01-01',
    end_date date DEFAULT '2050-01-01'
)
RETURNS TABLE(
    id text,
    barcode text,
    created_date timestamp with time zone)
AS $$
SELECT id::text, barcode, created_date

    FROM user_users
    WHERE user_users.created_date >= start_date AND user_users.created_date <= end_date
$$
LANGUAGE SQL
STABLE
PARALLEL SAFE;
```

## Writing JSON metadata for your query

The metadata file associated with the SQL query specifies what template parameters exist and how they should be supplied. From this, the Reporting app generates a form for the user to enter values for these parameters. Parameters can be mandatory or optional, free-text or selected from a controlled vocabulary.

This file also contain additional whole-query information, such as a human-readable name and description, and a guide to providing parameter values.

Such a file might look like this (for the SQL query above):
```
{
    "displayName": "List users by date of creation",
    "description": "Created by Kurt to exercise mod-ldp's reporting facility",
    "instructions": "Choose a start and end date for the user-creation period.",
    "parameters": [
        {
            "name": "start_date",
            "displayName": "Earliest date of user creation",
            "type": "date",
            "required": false
        },
        {
            "name": "end_date",
            "displayName": "Latest date of user creation",
            "type": "date",
            "required": false
        }
    ]
}
```

The fields at the top level are:

* `displayName` -- the name by which the report is known in the UI.
* `description` -- an explanation of what the report is for, and optionally details such as who created and maintains it.
* `instructions` -- information of how to fill in the form.
* `parameters` -- an array of parameters for which the user can fill in values.

Each element of the `parameters` array is an object with the following keys:
* `name` -- the machine-reaadable name of of the parameter, which must match one of those declared in the SQL query.
* `displayName` -- the human-readable name of the parameter, which is displayed to the user in the form.
* `required` -- a boolean indicating whether or not the field is mandatory. If omitted, the default is that the field is optional.
* `type` -- one of a small number of short strings indicating the type of the field. Possible values include:
  * `text` -- a string, which by default can be freely entered, but which may be controlled as described below.
  * `date` -- a date, which is chosen using a date-picker.
* `controlled.options` -- if the type is `text` and this is provided, then it must be an array of strings from which the user will be invited to select one.


## Setting up the Reporting app to find your report

Once a report or reports have been pushed to GitHub, you can make the Reporting app aware of them by going to **Settings** &rarr; **Reporting** &rarr; **Report repositories**.

This page lists all the report sources currently known. You can edit the information about existing sources, or click the `+` sign at the bottom of the list to add a new source. Then enter the GitHub username, repo name, branch and directory. For example, to use reports from https://github.com/MikeTaylor/dummy-ldp-queries/tree/main/queries enter:
* GitHub user `MikeTaylor`
* Repository name within user's area `dummy-ldp-queries`
* Branch of the specified repository `main`
* Directory within repository `queries`


## Using your query

Go the the Reporting app and click on the "Run report" tab in the left bar. The list of reports that appears will include your new report (and any others from the same directory).

Click on the query's name to display the form generated from its metadata, fill in the form and click **Submit**.

When the results appear, they can be exported in CSV format using the **CSV** button at top right, and the resulting file loaded into a spreadsheet.

The results can be dismissed by the cross at top left.


