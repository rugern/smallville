import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import AppBar from 'material-ui/AppBar';

import {selectSidebarOpen} from './selectors';
import {toggleSidebar} from './actions';
import Sidebar from '../Sidebar';

export class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <AppBar title="Smallville" onLeftIconButtonTouchTap={this.props.toggleSidebar}/>
        <Sidebar />
        {React.Children.toArray(this.props.children)}
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node,
  sidebarOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  sidebarOpen: selectSidebarOpen(),
});

function mapDispatchToProps(dispatch) {
  return {
    toggleSidebar: () => dispatch(toggleSidebar()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
