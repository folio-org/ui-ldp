import React from 'react';
import PropTypes from 'prop-types';
import { stripesConnect } from '@folio/stripes/core';
import Dashboards from '../components/Dashboards';


function DashboardsRoute({ resources }) {
  const data = {
    dashboards: resources.dashboards.records,
  };

  return <Dashboards data={data} />;
}


DashboardsRoute.manifest = Object.freeze({
  dashboards: {
    type: 'okapi',
    records: 'items',
    path: 'settings/entries',
    params: {
      query: '(scope==ui-ldp.admin and key==dashboard-*)'
    },
  },
});


DashboardsRoute.propTypes = {
  resources: PropTypes.shape({
    dashboards: PropTypes.shape({
      records: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
    }).isRequired,
  }),
};


export default stripesConnect(DashboardsRoute);
