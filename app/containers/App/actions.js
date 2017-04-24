import {
  GET_MODELS,
  SET_CONNECTION_STATUS,
  GET_METROPOLIS_STATUS,
  SET_METROPOLIS_STATUS,
  SET_DATAFILE,
  SET_DATAFILES,
  SET_INFO,
  CLEAR_INFO,
  SET_MODEL_NAME,
  SET_MODELS,
} from './constants';

export function getModels() {
  return {
    type: GET_MODELS,
  };
}

export function setDatafile(payload) {
  return {
    type: SET_DATAFILE,
    payload,
  };
}

export function setDatafiles(payload) {
  return {
    type: SET_DATAFILES,
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

export function setModelName(payload) {
  return {
    type: SET_MODEL_NAME,
    payload,
  };
}

export function setModels(payload) {
  return {
    type: SET_MODELS,
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

export function setConnectionStatus(payload) {
  return {
    type: SET_CONNECTION_STATUS,
    payload,
  };
}
