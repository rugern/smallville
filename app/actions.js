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

export function togglePrediction(options) {
  return {
    type: TOGGLE_PREDICTION,
    options: {
      keys: [options.key],
      data: options.data,
    },
    meta: {
      websocket: true,
    },
  };
}

export function toggleIndicator(options) {
  return {
    type: TOGGLE_INDICATOR,
    options: {
      keys: [options.key],
      data: options.data,
    },
    meta: {
      websocket: true,
    },
  };
}
