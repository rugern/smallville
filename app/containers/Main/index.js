/*
 *
 * Main
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';

import makeSelectMain from './selectors';
import PlotList from '../../components/PlotList';
import { click } from './actions';

export class Main extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      plots: ['Hei'],
    };
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <div>
        <Helmet
          title="Main"
          meta={[
            { name: 'description', content: 'Description of Main' },
          ]}
        />
        <PlotList plots={this.state.plots} />
        <button onClick={this.props.click}>Klikk</button>
      </div>
    );
  }
}

Main.propTypes = {
  //dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  Main: makeSelectMain(),
});

function mapDispatchToProps(dispatch) {
  return {
    click: () => click(),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
