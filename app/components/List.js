import React, {PropTypes} from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import styled from 'styled-components';
import Toggle from 'material-ui/Toggle';

function MyList(props) {
  const items = Object.keys(props.items).map((key, index) =>
    <ListItem key={index} primaryText={key} onClick={() => props.togglePlot(key)} rightToggle={
      <Toggle toggled={props.items[key].plot} />
    } />
  );

  return (
    <List>
      <Subheader>{props.header}</Subheader>
      {items}
    </List>
  );
}

MyList.propTypes = {
  items: PropTypes.object.isRequired,
  header: PropTypes.string.isRequired,
  togglePlot: PropTypes.func.isRequired,
};

export default MyList;
