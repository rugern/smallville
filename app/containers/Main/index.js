import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';
import {List, ListItem} from 'material-ui/List';
import Delete from 'material-ui/svg-icons/action/delete';

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
  selectModels,
  selectDatafiles,
  selectDatafile,
} from './selectors';
import {
  toggleIndicator,
  togglePrediction,
  startTrain,
  setModelName,
  setEpochs,
  setOffset,
  setLimit,
  deleteModel,
  setDatafile,
} from './actions';
import {
  selectSidebarOpen,
} from '../Sidebar/selectors';

const Info = styled.h5`
text-align: ${props => props.center ? 'center' : 'left'};
`;

const Body = styled.div`
max-width: 80%;
padding: 20px;
margin: ${props => props.sidebarOpen ? '0 auto 0 256px' : '0 auto'};
`;

const Row = styled.div`
display: flex;
flex-direction: row;
width: 100%;
margin: 0;
padding: 10px;
`;

const Column = styled.div`
display: flex;
flex-direction: column;
padding: 20px;
width: calc(100% * ${props => props.width / 12});
`;

const Label = styled.h5`
width: 100px;
margin: 0;
`;

const CustomListItem = styled.div`
background-color: ${props => props.active ? 'rgba(0, 151, 167, 0.2)' : 'none'};
display: flex;
justify-content: space-between;
padding: 5px 10px;
font-size: 14px;
cursor: pointer;

&:hover {
  background-color: ${props => props.active ? 'rgba(0, 151, 167, 0.4)' : 'rgba(255, 255, 255, 0.1)'};
}
`;

const outerSliderStyle = {
  width: 'calc(100% - 100px)',
};

const sliderStyle = {
  margin: 0,
};

const itemStyle = {
  fontSize: '12px',
  padding: '10px',
  marginLeft: '14px',
};

const listStyle = {
  border: '1px solid white',
};

export class Main extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    const models = this.props.models.map((model, index) => 
      <CustomListItem active={this.props.modelName === model} key={index}
        onClick={() => this.props.setModelName(model)}>
        <span>{model}</span>
        <Delete onTouchTap={(evt) => this.props.deleteModel(evt, model)}/>
      </CustomListItem>
    );

    const datafiles = this.props.datafiles.map((datafile, index) =>
      <CustomListItem active={this.props.datafile === datafile} key={index}
        onClick={() => this.props.setDatafile(datafile)}>
        <span>{datafile}</span>
      </CustomListItem>
    );

    return (
      <div>
        <Sidebar connectionStatus={this.props.connectionStatus}
          indicators={this.props.indicators}>
          <Info center>Connection status: {this.props.connectionStatus}</Info>
          <Divider />
          <PlotList header="Indicators" items={this.props.indicators}
            toggleItem={this.props.toggleIndicator}/>
          <Divider />
          <PlotList header="Predictions" items={this.props.predictions}
            toggleItem={this.props.togglePrediction}/>
        </Sidebar>

        <Body sidebarOpen={this.props.sidebarOpen}>
          <ControlPanel>
            <Row>
              <Column width={3}>
                <List style={listStyle}>
                  {datafiles}
                </List>
              </Column>

              <Column width={3}>
                <List style={listStyle}>
                  {models}
                </List>
                <TextField floatingLabelText="New model" value={this.props.modelName}
                  onChange={(evt, newValue) => this.props.setModelName(newValue)}/>
              </Column>

              <Column width={6}>
                <Row>
                  <Info>Metropolis status: {this.props.metropolisStatus}</Info>
                </Row>
                <Row>
                  <Label>Epochs: {this.props.epochs}</Label>
                  <Slider min={1} max={20} step={1} value={this.props.epochs}
                    style={outerSliderStyle} sliderStyle={sliderStyle}
                    onChange={(evt, newValue) => this.props.setEpochs(newValue)} />
                </Row>

                <Row>
                  <Label>Offset: {this.props.offset}</Label>
                  <Slider min={0} max={200} step={1} value={this.props.offset}
                    style={outerSliderStyle} sliderStyle={sliderStyle}
                    onChange={(evt, newValue) => this.props.setOffset(newValue)} />
                </Row>

                <Row>
                  <Label>Limit: {this.props.limit}</Label>
                  <Slider min={1} max={200} step={1} value={this.props.limit}
                    style={outerSliderStyle} sliderStyle={sliderStyle}
                    onChange={(evt, newValue) => this.props.setLimit(newValue)} />
                </Row>
                <Row>
                  <RaisedButton label="Train" primary={true} 
                    onClick={this.props.startTrain}
                    disabled={this.props.metropolisStatus === 'Running'}/>
                </Row>
              </Column>
            </Row>
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
  models: PropTypes.array.isRequired,
  deleteModel: PropTypes.func.isRequired,
  datafiles: PropTypes.array.isRequired,
  setDatafile: PropTypes.func.isRequired,
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
  models: selectModels(),
  datafiles: selectDatafiles(),
  datafile: selectDatafile(),
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
    deleteModel: (evt, payload) => {
      evt.stopPropagation();
      dispatch(deleteModel(payload));
    },
    setDatafile: (payload) => dispatch(setDatafile(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
