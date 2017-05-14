import { fromJS } from 'immutable';
import {
  SET_DATA,
  TOGGLE_PREDICTION,
  TOGGLE_INDICATOR,
  SET_EPOCHS,
  SET_OFFSET,
  SET_LIMIT,
} from './constants';

const initialState = fromJS({
  predictions: {},
  indicators: {},
  labels: [],
  epochs: 1,
  offset: 0,
  limit: 200,
  datasize: 1,
  maxValue: 1,
  minValue: 0,
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
    const nextResult = Object.assign({}, result);
    nextResult[key] = Object.assign({}, data[key], color());
    return nextResult;
  }, {});
}

function mainReducer(state = initialState, action) {
  let indicators;
  let indicatorKeys;
  let predictions;
  let predictionKeys;
  let newState;

  switch (action.type) {
    case SET_DATA:
      indicators = mapColor(action.payload.indicators);
      indicatorKeys = Object.keys(indicators);
      predictions = mapColor(action.payload.predictions);
      predictionKeys = Object.keys(predictions);

      newState = state
      .set('indicators', state.get('indicators')
        .mergeDeep(indicators)
        .filter((value, key) => indicatorKeys.indexOf(key) !== -1)
      ).set('predictions', state.get('predictions')
        .mergeDeep(predictions)
        .filter((value, key) => predictionKeys.indexOf(key) !== -1)
      ).set('datasize', Math.max(1, action.payload.datasize)); // Avoid slider error

      if (newState.get('offset') > newState.get('datasize')) {
        newState = newState.set('offset', newState.get('datasize'));
      }

      return newState
        .set('maxValue', action.payload.maxValue)
        .set('minValue', action.payload.minValue)
        .set('labels', fromJS(action.payload.labels));
    case TOGGLE_PREDICTION:
      return state.setIn(['predictions', action.payload.key, 'show'], action.payload.value);
    case TOGGLE_INDICATOR:
      return state.setIn(['indicators', action.payload.key, 'show'], action.payload.value);
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
