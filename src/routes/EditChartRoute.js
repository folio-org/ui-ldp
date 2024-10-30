import React from 'react';
import PropTypes from 'prop-types';
import { stripesConnect } from '@folio/stripes/core';
import { Loading } from '@folio/stripes/components';
import ChartForm from '../components/ChartForm';


function EditChartRoute({ match, resources, mutator }) {
  const data = {
    chart: resources.chart.records[0],
  };

  if (!data.chart) return <Loading size="xlarge" />;

  const onSubmit = async (v) => {
    const rec = { ...resources.chart.records[0], value: v };
    return mutator.chart.PUT(rec);
  };

  return <ChartForm id={match.params.id} data={data} onSubmit={onSubmit} />;
}


EditChartRoute.manifest = Object.freeze({
  chart: {
    type: 'okapi',
    path: 'settings/entries/:{id}',
    PUT: {
      throwErrors: false,
    },
  },
});


EditChartRoute.propTypes = {
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
  mutator: PropTypes.shape({
    chart: PropTypes.shape({
      PUT: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
};


export default stripesConnect(EditChartRoute);
