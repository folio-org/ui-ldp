import React from 'react';
import PropTypes from 'prop-types';
import { stripesConnect } from '@folio/stripes/core';
import { Loading } from '@folio/stripes/components';
import ViewDashboard from '../components/ViewDashboard';


function ViewDashboardRoute({ match, resources }) {
  const data = {
    dashboard: resources.dashboard.records[0],
    chartSpecs: resources.charts.records,
  };

  if (!data.dashboard) return <Loading size="xlarge" />;

  return <ViewDashboard id={match.params.id} data={data} />;
}


ViewDashboardRoute.manifest = Object.freeze({
  dashboard: {
    type: 'okapi',
    path: 'settings/entries/:{id}',
  },
  charts: {
    type: 'okapi',
    records: 'items',
    path: 'settings/entries',
    params: (_q, _p, _r, _l, props) => {
      const dashboards = props.resources?.dashboard?.records;
      if (!dashboards || dashboards.length === 0) return null;
      const ids = dashboards[0].value.charts.filter(x => x !== '');
      return {
        limit: 100,
        query: `id=(${ids.slice(0, 100).map(id => `"${id}"`).join(' or ')})`
      };
    },
  },
});


ViewDashboardRoute.propTypes = {
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
  }),
};


export default stripesConnect(ViewDashboardRoute);
