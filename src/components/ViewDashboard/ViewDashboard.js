import React from 'react';
import PropTypes from 'prop-types';
import { Pane } from '@folio/stripes/components';
import DashboardChart from '../DashboardChart';


function ViewDashboard({ data }) {
  return (
    <Pane defaultWidth="fill" paneTitle={data.dashboard.value.name}>
      <p>{data.dashboard.value.description}</p>
      {data.chartSpecs.map(chartSpec => (
        <DashboardChart key={chartSpec.id} id={chartSpec.id} spec={chartSpec.value} />
      ))}
    </Pane>
  );
}


ViewDashboard.propTypes = {
  data: PropTypes.shape({
    chartSpecs: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        value: PropTypes.object.isRequired,
      }).isRequired,
    ).isRequired,
    dashboard: PropTypes.shape({
      value: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};


export default ViewDashboard;
