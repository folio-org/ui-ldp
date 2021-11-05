import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { LoadingPane, Paneset, Pane, MultiColumnList } from '@folio/stripes/components';


function processQueries(queries) {
  return Object.keys(queries).sort().map(key => {
    const obj = queries[key];
    if (obj.encoding !== 'base64') {
      throw new Error(`Unsupported GitHub content encoding ${obj.encoding}`);
    }

    const decoded = atob(obj.content);
    const json = JSON.parse(decoded);
    return {
      ...obj,
      decoded,
      json,
      contentData: {
        ...json.META,
        fileName: key,
      }
    };
  });
}


// eslint-disable-next-line no-unused-vars
function ListSavedQueries({ config, queries }) {
  const [processed, setProcessed] = useState();

  useEffect(() => {
    setProcessed(processQueries(queries));
  }, [queries]);

  const contentData = processed ? processed.map(x => x.contentData): undefined;

  const c2 = [
    {
      "displayName": "Active users in alphabetical order by username",
      "autoRun": true,
      "creator": "diku_adin",
      "created": "2021-11-03T15:16:24+0000",
      "updated": "2021-11-03T15:16:24+0000",
      "comment": "The second query, copied and modified from all-users",
      "fileName": "active-users.json"
    },
    {
      "displayName": "All users in alphabetical order by username",
      "autoRun": true,
      "creator": "diku_adin",
      "created": "2021-11-02T15:27:19+0000",
      "updated": "2021-11-02T16:01:33+0000",
      "comment": "The very first same query, created by hand",
      "fileName": "all-users.json"
    },
    {
      "fileName": "dummy.json"
    }
  ];

  if (!contentData) return <LoadingPane />;

  return (
    <Paneset>
      <Pane defaultWidth="fill">
        <MultiColumnList
          contentData={contentData}
        />
        <pre>
          {JSON.stringify(contentData, null, 2)}
        </pre>

        <MultiColumnList
          contentData={c2}
        />
        <pre>
          {JSON.stringify(c2, null, 2)}
        </pre>
      </Pane>
    </Paneset>
  );
}


ListSavedQueries.propTypes = {
  config: PropTypes.shape({
    owner: PropTypes.string,
    repo: PropTypes.string,
    branch: PropTypes.string,
  }).isRequired,
  queries: PropTypes.objectOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
      encoding: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired, // XXX hopefully to use for deletion
    })
  ).isRequired,
};


export default ListSavedQueries;
