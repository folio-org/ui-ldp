import React from 'react';
import PropTypes from 'prop-types';
import { stripesConnect } from '@folio/stripes/core';
import { Loading } from '@folio/stripes/components';
import ViewChart from '../components/ViewChart';


function ViewChartRoute({ match, resources }) {
  const data = {
    chart: resources.chart.records[0],
  };

  if (!data.chart) return <Loading size="xlarge" />;

  return <ViewChart id={match.params.id} data={data} />;
}


ViewChartRoute.manifest = Object.freeze({
  chart: {
    type: 'okapi',
    path: 'settings/entries/:{id}',
  },
});


ViewChartRoute.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  resources: PropTypes.shape({
    chart: PropTypes.shape({
      records: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
    }).isRequired,
  }),
};


export default stripesConnect(ViewChartRoute);
