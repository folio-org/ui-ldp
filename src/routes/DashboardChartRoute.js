import React from 'react';
import PropTypes from 'prop-types';
import DashboardChart from '../components/DashboardChart';

function DashboardChartRoute({ match }) {
  // XXX load details of nominated dashboard
  return <DashboardChart id={match.params.id} />;
}

DashboardChartRoute.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default DashboardChartRoute;
