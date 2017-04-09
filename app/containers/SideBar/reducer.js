import { fromJS } from 'immutable';

import {
  PLOT_PREDICTION,
  PLOT_INDICATOR,
} from './constants';

const initialState = fromJS({
  predictions: {},
  indicators: {},
});

function sidebarReducer(state = initialState, action) {
  switch (action.type) {
    case PLOT_PREDICTION:
      return state.set('predictions', action.prediction, 'plot', true);
    case PLOT_INDICATOR:
      return state.set('indicators', action.indicator, 'plot', true);
    default:
      return state;
  }
}

export default sidebarReducer;
