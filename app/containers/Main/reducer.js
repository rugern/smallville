/*
 *
 * Main reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SET_CONNECTION_STATUS,
  SET_DATA,
  TOGGLE_PREDICTION,
  TOGGLE_INDICATOR,
  SET_METROPOLIS_STATUS,
  SET_MODEL_NAME,
  SET_EPOCHS,
  SET_OFFSET,
  SET_LIMIT,
} from './constants';

const initialState = fromJS({
  connectionStatus: 'disconnect',
  metropolisStatus: 'Idle',
  predictions: {},
  indicators: {},
  labels: [],
  modelName: 'Test',
  epochs: 1,
  offset: 0,
  limit: 200,
});

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function color() {
  return {
    r: randomInt(50, 255),
    g: randomInt(50, 255),
    b: randomInt(50, 255),
  };
}

function mapColor(data) {
  return Object.keys(data).reduce((result, key) => {
    result[key] = Object.assign({}, data[key], color());;
    return result;
  }, {});
}

function mainReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CONNECTION_STATUS:
      return state.set('connectionStatus', action.payload);
    case SET_METROPOLIS_STATUS:
      return state.set('metropolisStatus', action.payload);
    case SET_DATA:
      const indicators = mapColor(action.payload.indicators);
      const predictions = mapColor(action.payload.predictions);
      state = state.set('indicators', state.get('indicators').mergeDeep(indicators));
      state = state.set('predictions', state.get('predictions').mergeDeep(predictions));
      return state.set('labels', fromJS(action.payload.labels));
    case TOGGLE_PREDICTION:
      return state.setIn(['predictions', action.payload.key, 'show'], action.payload.value);
    case TOGGLE_INDICATOR:
      return state.setIn(['indicators', action.payload.key, 'show'], action.payload.value);
    case SET_MODEL_NAME:
      return state.set('modelName', action.payload);
    case SET_EPOCHS:
      return state.set('epochs', action.payload);
    case SET_OFFSET:
      return state.set('offset', action.payload);
    case SET_LIMIT:
      return state.set('limit', action.payload);
    default:
      return state;
  }
}

export default mainReducer;
