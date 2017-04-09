import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';

import {
  makeSelectMain,
  selectMainDomain,
} from './selectors';
import {
  selectIndicators,
  selectPredictions,
} from '../App/selectors';

export class Main extends React.PureComponent {
  render() {

    return (
      <div>
        <Helmet
          title="Main"
          meta={[
            { name: 'description', content: 'Description of Main' },
          ]}
        />
      </div>
    );
  }
}

Main.propTypes = {
  indicators: PropTypes.object.isRequired,
  predictions: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  Main: makeSelectMain(),
  indicators: selectIndicators(),
  predictions: selectPredictions(),
});

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
