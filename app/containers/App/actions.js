import {
  GET_MODELS,
  SET_CONNECTION_STATUS,
  GET_METROPOLIS_STATUS,
  SET_METROPOLIS_STATUS,
  SET_DATAFILE,
  SET_DATAFILES,
  SET_INFO,
  CLEAR_INFO,
  SET_MODEL,
  ADD_MODEL,
  SET_MODELS,
  GET_DATAFILES,
  DELETE_MODEL,
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

export function addModel(payload) {
  return {
    type: ADD_MODEL,
    payload,
  };
}

export function setModel(payload) {
  return {
    type: SET_MODEL,
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

export function getDatafiles() {
  return {
    type: GET_DATAFILES,
  };
}

export function deleteModel(payload) {
  return {
    type: DELETE_MODEL,
    payload,
  };
}
