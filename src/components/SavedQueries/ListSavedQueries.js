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
    };
  });
}


// eslint-disable-next-line no-unused-vars
function ListSavedQueries({ config, queries }) {
  const [processed, setProcessed] = useState();

  useEffect(() => {
    setProcessed(processQueries(queries));
  }, [queries]);

  const contentData = !processed ? undefined : (
    processed.map(x => {
      return {
        ...x.json.META,
        name: x.name,
      }
    })
  );

  if (!contentData) return <LoadingPane />;

  return (
    <Paneset>
      <Pane defaultWidth="fill">
        <MultiColumnList
          contentData={contentData}
          visibleColumns={['name', 'displayName', 'autoRun', 'creator', 'created', /*'updated',*/ 'comment']}
        />
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
