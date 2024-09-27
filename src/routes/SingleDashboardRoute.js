import React from 'react';
import PropTypes from 'prop-types';
import SingleDashboard from '../components/SingleDashboard';

function SingleDashboardRoute({ match }) {
  // XXX load details of nominated dashboard
  return <SingleDashboard id={match.params.id} />;
}

SingleDashboardRoute.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default SingleDashboardRoute;
