import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '../../Tabs';


function Updates({ data }) {
  return (
    <Tabs>
      <pre>{JSON.stringify(data.updates, null, 2)}</pre>
    </Tabs>
  );
}


Updates.propTypes = {
  data: PropTypes.shape({
    updates: PropTypes.arrayOf(
      PropTypes.shape({
        tableSchema: PropTypes.string.isRequired,
        tableName: PropTypes.string.isRequired,
        lastUpdate: PropTypes.string.isRequired,
        elapsedRealTime: PropTypes.number.isRequired,
      }).isRequired,
    ),
  }).isRequired,
};


export default Updates;
