/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { combineReducers } from 'redux-immutable';
import { fromJS, Map } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import languageProviderReducer from 'containers/LanguageProvider/reducer';
import sidebarReducer from './containers/Sidebar/reducer';
import {
  SET_CONNECTION_STATUS,
  SET_INDICATORS,
  SET_PREDICTIONS,
  TOGGLE_PREDICTION,
  TOGGLE_INDICATOR,
} from './constants';

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@4
 *
 */

// Initial routing state
const routeInitialState = fromJS({
  locationBeforeTransitions: null,
});

const websocketInitialState = fromJS({
  connectionStatus: 'Disconnected',
  predictions: {},
  indicators: {},
});

/**
 * Merge route into the global application state
 */
function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return state.merge({
        locationBeforeTransitions: action.payload,
      });
    default:
      return state;
  }
}

function websocketReducer(state = websocketInitialState, action) {
  switch (action.type) {
    case SET_CONNECTION_STATUS:
      return state.set('connectionStatus', action.status);
    case SET_PREDICTIONS:
      return state.set('predictions', state.get('predictions').mergeDeep(action.predictions));
    case SET_INDICATORS:
      return state.set('indicators', state.get('indicators').mergeDeep(action.indicators));
    case TOGGLE_PREDICTION:
      return state.setIn(['predictions', action.options.keys[0], 'show'], action.options.data);
    case TOGGLE_INDICATOR:
      return state.setIn(['indicators', action.options.keys[0], 'show'], action.options.data);
    default:
      return state;
  }
}

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer(asyncReducers) {
  return combineReducers({
    route: routeReducer,
    language: languageProviderReducer,
    sidebar: sidebarReducer,
    websocket: websocketReducer,
    ...asyncReducers,
  });
}
