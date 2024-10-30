import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { stripesConnect } from '@folio/stripes/core';
import ChartForm from '../components/ChartForm';


function CreateChartRoute({ match, mutator }) {
  const onSubmit = async (v) => {
    const id = uuidv4();
    const rec = {
      id,
      scope: 'ui-ldp.admin',
      key: `chart-${id}`,
      value: v,
    };
    return mutator.chart.POST(rec);
  };

  return <ChartForm id={match.params.id} data={{}} onSubmit={onSubmit} />;
}


CreateChartRoute.manifest = Object.freeze({
  chart: {
    type: 'okapi',
    path: 'settings/entries',
    fetch: false,
    POST: {
      throwErrors: false,
    },
  },
});


CreateChartRoute.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  mutator: PropTypes.shape({
    chart: PropTypes.shape({
      POST: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
};


export default stripesConnect(CreateChartRoute);
