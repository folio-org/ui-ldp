import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '../../Tabs';


function Logs({ data }) {
  return (
    <Tabs>
      <pre>{JSON.stringify(data.logs, null, 2)}</pre>
    </Tabs>
  );
}


Logs.propTypes = {
  data: PropTypes.shape({
    logs: PropTypes.arrayOf(
      PropTypes.shape({
        log_time: PropTypes.string.isRequired,
        error_severity: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
      }).isRequired,
    ),
  }).isRequired,
};


export default Logs;
