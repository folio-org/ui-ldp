import React from 'react';
import PropTypes from 'prop-types';
import { stripesConnect } from '@folio/stripes/core';
import Charts from '../components/Charts';


function ChartsRoute({ resources, mutator }) {
  const data = {
    charts: resources.charts.records,
  };

  const onDelete = async (id) => {
    return mutator.charts.DELETE({ id });
  };

  return <Charts data={data} onDelete={onDelete} />;
}


ChartsRoute.manifest = Object.freeze({
  charts: {
    type: 'okapi',
    records: 'items',
    path: 'settings/entries',
    GET: {
      params: {
        query: '(scope==ui-ldp.admin and key==chart-*)'
      },
    },
    DELETE: {
      throwErrors: false,
    }
  },
});


ChartsRoute.propTypes = {
  resources: PropTypes.shape({
    charts: PropTypes.shape({
      records: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
    }).isRequired,
  }),
  mutator: PropTypes.shape({
    charts: PropTypes.shape({
      DELETE: PropTypes.func.isRequired,
    }).isRequired,
  }),
};


export default stripesConnect(ChartsRoute);
