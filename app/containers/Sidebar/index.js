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

import makeSelectSidebar, {
  selectSidebarOpen,
} from './selectors';
import {
  toggleSidebar,
} from './actions';

function Sidebar(props) {
  return (
    <Drawer docked={false} open={props.sidebarOpen}
      onRequestChange={props.toggleSidebar} >
      <MenuItem primaryText="Close" onClick={props.toggleSidebar}
        rightIcon={<ContentClear />} />
      {props.children}
    </Drawer>
  );
}

Sidebar.propTypes = {
  children: PropTypes.node,
  sidebarOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  Sidebar: makeSelectSidebar(),
  sidebarOpen: selectSidebarOpen(),
});

function mapDispatchToProps(dispatch) {
  return {
    toggleSidebar: () => dispatch(toggleSidebar()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
