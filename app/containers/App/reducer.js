import { fromJS } from 'immutable';

import {
  TOGGLE_SIDEBAR,
} from './constants';

const initialState = fromJS({
  sidebarOpen: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return state.set('sidebarOpen', !state.get('sidebarOpen'));
    default:
      return state;
  }
}

export default appReducer;
