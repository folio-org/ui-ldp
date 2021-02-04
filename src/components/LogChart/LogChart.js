/* eslint-disable */

import React from 'react';
// import { FormattedMessage } from 'react-intl';
import Chart from 'chart.js';
import moment from 'moment';

function listToDatasets(resp) {
  const groups = {}; const
    buckets = [];
  for (let i = 0; i < resp.length; i++) {
    const item = resp[i];
    const tableName = item.tableName === '' ? '[no table]' : item.tableName;
    if (!(tableName in groups)) {
      const idx = buckets.push({
        'label' : tableName,
        'data': []
      });
      groups[tableName] = idx - 1;
    }
    const idx = groups[tableName];
    buckets[idx].data.push({
      x: new Date(item.logTime),
      y: item.elapsedTime
    });
  }
  return buckets;
}

// Must be a class to hold a ref
class LogChart extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    this.myChart = new Chart(this.chartRef.current.getContext('2d'), {
      type: 'scatter',
      data: {
        datasets: listToDatasets(this.props.series)
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              type: 'time',
              display: true,
              ticks: {
                min: moment(this.props.startDate).toDate(),
                max: moment(this.props.endDate).toDate()
              }
            }
          ]
        },
        tooltips: {
          callbacks: {
            title: (tooltipItems, data) => data.datasets[tooltipItems[0].datasetIndex].label,
            label: (tooltipItem) => tooltipItem.value,
            footer: (tooltipItems) => tooltipItems[0].label
          },
          footerFontStyle: 'normal'
        },
      }
    });
  }

  componentDidUpdate() {
    this.myChart.options.scales.xAxes[0].ticks.min = moment(this.props.startDate).toDate();
    this.myChart.options.scales.xAxes[0].ticks.max = moment(this.props.endDate).toDate();
    this.myChart.data = { datasets: listToDatasets(this.props.series) };
    this.myChart.update();
  }

  render() {
    return (
      <canvas
        id="myChart"
        ref={this.chartRef}
      />
    );
  }
}

export default LogChart;
