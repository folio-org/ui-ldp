import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { stripesConnect } from '@folio/stripes/core';
import DashboardForm from '../components/DashboardForm';


function CreateDashboardRoute({ match, resources, mutator }) {
  const data = {
    allCharts: resources.allCharts.records,
  };

  const onSubmit = async (v) => {
    const id = uuidv4();
    const rec = {
      id,
      scope: 'ui-ldp.admin',
      key: `dashboard-${id}`,
      value: v,
    };
    return mutator.dashboard.POST(rec);
  };

  return <DashboardForm id={match.params.id} data={data} onSubmit={onSubmit} />;
}


CreateDashboardRoute.manifest = Object.freeze({
  dashboard: {
    type: 'okapi',
    path: 'settings/entries',
    fetch: false,
    POST: {
      throwErrors: false,
    },
  },
  allCharts: {
    type: 'okapi',
    records: 'items',
    path: 'settings/entries?query=(scope==ui-ldp.admin and key==chart-*)',
  },
});


CreateDashboardRoute.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  resources: PropTypes.shape({
    allCharts: PropTypes.shape({
      records: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
    }).isRequired,
  }),
  mutator: PropTypes.shape({
    dashboard: PropTypes.shape({
      POST: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
};


export default stripesConnect(CreateDashboardRoute);
