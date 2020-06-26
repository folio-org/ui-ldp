import React from 'react';
// import { FormattedMessage } from 'react-intl';
import Chart from 'chart.js'

var blue = 'rgb(54, 162, 235)'

// Must be a class to hold a ref
class LogChart extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }
  componentDidUpdate(prevProps) {
    if(prevProps != this.props && this.props && this.props.series && this.props.series.length > 0) {
      const { series } = this.props
      const myChartRef = this.chartRef.current.getContext("2d");
      
      new Chart(myChartRef, {
          type: "scatter",
          data: {
            datasets: series
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
                  display: true
                }
              ]
            },
            tooltips: {
              callbacks: {
                title: (tooltipItems, data) => data.datasets[tooltipItems[0].datasetIndex].label,
                label: (tooltipItem, data) => tooltipItem.value,
                footer: (tooltipItems, data) => tooltipItems[0].label
              },
              footerFontStyle: 'normal'
            },
          }
      });
    }
  }
  render() {
    return (
      <canvas
        id="myChart"
        ref={this.chartRef}
      />
    )
  }
}

export default LogChart
