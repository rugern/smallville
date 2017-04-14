/*
 *
 * Main actions
 *
 */

import {
  DEFAULT_ACTION,
  SET_CONNECTION_STATUS,
  GET_DATA,
  SET_DATA,
  TOGGLE_INDICATOR,
  TOGGLE_PREDICTION,
  GET_METROPOLIS_STATUS,
  SET_METROPOLIS_STATUS,
  START_TRAIN,
  SET_MODEL_NAME,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setConnectionStatus(payload) {
  return {
    type: SET_CONNECTION_STATUS,
    payload,
  };
}

export function setData(payload) {
  return {
    type: SET_DATA,
    payload,
  };
}

export function getData() {
  return {
    type: GET_DATA,
  };
}

export function toggleIndicator(payload) {
  return {
    type: TOGGLE_INDICATOR,
    payload,
  };
}

export function togglePrediction(payload) {
  return {
    type: TOGGLE_PREDICTION,
    payload,
  };
}

export function getMetropolisStatus() {
  return {
    type: GET_METROPOLIS_STATUS,
  };
}

export function setMetropolisStatus(payload) {
  return {
    type: SET_METROPOLIS_STATUS,
    payload,
  };
}

export function startTrain() {
  return {
    type: START_TRAIN,
  };
}

export function setModelName(payload) {
  return {
    type: SET_MODEL_NAME,
    payload,
  };
}
