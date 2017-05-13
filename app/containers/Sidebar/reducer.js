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
  sidebarOpen: false,
});

function sidebarReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return state.set('sidebarOpen', action.value === undefined ?
        !state.get('sidebarOpen') : action.value);
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default sidebarReducer;
