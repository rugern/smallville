import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import AppBar from 'material-ui/AppBar';

import {toggleSidebar} from '../Sidebar/actions';

export class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <AppBar title="Smallville" onLeftIconButtonTouchTap={this.props.toggleSidebar} />
        {React.Children.toArray(this.props.children)}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
  toggleSidebar: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
  return {
    toggleSidebar: () => dispatch(toggleSidebar()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
