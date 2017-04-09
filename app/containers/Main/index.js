import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import {Line} from 'react-chartjs-2';

import Sidebar from '../Sidebar';
import makeSelectMain from './selectors';
import {
  selectPredictions,
  selectIndicators,
} from '../../selectors';

const defaultOptions = {
  label: 'My First dataset',
  fill: false,
  lineTension: 0.1,
  backgroundColor: 'rgba(75,192,192,0.4)',
  borderColor: 'rgba(75,192,192,1)',
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0.0,
  borderJoinStyle: 'miter',
  pointBorderColor: 'rgba(75,192,192,1)',
  pointBackgroundColor: '#fff',
  pointBorderWidth: 1,
  pointHoverRadius: 5,
  pointHoverBackgroundColor: 'rgba(75,192,192,1)',
  pointHoverBorderColor: 'rgba(220,220,220,1)',
  pointHoverBorderWidth: 2,
  pointRadius: 1,
  pointHitRadius: 10,
};

const LI = styled.li`
margin-left: 500px;
`;

export class Main extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const chartData = {
      datasets: []
    };

    Object.keys(this.props.indicators).forEach((key) => {
      const indicator = this.props.indicators[key];
      if (!indicator.show || !indicator.data) {
        return;
      }
      if (!chartData.labels) {
        chartData.labels = indicator.labels;
      }
      const data = Object.assign({}, defaultOptions, {
        data: indicator.data, 
      });
      chartData.datasets.push(data);
    });

    return (
      <div>
        <Sidebar />
        <Line data={chartData} />
      </div>
    );
  }
}

Main.propTypes = {
  indicators: PropTypes.object.isRequired,
  predictions: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  Main: makeSelectMain(),
  indicators: selectIndicators(),
  predictions: selectPredictions(),
});

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
