import React from 'react';
import PropTypes from 'prop-types';
import { Paneset, Pane, NoValue } from '@folio/stripes/components';

function TemplatedQueries({ queries }) {
  return (
    <Paneset>
      <Pane defaultWidth="50%" paneTitle="Select templated query">
        <pre>{JSON.stringify(queries, null, 2)}</pre>
      </Pane>
      <Pane defaultWidth="fill" paneTitle="Fill in query parameters">
        <NoValue />
      </Pane>
    </Paneset>
  );
}

TemplatedQueries.propTypes = {
  queries: PropTypes.arrayOf(
    PropTypes.shape({
      // name: PropTypes.string.isRequired,
    }).isRequired,
  ),
};

export default TemplatedQueries;
