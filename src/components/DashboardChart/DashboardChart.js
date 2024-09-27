import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { /* FormattedMessage, */ useIntl } from 'react-intl';
import { CategoryScale } from 'chart.js';
import { Chart as ChartJS } from 'chart.js/auto';
import { Chart } from 'react-chartjs-2'; // eslint-disable-line no-unused-vars
import { useStripes } from '@folio/stripes/core';
import { Loading } from '@folio/stripes/components';
import BigError from '../BigError';
import loadReport from '../../util/loadReport';


ChartJS.register(CategoryScale);


function DashboardChart({ id, spec }) {
  const intl = useIntl();
  const stripes = useStripes();
  const [response, setResponse] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    loadReport(intl, stripes, spec.query.url, spec.query.params, setResponse, setError, spec.query.limit);
  }, [intl, stripes, spec.query.url, spec.query.params, spec.query.limit]);

  if (error) {
    return <BigError message={error} />;
  } else if (!response) {
    return <Loading />;
  }

  // We have data and no error
  const rows = response.resp;

  const data = {
    labels: rows.map(r => r[spec.chart.labelsField].substring(0, 10)),
    datasets: spec.datasets.map(ds => ({
      label: ds.label,
      data: rows.map(r => r[ds.dataField]),
    })),
  };

  const options = {
    // indexAxis: 'y',
    // maintainAspectRatio: false,
  };

  return (
    <div style={{
      border: '3px solid lightgray',
      overflow: 'auto',
      resize: 'both',
      'min-height': '200px',
      'min-width': '200px',
    }
    }
    >
      <h3 style={{ 'margin-left': '1em' }}>{spec.name} ({id})</h3>
      <Chart
        redraw
        type={spec.chart.type}
        data={data}
        options={options}
      />
    </div>
  );
}


DashboardChart.propTypes = {
  id: PropTypes.string.isRequired,
  spec: PropTypes.shape({
    name: PropTypes.string.isRequired,
    query: PropTypes.shape({
      url: PropTypes.string.isRequired,
      params: PropTypes.object.isRequired,
      limit: PropTypes.number.isRequired,
    }).isRequired,
    chart: PropTypes.shape({
      type: PropTypes.string.isRequired,
      labelsField: PropTypes.string.isRequired,
    }).isRequired,
    datasets: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        dataField: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
  }).isRequired,
};


export default DashboardChart;
