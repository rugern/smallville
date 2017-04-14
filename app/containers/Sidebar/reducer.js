/*
 *
 * Sidebar reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  TOGGLE_SIDEBAR,
} from './constants';

const initialState = fromJS({
  sidebarOpen: true,
});

function sidebarReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      const value = action.value === undefined ? !state.get('sidebarOpen') : action.value;
      return state.set('sidebarOpen', value);
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default sidebarReducer;
