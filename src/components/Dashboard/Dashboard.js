// XXX dashboards should in general contain multiple charts

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { /* FormattedMessage, */ useIntl } from 'react-intl';
import { CategoryScale } from 'chart.js';
import { Chart as ChartJS } from 'chart.js/auto';
import { Chart } from 'react-chartjs-2'; // eslint-disable-line no-unused-vars
import { useStripes } from '@folio/stripes/core';
import { Pane, LoadingPane } from '@folio/stripes/components';
import BigError from '../BigError';
import loadReport from '../../util/loadReport';


ChartJS.register(CategoryScale);


// XXX should load chart object from mod-settings
const spec = {
  id: 123,
  name: 'Daily checkout counts through the year',
  query: {
    url: 'https://raw.githubusercontent.com/MikeTaylor/metadb-chart-queries/main/./checkins_by_date.sql',
    params: {
      start_date: '2023-09-01T05:00:00.000Z'
    },
    limit: 1000
  },
  chart: {
    // Params to say how to draw this using Chart.js
    type: 'line',
    labelsField: 'checkin_date',
  },
  datasets: [
    {
      label: 'Number of checkins',
      dataField: 'count',
    },
    {
      label: 'Incremented',
      dataField: 'more',
    },
    {
      label: 'Halved',
      dataField: 'less',
    },
  ],
};


function Dashboard({ id }) {
  const intl = useIntl();
  const stripes = useStripes();
  const [response, setResponse] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    loadReport(intl, stripes, spec.query.url, spec.query.params, setResponse, setError, spec.query.limit);
  }, [intl, stripes]);

  if (error) {
    return <BigError message={error} />;
  } else if (!response) {
    return <LoadingPane />;
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
    <Pane defaultWidth="fill" paneTitle={`${spec.name} (${id})`}>
      <Chart
        redraw
        type={spec.chart.type}
        data={data}
        options={options}
      />
    </Pane>
  );
}


Dashboard.propTypes = {
  id: PropTypes.string.isRequired,
};


export default Dashboard;
