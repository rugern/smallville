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
  SET_EPOCHS,
  SET_OFFSET,
  SET_LIMIT,
  DELETE_MODEL,
  SET_DATAFILE,
  SET_INFO,
  CLEAR_INFO,
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

export function setEpochs(payload) {
  return {
    type: SET_EPOCHS,
    payload,
  };
}

export function setOffset(payload) {
  return {
    type: SET_OFFSET,
    payload,
  };
}

export function setLimit(payload) {
  return {
    type: SET_LIMIT,
    payload,
  };
}

export function deleteModel(payload) {
  return {
    type: DELETE_MODEL,
    payload,
  };
}

export function setDatafile(payload) {
  return {
    type: SET_DATAFILE,
    payload,
  };
}

export function setInfo(payload) {
  return {
    type: SET_INFO,
    payload,
  };
}

export function clearInfo() {
  return {
    type: CLEAR_INFO,
  };
}
