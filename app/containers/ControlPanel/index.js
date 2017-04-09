import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import RaisedButton from 'material-ui/RaisedButton';

import makeSelectControlPanel from './selectors';
import {
  selectMetropolisStatus,
  selectConnectionStatus,
  selectInstanceName,
} from '../App/selectors';

export class ControlPanel extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <h4>Connection: {this.props.connectionStatus}</h4>
        <h4>Metropolis: {this.props.metropolisStatus}</h4>
        <h4>Instance: {this.props.instanceName}</h4>
      </div>
    );
  }
}

ControlPanel.propTypes = {
  metropolisStatus: PropTypes.string.isRequired,
  connectionStatus: PropTypes.string.isRequired,
  instanceName: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  ControlPanel: makeSelectControlPanel(),
  metropolisStatus: selectMetropolisStatus(),
  connectionStatus: selectConnectionStatus(),
  instanceName: selectInstanceName(),
});

function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);
