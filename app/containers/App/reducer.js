import { fromJS } from 'immutable';

import {
  SET_MODELS,
  SET_MODEL,
  SET_CONNECTION_STATUS,
  SET_METROPOLIS_STATUS,
  SET_DATAFILE,
  SET_INFO,
  CLEAR_INFO,
  SET_DATAFILES,
  ADD_MODEL,
  DELETE_MODEL,
} from './constants';

const initialState = fromJS({
  connectionStatus: 'disconnect',
  metropolisStatus: 'Idle',
  models: [],
  model: '',
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
    case SET_MODEL:
      return state.set('model', action.payload);
    case ADD_MODEL:
      return state.get('models').indexOf(action.payload) === -1 ?
        state.update('models', (models) => models.push(action.payload))
        : state;
    case DELETE_MODEL:
      return state.update('models', (models) => models.delete(action.payload.index));
    case SET_INFO:
      return state.updateIn(['info'], (info) => info.push(action.payload));
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
