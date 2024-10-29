import React from 'react';
import PropTypes from 'prop-types';
import { stripesConnect } from '@folio/stripes/core';
import { Loading } from '@folio/stripes/components';
import DashboardForm from '../components/DashboardForm';


function EditDashboardRoute({ match, resources, mutator }) {
  const data = {
    dashboard: resources.dashboard.records[0],
    allCharts: resources.allCharts.records,
  };

  if (!data.dashboard) return <Loading size="xlarge" />;

  const onSubmit = async (v) => {
    const rec = { ...resources.dashboard.records[0], value: v };
    return mutator.dashboard.PUT(rec);
  };

  return <DashboardForm id={match.params.id} data={data} onSubmit={onSubmit} />;
}


EditDashboardRoute.manifest = Object.freeze({
  dashboard: {
    type: 'okapi',
    path: 'settings/entries/:{id}',
    PUT: {
      throwErrors: false,
    },
  },
  charts: {
    type: 'okapi',
    records: 'items',
    path: 'settings/entries',
    params: (_q, _p, _r, _l, props) => {
      const dashboards = props.resources?.dashboard?.records;
      if (!dashboards || dashboards.length === 0) return null;
      const ids = dashboards[0].value.charts;
      return {
        limit: 100,
        query: `id=(${ids.slice(0, 100).map(id => `"${id}"`).join(' or ')})`
      };
    },
  },
  allCharts: {
    type: 'okapi',
    records: 'items',
    path: 'settings/entries?query=(scope==ui-ldp.admin and key==chart-*)',
  },
});


EditDashboardRoute.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  resources: PropTypes.shape({
    dashboard: PropTypes.shape({
      records: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
    }).isRequired,
    charts: PropTypes.shape({
      records: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
    }).isRequired,
    allCharts: PropTypes.shape({
      records: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
    }).isRequired,
  }),
  mutator: PropTypes.shape({
    dashboard: PropTypes.shape({
      PUT: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
};


export default stripesConnect(EditDashboardRoute);
