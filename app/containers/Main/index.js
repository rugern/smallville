import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import Immutable from 'immutable';

import { makeSelectMain, selectPlots } from './selectors';
import PlotList from '../../components/PlotList';
import { click } from './actions';

export class Main extends React.PureComponent {
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
        <PlotList plots={this.props.plots} />
        <button onClick={this.props.click}>Klikk</button>
      </div>
    );
  }
}

Main.propTypes = {
  //dispatch: PropTypes.func.isRequired,
  plots: PropTypes.oneOfType([
    PropTypes.instanceOf(Immutable.Iterable).isRequired,
    PropTypes.array.isRequired
  ]),
  click: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  Main: makeSelectMain(),
  plots: selectPlots(),
});

function mapDispatchToProps(dispatch) {
  return {
    click: () => dispatch(click()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
