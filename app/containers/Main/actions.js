/*
 *
 * Main actions
 *
 */

import {
  GET_DATA,
  SET_DATA,
  TOGGLE_INDICATOR,
  TOGGLE_PREDICTION,
  START_TRAIN,
  SET_EPOCHS,
  SET_OFFSET,
  SET_LIMIT,
  DELETE_MODEL,
} from './constants';

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

export function startTrain() {
  return {
    type: START_TRAIN,
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

