import React from 'react';
import PropTypes from 'prop-types';
import { stripesConnect } from '@folio/stripes/core';
import SingleDashboard from '../components/SingleDashboard';


function SingleDashboardRoute({ match, resources }) {
  // XXX Load details of nominated dashboard, not just of all charts
  // console.log('resources =', resources);
  const data = {
    dashboard: undefined, // XXX for now
    chartSpecs: resources.charts.records,
  };

  return <SingleDashboard id={match.params.id} data={data} />;
}


SingleDashboardRoute.manifest = Object.freeze({
  charts: {
    // /settings/entries?query=(scope==ui-ldp.admin and key==chart-*)
    type: 'okapi',
    records: 'items',
    path: 'settings/entries',
    params: {
      // We'll need to be cleverer when we want only the charts of this dashboard
      query: '(scope==ui-ldp.admin and key==chart-*)'
    },
  },
});


SingleDashboardRoute.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  resources: PropTypes.shape({
    charts: PropTypes.shape({
      records: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
    }).isRequired,
  }),
};


export default stripesConnect(SingleDashboardRoute);
