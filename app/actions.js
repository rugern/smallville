import {
  SET_PREDICTIONS,
  SET_INDICATORS,
  SET_METROPOLIS_STATUS,
  SET_INSTANCE_NAME,
  SET_MODELS, 
  SET_CONNECTION_STATUS,
} from './constants';

export function receivePredictions(predictions) {
  return {
    type: SET_PREDICTIONS,
    predictions,
  };
}

export function receiveIndicators(indicators) {
  return {
    type: SET_INDICATORS,
    indicators,
  };
}

export function receiveMetropolisStatus(status) {
  return {
    type: SET_METROPOLIS_STATUS,
    status,
  };
}

export function receiveInstanceName(name) {
  return {
    type: SET_INSTANCE_NAME,
    name,
  };
}

export function receiveModels(models) {
  return {
    type: SET_MODELS,
    models,
  };
}

export function setConnectionStatus(status) {
  return {
    type: SET_CONNECTION_STATUS,
    status,
  };
}
