import React from 'react';
// import styled from 'styled-components';


function PlotList(props) {
  const plots = props.plots.map((plot, index) =>
    <li key={index}>{plot}</li>
  );

  return (
    <ul>
      {plots}
    </ul>
  );
}

PlotList.propTypes = {
};

export default PlotList;
