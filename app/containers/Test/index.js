import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import makeSelectTest from './selectors';
import Paper from 'material-ui/Paper';
import styled from 'styled-components';
import RaisedButton from 'material-ui/RaisedButton';

import Column from '../../components/Column';
import StyledColumn from '../../components/StyledColumn';
import Row from '../../components/Row';
import Info from '../../components/Info';
import {
  selectConnectionStatus,
  selectMetropolisStatus,
} from '../App/selectors';
import {
  selectStartMoney,
  selectEndMoney,
  selectStayMoney,
} from './selectors';
import {
  startTest,
} from './actions';

const Body = styled.div`
width: 100%;
margin: 0 auto;
`;

function calculateProfit(dividend, divisor) {
  return divisor ? Math.round((dividend - divisor) * 1000 / divisor) / 10 : 0;
}

export class Test extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  isRunning = () => this.props.metropolisStatus !== 'Idle' || this.props.connectionStatus !== 'connect';

  render() {
    return (
      <Body>
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
          </StyledColumn>
        </Row>

        <Row>
          <StyledColumn>
            <Row>
              <Column width={2}>
                <Info>Starting money</Info>
                <Info>{this.props.startMoney}</Info>
              </Column>
              <Column width={2}>
                <Info>Ending money</Info>
                <Info>{this.props.endMoney}</Info>
              </Column>
              <Column width={2}>
                <Info>Stay money</Info>
                <Info>{this.props.stayMoney}</Info>
              </Column>
              <Column width={2}>
                <Info>Profit</Info>
                <Info>{calculateProfit(this.props.endMoney, this.props.startMoney)}%</Info>
              </Column>
              <Column width={2}>
                <Info>Relative profit</Info>
                <Info>{calculateProfit(this.props.endMoney, this.props.stayMoney)}%</Info>
              </Column>
              <Column width={2}>
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
};

const mapStateToProps = createStructuredSelector({
  Test: makeSelectTest(),
  connectionStatus: selectConnectionStatus(),
  metropolisStatus: selectMetropolisStatus(),
  startMoney: selectStartMoney(),
  endMoney: selectEndMoney(),
  stayMoney: selectStayMoney(),
});

function mapDispatchToProps(dispatch) {
  return {
    startTest: () => dispatch(startTest()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Test);
