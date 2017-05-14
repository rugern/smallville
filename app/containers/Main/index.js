import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';
import { List } from 'material-ui/List';
import Delete from 'material-ui/svg-icons/action/delete';

import CustomListItem from '../../components/CustomListItem';
import Column from '../../components/Column';
import StyledColumn from '../../components/StyledColumn';
import Row from '../../components/Row';
import Info from '../../components/Info';
import Chart from '../../components/Chart';
import PlotList from '../../components/PlotList';
import makeSelectMain, {
  selectPredictions,
  selectIndicators,
  selectLabels,
  selectEpochs,
  selectOffset,
  selectLimit,
  selectDatasize,
  selectMax,
  selectMin,
} from './selectors';
import {
  toggleIndicator,
  togglePrediction,
  startTrain,
  setEpochs,
  setOffset,
  setLimit,
} from './actions';
import {
  selectConnectionStatus,
  selectMetropolisStatus,
  selectModels,
  selectDatafiles,
  selectDatafile,
  selectInfo,
  selectModel,
} from '../App/selectors';
import {
  setModel,
  addModel,
  setDatafile,
  deleteModel,
} from '../App/actions';
import {
  selectSidebarOpen,
} from '../Sidebar/selectors';

const Body = styled.div`
width: 100%;
margin: 0 auto;
`;

const Label = styled.h5`
width: 100px;
margin: 0;
`;

const Message = styled.div`
font-size: 12px;
`;

const outerSliderStyle = {
  width: 'calc(100% - 100px)',
};

const sliderStyle = {
  margin: 0,
};

const listStyle = {
  border: '1px solid white',
  margin: '0 0 20px 0',
};

const textFieldStyle = {
};

export class Main extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      newModelName: '',
    };
  }

  setDatafile(newValue) {
    if (!this.isPickerAvailable()) {
      return;
    }
    this.props.dispatch(setDatafile(newValue));
  }

  setModel(newValue) {
    if (!this.isPickerAvailable()) {
      return;
    }
    this.props.dispatch(setModel(newValue));
  }

  deleteModel(model, index, evt) {
    evt.stopPropagation();
    if (!this.isPickerAvailable()) {
      return;
    }
    this.props.dispatch(deleteModel({ model, index }));
  }

  createNewModel() {
    this.props.dispatch(addModel(this.state.newModelName));
    this.setState({
      newModelName: '',
    });
  }

  updateNewModelName(newValue) {
    this.setState({
      newModelName: newValue,
    });
  }

  isRunAvailable = () => this.props.metropolisStatus !== 'Busy'
    && this.props.connectionStatus === 'connect'
    && this.props.modelName !== ''
    && this.props.datafile !== '';

  isPickerAvailable = () => this.props.metropolisStatus !== 'Busy'
    && this.props.connectionStatus === 'connect';

  render() {
    const models = this.props.models.map((model, index) =>
      <CustomListItem active={this.props.modelName === model} key={index}>
        <button onClick={this.setModel.bind(this, model)}>{model}</button>
        <Delete onTouchTap={this.deleteModel.bind(this, model, index)} />
      </CustomListItem>
    );

    const datafiles = this.props.datafiles.map((datafile, index) =>
      <CustomListItem
        active={this.props.datafile === datafile} key={index}
        onClick={this.setDatafile.bind(this, datafile)}
      >
        <span>{datafile}</span>
      </CustomListItem>
    );

    const info = this.props.info.slice().reverse().map((entry, index) =>
      <Message key={index}>{entry}</Message>
    );

    return (
      <Body>
        <Row>
          <StyledColumn width={3}>
            <PlotList
              header="Indicators" items={this.props.indicators}
              toggleItem={this.props.toggleIndicator}
            />
            <Divider />
            <PlotList
              header="Predictions" items={this.props.predictions}
              toggleItem={this.props.togglePrediction}
            />
          </StyledColumn>

          <Column width={9}>
            <Row>
              <Column width={4}>
                <Row>
                  <StyledColumn>
                    <List style={listStyle}>
                      {datafiles}
                    </List>
                  </StyledColumn>
                </Row>

                <Row>
                  <StyledColumn>
                    <List style={listStyle}>
                      {models}
                    </List>

                    <TextField
                      floatingLabelText="New model" value={this.state.newModelName}
                      disabled={this.props.datafile.length === 0} style={textFieldStyle}
                      onChange={(evt, newValue) => this.updateNewModelName(newValue)}
                    />
                    <RaisedButton
                      label="Create model" primary
                      onClick={this.createNewModel.bind(this)} disabled={this.props.datafile.length === 0}
                    />
                  </StyledColumn>
                </Row>
              </Column>

              <StyledColumn width={8} height="450px">
                {info}
              </StyledColumn>
            </Row>

            <Row>
              <StyledColumn>
                <Row>
                  <Column width={6}>
                    <Info>Connection status: {this.props.connectionStatus}</Info>
                  </Column>

                  <Column width={6}>
                    <Info>Metropolis status: {this.props.metropolisStatus}</Info>
                  </Column>
                </Row>
                <Row>
                  <Label>Epochs: {this.props.epochs}</Label>
                  <Slider
                    min={1} max={20} step={1} value={this.props.epochs}
                    disabled={!this.isPickerAvailable()}
                    style={outerSliderStyle} sliderStyle={sliderStyle}
                    onChange={(evt, newValue) => this.props.setEpochs(newValue)}
                  />
                </Row>

                <Row>
                  <Label>Offset: {this.props.offset}</Label>
                  <Slider
                    min={0} max={this.props.datasize} step={1} value={this.props.offset}
                    disabled={!this.isPickerAvailable()}
                    style={outerSliderStyle} sliderStyle={sliderStyle}
                    onChange={(evt, newValue) => this.props.setOffset(newValue)}
                  />
                </Row>

                <Row>
                  <Label>Limit: {this.props.limit}</Label>
                  <Slider
                    min={1} max={200} step={1} value={this.props.limit}
                    disabled={!this.isPickerAvailable()}
                    style={outerSliderStyle} sliderStyle={sliderStyle}
                    onChange={(evt, newValue) => this.props.setLimit(newValue)}
                  />
                </Row>
                <Row>
                  <RaisedButton
                    label="Train" primary
                    onClick={this.props.startTrain}
                    disabled={!this.isRunAvailable()}
                  />
                </Row>
              </StyledColumn>
            </Row>
          </Column>
        </Row>
        <Row>
          <Chart
            indicators={this.props.indicators} min={this.props.minValue}
            max={this.props.maxValue}
            predictions={this.props.predictions} labels={this.props.labels}
          />
        </Row>
      </Body>
    );
  }
}

