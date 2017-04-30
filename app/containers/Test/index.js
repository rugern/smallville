import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import makeSelectTest from './selectors';
import Paper from 'material-ui/Paper';
import styled from 'styled-components';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';

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
  selectModelName,
} from '../App/selectors';
import {
  setModelName,
  setDatafile,
} from '../App/actions';
import {
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

function calculateProfit(dividend, divisor) {
  return divisor ? Math.round((dividend - divisor) * 1000 / divisor) / 10 : 0;
}

export class Test extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  isRunning = () => this.props.metropolisStatus !== 'Idle' || this.props.connectionStatus !== 'connect';

  render() {
    const models = this.props.models.map((model, index) => 
      <CustomListItem active={this.props.modelName === model} key={index}
        deactivated={this.isRunning()}
        onClick={() => !this.isRunning() && this.props.setModelName(model)}>
        <span>{model}</span>
      </CustomListItem>
    );

    const datafiles = this.props.datafiles.map((datafile, index) =>
      <CustomListItem active={this.props.datafile === datafile} key={index}
        deactivated={this.isRunning()}
        onClick={() => !this.isRunning() && this.props.setDatafile(datafile)}>
        <span>{datafile}</span>
      </CustomListItem>
    );

    return (
      <Body>
        <Row>
          <Column width={2}>
            <Row>
              <StyledColumn>
                <Info>Connection status: {this.props.connectionStatus}</Info>
              </StyledColumn>
            </Row>

            <Row>
              <StyledColumn>
                <Info>Metropolis status: {this.props.metropolisStatus}</Info>
              </StyledColumn>
            </Row>
          </Column>

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

          <StyledColumn width={6}>
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

            <Row>
              <Column width={6}>
                <RaisedButton label="Test" primary={true}
                  onClick={this.props.startTest} disabled={this.isRunning()}/>
              </Column>
            </Row>
          </StyledColumn>
        </Row>
      </Body>
    );
  }
}

Test.propTypes = {
  connectionStatus: PropTypes.string.isRequired,
  metropolisStatus: PropTypes.string.isRequired,
  startMoney: PropTypes.number.isRequired,
  endMoney: PropTypes.number.isRequired,
  stayMoney: PropTypes.number.isRequired,
  datafiles: PropTypes.array.isRequired,
  models: PropTypes.array.isRequired,
  modelName: PropTypes.string.isRequired,
  setDatafile: PropTypes.func.isRequired,
  datafile: PropTypes.string.isRequired,
  setModelName: PropTypes.func.isRequired,
  buys: PropTypes.number.isRequired,
  sells: PropTypes.number.isRequired,
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
  modelName: selectModelName(),
  buys: selectBuys(),
  sells: selectSells(),
});

function mapDispatchToProps(dispatch) {
  return {
    startTest: () => dispatch(startTest()),
    setModelName: (payload) => dispatch(setModelName(payload)),
    setDatafile: (payload) => dispatch(setDatafile(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Test);
