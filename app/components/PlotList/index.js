/**
*
* PlotList
*
*/

import React, {PropTypes} from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';

const itemStyle = {
  fontSize: '12px',
  padding: '10px',
  marginLeft: '14px',
};

function PlotList(props) {
  const items = Object.keys(props.items).map((key, index) =>
    <ListItem primaryText={key} key={index} innerDivStyle={itemStyle} rightToggle={
      <Toggle onToggle={(evt, value) => props.toggleItem(key, value)}/>
    } />
  );

  return (
    <List>
      <Subheader>{props.header}</Subheader>
      {items}
    </List>
  );
}

PlotList.propTypes = {
  items: PropTypes.object.isRequired,
  header: PropTypes.string.isRequired,
  toggleItem: PropTypes.func.isRequired,
};

export default PlotList;
