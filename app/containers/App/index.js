import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import AppBar from 'material-ui/AppBar';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import { toggleSidebar } from '../Sidebar/actions';
import Sidebar from '../Sidebar';

export class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <AppBar title="Smallville" onLeftIconButtonTouchTap={this.props.toggleSidebar} />
        <Sidebar>
          <Menu>
            <MenuItem onClick={this.props.gotoTraining}>Training</MenuItem>
            <MenuItem onClick={this.props.gotoTest}>Testing</MenuItem>
          </Menu>
        </Sidebar>
        {React.Children.toArray(this.props.children)}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
  toggleSidebar: PropTypes.func.isRequired,
  gotoTraining: PropTypes.func.isRequired,
  gotoTest: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
  return {
    gotoTraining: () => {
      dispatch(push('/'));
      dispatch(toggleSidebar());
    },
    gotoTest: () => {
      dispatch(push('/test'));
      dispatch(toggleSidebar());
    },
    toggleSidebar: () => dispatch(toggleSidebar()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
