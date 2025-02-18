import React from 'react';
import PropTypes from 'prop-types';
import { stripesConnect } from '@folio/stripes/core';
import Dashboards from '../components/Dashboards';


function DashboardsRoute({ resources, mutator }) {
  const data = {
    dashboards: resources.dashboards.records,
  };

  const onDelete = async (id) => {
    return mutator.dashboards.DELETE({ id });
  };

  return <Dashboards data={data} onDelete={onDelete} />;
}


DashboardsRoute.manifest = Object.freeze({
  dashboards: {
    type: 'okapi',
    records: 'items',
    path: 'settings/entries',
    GET: {
      params: {
        query: '(scope==ui-ldp.admin and key==dashboard-*)'
      },
    },
    DELETE: {
      throwErrors: false,
    },
  },
});


DashboardsRoute.propTypes = {
  resources: PropTypes.shape({
    dashboards: PropTypes.shape({
      records: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
    }).isRequired,
  }),
  mutator: PropTypes.shape({
    dashboards: PropTypes.shape({
      DELETE: PropTypes.func.isRequired,
    }).isRequired,
  }),
};


export default stripesConnect(DashboardsRoute);
