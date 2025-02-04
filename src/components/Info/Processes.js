import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '../../Tabs';


function Processes({ data }) {
  return (
    <Tabs>
      <pre>{JSON.stringify(data.processes, null, 2)}</pre>
    </Tabs>
  );
}


Processes.propTypes = {
  data: PropTypes.shape({
    processes: PropTypes.arrayOf(
      PropTypes.shape({
        databaseName: PropTypes.string.isRequired,
        userName: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
        realTime: PropTypes.string.isRequired,
        query: PropTypes.string.isRequired,
      }).isRequired,
    ),
  }).isRequired,
};


export default Processes;
