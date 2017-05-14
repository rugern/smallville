import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import RaisedButton from 'material-ui/RaisedButton';
import { List } from 'material-ui/List';

import CustomListItem from '../../components/CustomListItem';
import Column from '../../components/Column';
import StyledColumn from '../../components/StyledColumn';
import Row from '../../components/Row';
import Info from '../../components/Info';
import {
  selectConnectionStatus,
  selectMetropolisStatus,
  selectModels,
  selectDatafiles,
  selectDatafile,
  selectModel,
  selectInfo,
} from '../App/selectors';
import {
  setModel,
  setDatafile,
} from '../App/actions';
import makeSelectTest, {
  selectStartMoney,
  selectEndMoney,
  selectStayMoney,
  selectBuys,
  selectSells,
} from './selectors';
import {
  startTest,
} from './actions';

const Body = styled.div`
width: 100%;
margin: 0 auto;
`;

const listStyle = {
  border: '1px solid white',
  margin: '0 0 20px 0',
};

const Message = styled.div`
font-size: 12px;
`;

function calculateProfit(dividend, divisor) {
  return divisor ? Math.round((dividend - divisor) * (1000 / divisor)) / 10 : 0;
}

export class Test extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  setModel(newValue) {
    if (!this.isPickerAvailable()) {
      return;
    }
    this.props.dispatch(setModel(newValue));
  }

  setDatafile(newValue) {
    if (!this.isPickerAvailable()) {
      return;
    }
    this.props.dispatch(setDatafile(newValue));
  }

  isRunAvailable = () => this.props.metropolisStatus !== 'Busy'
    && this.props.connectionStatus === 'connect'
    && this.props.modelName !== ''
    && this.props.datafile !== '';

  isPickerAvailable = () => this.props.metropolisStatus !== 'Busy'
    && this.props.connectionStatus === 'connect';

  render() {
    const info = this.props.info.slice().reverse().map((entry, index) =>
      <Message key={index}>{entry}</Message>
    );

    const models = this.props.models.map((model, index) =>
      <CustomListItem active={this.props.modelName === model} key={index}>
        <button onClick={this.setModel.bind(this, model)}>{model}</button>
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

    return (
      <Body>
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
              </StyledColumn>
            </Row>
          </Column>

          <Column width={4}>
            <Row>
              <StyledColumn>
                <Info>Connection status: {this.props.connectionStatus}</Info>
                <Info>Metropolis status: {this.props.metropolisStatus}</Info>
              </StyledColumn>
            </Row>

            <Row>
              <StyledColumn>
                <Row>
                  <Column width={6}>
                    <Info>Starting money</Info>
                    <Info>{this.props.startMoney}</Info>
                  </Column>
                </Row>

                <Row>
                  <Column width={6}>
                    <Info>Ending money</Info>
                    <Info>{this.props.endMoney}</Info>
                  </Column>

                  <Column width={6}>
                    <Info>Profit</Info>
                    <Info>{calculateProfit(this.props.endMoney, this.props.startMoney)}%</Info>
                  </Column>
                </Row>

                <Row>
                  <Column width={6}>
                    <Info>Stay money</Info>
                    <Info>{this.props.stayMoney}</Info>
                  </Column>

                  <Column width={6}>
                    <Info>Relative profit</Info>
                    <Info>{calculateProfit(this.props.endMoney, this.props.stayMoney)}%</Info>
                  </Column>
                </Row>

                <Row>
                  <Column width={6}>
                    <Info>Buys</Info>
                    <Info>{this.props.buys}</Info>
                  </Column>

                  <Column width={6}>
                    <Info>Sells</Info>
                    <Info>{this.props.sells}</Info>
                  </Column>
                </Row>
              </StyledColumn>
            </Row>

            <Row>
              <StyledColumn>
                <RaisedButton
                  label="Test" primary
                  onClick={this.props.startTest} disabled={!this.isRunAvailable()}
                />
              </StyledColumn>
            </Row>
          </Column>


          <StyledColumn width={6} height="450px">
            {info}
          </StyledColumn>
        </Row>
      </Body>
    );
  }
}

Test.propTypes = {
  dispatch: PropTypes.func.isRequired,
  connectionStatus: PropTypes.string.isRequired,
  metropolisStatus: PropTypes.string.isRequired,
  startMoney: PropTypes.number.isRequired,
  endMoney: PropTypes.number.isRequired,
  stayMoney: PropTypes.number.isRequired,
  datafiles: PropTypes.array.isRequired,
  models: PropTypes.array.isRequired,
  modelName: PropTypes.string.isRequired,
  datafile: PropTypes.string.isRequired,
  buys: PropTypes.number.isRequired,
  sells: PropTypes.number.isRequired,
  info: PropTypes.array.isRequired,
  startTest: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  Test: makeSelectTest(),
  connectionStatus: selectConnectionStatus(),
  metropolisStatus: selectMetropolisStatus(),
  startMoney: selectStartMoney(),
  endMoney: selectEndMoney(),
  stayMoney: selectStayMoney(),
  models: selectModels(),
  datafiles: selectDatafiles(),
  datafile: selectDatafile(),
  info: selectInfo(),
  modelName: selectModel(),
  buys: selectBuys(),
  sells: selectSells(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    startTest: () => dispatch(startTest()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Test);
