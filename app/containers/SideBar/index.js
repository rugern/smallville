import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import ContentClear from 'material-ui/svg-icons/content/clear';

import MyList from '../../Components/List';
import ControlPanel from '../ControlPanel';
import makeSelectSidebar from './selectors';
import {
  plotIndicator,
  plotPrediction,
} from './sagas';
import {
  selectIndicators,
  selectPredictions,
  selectSidebarOpen,
} from '../App/selectors';
import {
  toggleSidebar,
} from '../App/actions';

export class Sidebar extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const indicatorNames = Object.keys(this.props.indicators);
    const predictionNames = Object.keys(this.props.predictions);

    return (
      <Drawer open={this.props.sidebarOpen}>
        <MenuItem primaryText="Close" rightIcon={<ContentClear />} onTouchTap={this.props.toggleSidebar}/>
        <ControlPanel />
        <MyList header="Indicators" items={this.props.indicators} togglePlot={this.props.plotIndicator} />
        <MyList header="Predictions" items={this.props.predictions} togglePlot={this.props.plotPrediction} />
      </Drawer>
    );
  }
}

Sidebar.propTypes = {
  indicators: PropTypes.object.isRequired,
  predictions: PropTypes.object.isRequired,
  plotPrediction: PropTypes.func.isRequired,
  plotIndicator: PropTypes.func.isRequired,
  sidebarOpen: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  Sidebar: makeSelectSidebar(),
  sidebarOpen: selectSidebarOpen(),
  indicators: selectIndicators(),
  predictions: selectPredictions(),
});

function mapDispatchToProps(dispatch) {
  return {
    plotPrediction: (prediction) => dispatch(plotPrediction(prediction)),
    plotIndicator: (indicator) => dispatch(plotIndicator(indicator)),
    toggleSidebar: () => dispatch(toggleSidebar()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
