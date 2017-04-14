/**
*
* ControlPanel
*
*/

import React, {PropTypes} from 'react';
import styled from 'styled-components';
import Paper from 'material-ui/Paper';

function ControlPanel(props) {
  return (
    <Paper>
      {props.children}
    </Paper>
  );
}

ControlPanel.propTypes = {
  children: PropTypes.node,
};

export default ControlPanel;
