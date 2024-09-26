import React from 'react';
import PropTypes from 'prop-types';
import Dashboard from '../components/Dashboard';

function DashboardRoute({ match }) {
  // XXX load details of nominated dashboard
  return <Dashboard id={match.params.id} />;
}

DashboardRoute.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default DashboardRoute;
