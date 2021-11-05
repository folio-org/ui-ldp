import React from 'react';
import PropTypes from 'prop-types';
import { Paneset, Pane } from '@folio/stripes/components';


function ListSavedQueries({ config, queries }) {
  return (
    <Paneset>
      <Pane defaultWidth="fill">
        <pre>
          {JSON.stringify({ config, queries }, null, 2)}
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
