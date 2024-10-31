import React from 'react';
import PropTypes from 'prop-types';
import { stripesConnect } from '@folio/stripes/core';
import { Loading } from '@folio/stripes/components';
import ChartForm from '../components/ChartForm';


function EditChartRoute({ match, resources, mutator }) {
  const data = {
    chart: resources.editChart.records[0],
  };

  if (!data.chart) return <Loading size="xlarge" />;

  const query = data.chart.value.query;
  if (query.params) {
    query.params = Object.entries(query.params).map(([k, v]) => ({ key: k, value: v }));
  }

  const onSubmit = async (value) => {
    const v = structuredClone(value);
    const rec = { ...resources.editChart.records[0], value: v };
    if (v.query?.params) {
      v.query.params = Object.fromEntries(v.query.params.map(x => [x.key, x.value]));
    }
    if (v.query?.limit) {
      v.query.limit = Number(v.query.limit);
    }
    return mutator.editChart.PUT(rec);
  };

  return <ChartForm id={match.params.id} data={data} onSubmit={onSubmit} />;
}


EditChartRoute.manifest = Object.freeze({
  editChart: {
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
    editChart: PropTypes.shape({
      records: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
    }).isRequired,
  }),
  mutator: PropTypes.shape({
    editChart: PropTypes.shape({
      PUT: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
};


export default stripesConnect(EditChartRoute);
