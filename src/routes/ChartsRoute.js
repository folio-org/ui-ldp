import React from 'react';
import PropTypes from 'prop-types';
import { stripesConnect } from '@folio/stripes/core';
import Charts from '../components/Charts';


function ChartsRoute({ resources }) {
  const data = {
    charts: resources.charts.records,
  };

  return <Charts data={data} />;
}


ChartsRoute.manifest = Object.freeze({
  charts: {
    type: 'okapi',
    records: 'items',
    path: 'settings/entries',
    params: {
      query: '(scope==ui-ldp.admin and key==chart-*)'
    },
  },
});


ChartsRoute.propTypes = {
  resources: PropTypes.shape({
    charts: PropTypes.shape({
      records: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
    }).isRequired,
  }),
};


export default stripesConnect(ChartsRoute);
