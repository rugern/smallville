import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';

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
  selectEpochs,
  selectOffset,
  selectLimit,
} from './selectors';
import {
  toggleIndicator,
  togglePrediction,
  startTrain,
  setModelName,
  setEpochs,
  setOffset,
  setLimit,
} from './actions';
import {
  selectSidebarOpen,
} from '../Sidebar/selectors';

const Info = styled.h5`
text-align: center;
margin: 30px auto;
`;

const Body = styled.div`
max-width: 80%;
padding: 20px;
margin: ${props => props.sidebarOpen ? '0 auto 0 256px' : '0 auto'};
`;

const Container = styled.div`
display: flex;
flex-direction: row;
max-width: 80%;
margin: 0 auto;
padding: 10px 0;
`;

const Label = styled.h5`
width: 100px;
margin: 0;
`;

const outerSliderStyle = {
  width: 'calc(100% - 100px)',
};

const sliderStyle = {
  margin: 0,
};

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

        <Body sidebarOpen={this.props.sidebarOpen}>
          <ControlPanel>
            <Info>Metropolis status: {this.props.metropolisStatus}</Info>

            <TextField floatingLabelText="Name" value={this.props.modelName}
              onChange={(evt, newValue) => this.props.setModelName(newValue)}/>

            <RaisedButton label="Train" onClick={this.props.startTrain}
              disabled={this.props.metropolisStatus === 'Running'}/>

            <Container>
              <Label>Epochs: {this.props.epochs}</Label>
              <Slider min={1} max={20} step={1} value={this.props.epochs}
                style={outerSliderStyle} sliderStyle={sliderStyle}
                onChange={(evt, newValue) => this.props.setEpochs(newValue)} />
            </Container>

            <Container>
              <Label>Offset: {this.props.offset}</Label>
              <Slider min={0} max={200} step={1} value={this.props.offset}
                style={outerSliderStyle} sliderStyle={sliderStyle}
                onChange={(evt, newValue) => this.props.setOffset(newValue)} />
            </Container>

            <Container>
              <Label>Limit: {this.props.limit}</Label>
              <Slider min={1} max={200} step={1} value={this.props.limit}
                style={outerSliderStyle} sliderStyle={sliderStyle}
                onChange={(evt, newValue) => this.props.setLimit(newValue)} />
            </Container>
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
  sidebarOpen: PropTypes.bool.isRequired,
  epochs: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  Main: makeSelectMain(),
  indicators: selectIndicators(),
  predictions: selectPredictions(),
  labels: selectLabels(),
  connectionStatus: selectConnectionStatus(),
  metropolisStatus: selectMetropolisStatus(),
  modelName: selectModelName(),
  sidebarOpen: selectSidebarOpen(),
  epochs: selectEpochs(),
  offset: selectOffset(),
  limit: selectLimit(),
});

function mapDispatchToProps(dispatch) {
  return {
    toggleIndicator: (payload) => dispatch(toggleIndicator(payload)),
    togglePrediction: (payload) => dispatch(togglePrediction(payload)),
    startTrain: () => dispatch(startTrain()),
    setModelName: (payload) => dispatch(setModelName(payload)),
    setEpochs: (payload) => dispatch(setEpochs(payload)),
    setOffset: (payload) => dispatch(setOffset(payload)),
    setLimit: (payload) => dispatch(setLimit(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
