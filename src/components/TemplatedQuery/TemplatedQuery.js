import React from 'react';
import PropTypes from 'prop-types';
import { Pane } from '@folio/stripes/components';

function TemplatedQuery({ query }) {
  const title = query.json?.displayName || query.name;
  return (
    <Pane defaultWidth="fill" paneTitle={title}>
      <pre>{JSON.stringify(query, null, 2)}</pre>
    </Pane>
  );
}

TemplatedQuery.propTypes = {
  query: PropTypes.shape({
    name: PropTypes.string.isRequired,
    json: PropTypes.shape({
      displayName: PropTypes.string,
    }),
  }).isRequired,
};

export default TemplatedQuery;
