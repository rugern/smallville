/*
 *
 * Sidebar
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import ContentClear from 'material-ui/svg-icons/content/clear';
import styled from 'styled-components';
import Divider from 'material-ui/Divider';

import PlotList from '../../components/PlotList';
import makeSelectSidebar, {
  selectSidebarOpen,
} from './selectors';
import {
  toggleSidebar,
} from './actions';
import {
  togglePrediction,
  toggleIndicator,
} from '../../actions';
import {
  selectIndicators,
  selectPredictions,
  selectConnectionStatus,
} from '../../selectors';

const Info = styled.h5`
text-align: center;
margin: 30px auto;
`;

export class Sidebar extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Drawer open={this.props.sidebarOpen}>
        <MenuItem primaryText="Close" onClick={this.props.toggleSidebar} rightIcon={<ContentClear />} />
        <Divider />
        <Info>Connection status: {this.props.connectionStatus}</Info>
        <Divider />
        <PlotList header="Indicators" items={this.props.indicators} toggleItem={this.props.toggleIndicator}/>
        <Divider />
        <PlotList header="Predictions" items={this.props.predictions} toggleItem={this.props.togglePrediction}/>
      </Drawer>
    );
  }
}

Sidebar.propTypes = {
  sidebarOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  predictions: PropTypes.object.isRequired,
  indicators: PropTypes.object.isRequired,
  connectionStatus: PropTypes.string.isRequired,
  togglePrediction: PropTypes.func.isRequired,
  toggleIndicator: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  Sidebar: makeSelectSidebar(),
  sidebarOpen: selectSidebarOpen(),
  predictions: selectPredictions(),
  indicators: selectIndicators(),
  connectionStatus: selectConnectionStatus(),
});

function mapDispatchToProps(dispatch) {
  return {
    toggleSidebar: () => dispatch(toggleSidebar()),
    toggleIndicator: (options) => dispatch(toggleIndicator(options)),
    togglePrediction: (options) => dispatch(togglePrediction(options)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