Main.propTypes = {
  dispatch: PropTypes.func.isRequired,
  connectionStatus: PropTypes.string.isRequired,
  metropolisStatus: PropTypes.string.isRequired,
  indicators: PropTypes.object.isRequired,
  predictions: PropTypes.object.isRequired,
  labels: PropTypes.array.isRequired,
  toggleIndicator: PropTypes.func.isRequired,
  togglePrediction: PropTypes.func.isRequired,
  startTrain: PropTypes.func.isRequired,
  modelName: PropTypes.string.isRequired,
  epochs: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  datafiles: PropTypes.array.isRequired,
  datafile: PropTypes.string.isRequired,
  models: PropTypes.array.isRequired,
  datasize: PropTypes.number.isRequired,
  info: PropTypes.array.isRequired,
  minValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  setLimit: PropTypes.func.isRequired,
  setOffset: PropTypes.func.isRequired,
  setEpochs: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  Main: makeSelectMain(),
  indicators: selectIndicators(),
  predictions: selectPredictions(),
  labels: selectLabels(),
  connectionStatus: selectConnectionStatus(),
  metropolisStatus: selectMetropolisStatus(),
  modelName: selectModel(),
  sidebarOpen: selectSidebarOpen(),
  epochs: selectEpochs(),
  offset: selectOffset(),
  limit: selectLimit(),
  models: selectModels(),
  datafiles: selectDatafiles(),
  datafile: selectDatafile(),
  datasize: selectDatasize(),
  info: selectInfo(),
  maxValue: selectMax(),
  minValue: selectMin(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    toggleIndicator: (payload) => dispatch(toggleIndicator(payload)),
    togglePrediction: (payload) => dispatch(togglePrediction(payload)),
    startTrain: () => dispatch(startTrain()),
    setEpochs: (payload) => dispatch(setEpochs(payload)),
    setOffset: (payload) => dispatch(setOffset(payload)),
    setLimit: (payload) => dispatch(setLimit(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
