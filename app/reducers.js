/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import languageProviderReducer from 'containers/LanguageProvider/reducer';
import controlPanelReducer from './containers/ControlPanel/reducer';
import sidebarReducer from './containers/Sidebar/reducer';
import appReducer from './containers/App/reducer';
import {
  SET_PREDICTIONS,
  SET_INDICATORS,
  SET_METROPOLIS_STATUS,
  SET_INSTANCE_NAME,
  SET_MODELS,
  SET_CONNECTION_STATUS,
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
  predictions: {},
  indicators: {},
  metropolisStatus: 'Idle',
  connectionStatus: 'Disconnected',
  instanceName: 'Unknown',
  models: {},
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
    case SET_PREDICTIONS:
      return state.set('predictions', state.get('predictions').mergeDeep(action.predictions));
    case SET_INDICATORS:
      return state.set('indicators', state.get('indicators').mergeDeep(action.indicators));
    case SET_METROPOLIS_STATUS:
      return state.set('metropolisStatus', action.status);
    case SET_INSTANCE_NAME:
      return state.set('instanceName', action.name);
    case SET_MODELS:
      return state.set('models', fromJS(action.models));
    case SET_CONNECTION_STATUS:
      return state.set('connectionStatus', action.status);
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
    websocket: websocketReducer,
    controlPanel: controlPanelReducer,
    sidebar: sidebarReducer,
    app: appReducer,
    ...asyncReducers,
  });
}
