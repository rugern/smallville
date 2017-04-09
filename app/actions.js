import {
  SET_CONNECTION_STATUS,
  SET_INDICATORS,
  SET_PREDICTIONS,
  GET_INDICATORS,
  GET_PREDICTIONS,
  TOGGLE_PREDICTION,
  TOGGLE_INDICATOR,
} from './constants';

export function setConnectionStatus(status) {
  return {
    type: SET_CONNECTION_STATUS,
    status,
  };
}

export function setIndicators(indicators) {
  return {
    type: SET_INDICATORS,
    indicators,
  };
}

export function setPredictions(predictions) {
  return {
    type: SET_PREDICTIONS,
    predictions,
  };
}

export function getIndicators(options) {
  return {
    type: GET_INDICATORS,
    options,
    meta: {
      websocket: true,
    },
  };
}

export function getPredictions(options) {
  return {
    type: GET_PREDICTIONS,
    options,
    meta: {
      websocket: true,
    },
  };
}

export function togglePrediction(key, value) {
  return {
    type: TOGGLE_PREDICTION,
    key,
    value,
  };
}

export function toggleIndicator(key, value) {
  return {
    type: TOGGLE_INDICATOR,
    key,
    value,
  };
}
