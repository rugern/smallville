import { fromJS } from 'immutable';

import {
  SET_MODELS,
  SET_MODEL_NAME,
  SET_CONNECTION_STATUS,
  SET_METROPOLIS_STATUS,
  SET_DATAFILE,
  SET_INFO,
  CLEAR_INFO,
  SET_DATAFILES,
} from './constants';

const initialState = fromJS({
  connectionStatus: 'disconnect',
  metropolisStatus: 'Idle',
  models: [],
  modelName: 'Test',
  info: [],
  datafiles: [],
  datafile: '',
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CONNECTION_STATUS:
      return state.set('connectionStatus', action.payload);
    case SET_METROPOLIS_STATUS:
      return state.set('metropolisStatus', action.payload);
    case SET_MODEL_NAME:
      return state.set('modelName', action.payload);
    case SET_INFO:
      return state.updateIn(['info'], info => info.push(action.payload));
    case CLEAR_INFO:
      return state.set('info', fromJS([]));
    case SET_MODELS:
      return state.set('models', fromJS(action.payload));
    case SET_DATAFILES:
      return state.set('datafiles', fromJS(action.payload));
    case SET_DATAFILE:
      return state.set('datafile', action.payload);
    default:
      return state;
  }
}

export default appReducer;
