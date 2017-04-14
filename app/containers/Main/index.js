import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import ControlPanel from '../../components/ControlPanel';
import Chart from '../../components/Chart';
import PlotList from '../../components/PlotList';
import Sidebar from '../Sidebar';
import makeSelectMain from './selectors';
import {
  selectPredictions,
  selectIndicators,
  selectLabels,
  selectConnectionStatus,
  selectMetropolisStatus,
  selectModelName,
} from './selectors';
import {
  toggleIndicator,
  togglePrediction,
  startTrain,
  setModelName,
} from './actions';

const Info = styled.h5`
text-align: center;
margin: 30px auto;
`;

const Body = styled.div`
max-width: 80%;
margin: 0 auto;
`;

export class Main extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <div>
        <Sidebar connectionStatus={this.props.connectionStatus}
          indicators={this.props.indicators}>
          <Info>Connection status: {this.props.connectionStatus}</Info>
          <Divider />
          <PlotList header="Indicators" items={this.props.indicators}
            toggleItem={this.props.toggleIndicator}/>
          <Divider />
          <PlotList header="Predictions" items={this.props.predictions}
            toggleItem={this.props.togglePrediction}/>
        </Sidebar>

        <Body>
          <ControlPanel>
            <Info>Metropolis status: {this.props.metropolisStatus}</Info>
            <TextField floatingLabelText="Name" value={this.props.modelName}
              onChange={(evt, newValue) => this.props.setModelName(newValue)}/>
            <RaisedButton label="Train" onClick={this.props.startTrain}
              disabled={this.props.metropolisStatus === 'Running'}/>
          </ControlPanel>

          <Chart indicators={this.props.indicators}
            predictions={this.props.predictions} labels={this.props.labels} />
      </Body>
      </div>
    );
  }
}

Main.propTypes = {
  indicators: PropTypes.object.isRequired,
  predictions: PropTypes.object.isRequired,
  labels: PropTypes.array.isRequired,
  connectionStatus: PropTypes.string.isRequired,
  toggleIndicator: PropTypes.func.isRequired,
  togglePrediction: PropTypes.func.isRequired,
  startTrain: PropTypes.func.isRequired,
  modelName: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  Main: makeSelectMain(),
  indicators: selectIndicators(),
  predictions: selectPredictions(),
  labels: selectLabels(),
  connectionStatus: selectConnectionStatus(),
  metropolisStatus: selectMetropolisStatus(),
  modelName: selectModelName(),
});

function mapDispatchToProps(dispatch) {
  return {
    toggleIndicator: (payload) => dispatch(toggleIndicator(payload)),
    togglePrediction: (payload) => dispatch(togglePrediction(payload)),
    startTrain: () => dispatch(startTrain()),
    setModelName: (payload) => dispatch(setModelName(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
