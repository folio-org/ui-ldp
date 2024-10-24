import React from 'react';
import PropTypes from 'prop-types';
import { Pane } from '@folio/stripes/components';
import DashboardChart from '../DashboardChart';


function SingleDashboard({ id, data }) {
  return (
    <Pane defaultWidth="fill" paneTitle={`Some dashboard containing some charts (${id})`}>
      {data.chartSpecs.map(chartSpec => (
        <DashboardChart key={chartSpec.id} id={chartSpec.id} spec={chartSpec.value} />
      ))}
    </Pane>
  );
}


SingleDashboard.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.shape({
    chartSpecs: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        value: PropTypes.object.isRequired,
      }).isRequired,
    ).isRequired,
  }).isRequired,
};


export default SingleDashboard;
