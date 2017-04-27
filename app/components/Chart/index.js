import React, { PropTypes } from 'react';
import {Line} from 'react-chartjs-2';
import styled from 'styled-components';

const datasetOptions = {
  fill: false,
  lineTension: 0.1,
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0.0,
  borderJoinStyle: 'miter',
  pointBorderWidth: 1,
  pointHoverRadius: 5,
  pointHoverBorderWidth: 2,
  pointRadius: 1,
  pointHitRadius: 10,
};

function createChartOptions(min, max) {
  return {
    scales: {
      yAxes: [{
        ticks: {
          min,
          max,
        },
      }],
    },
  };
}

function constructPlots(plotDatas) {
  const rgbaConstructor = (r, g, b) => (a=1) => `rgba(${r},${g},${b},${a})`;

  return Object.keys(plotDatas).reduce((datasets, key) => {
    const plotData = plotDatas[key];
    if (!plotData.show || !plotData.data) {
      return datasets;
    }

    const {r, g, b} = plotData;
    const color = rgbaConstructor(r, g, b);
    const dataset = Object.assign({}, datasetOptions, {
      data: plotData.data, 
      label: key,
      pointBorderColor: color(),
      backgroundColor: color(0.6),
      borderColor: color(0.6),
      pointBackgroundColor: color(),
      pointHoverBackgroundColor: color(),
      pointHoverBorderColor: color(),
    });

    datasets.push(dataset);
    return datasets;
  }, []);
}

function Chart(props) {
  const datasets = constructPlots(props.indicators)
    .concat(constructPlots(props.predictions));
  const chartOptions = createChartOptions(props.min, props.max);

  return (
    <Line options={chartOptions} data={{
      labels: props.labels,
      datasets,
    }} />
  );
}

Chart.propTypes = {
  indicators: PropTypes.object.isRequired,
  predictions: PropTypes.object.isRequired,
  labels: PropTypes.array.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
};

export default Chart;
