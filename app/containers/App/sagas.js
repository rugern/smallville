import { take, takeEvery, call, put, select, takeLatest, apply, throttle } from 'redux-saga/effects';
import { eventChannel, buffers } from 'redux-saga'

import { createChannel } from '../../utils/sagaUtils';
import {
  setConnectionStatus,
  setMetropolisStatus,
  getMetropolisStatus,
  setInfo,
  clearInfo,
  setDatafile,
  setDatafiles,
  setModels,
} from './actions';
import {
  SET_METROPOLIS_STATUS,
  GET_METROPOLIS_STATUS,
  SET_MODEL_NAME,
  ADD_METROPOLIS_INFO,
  GET_DATAFILE,
  GET_DATAFILES,
  SET_DATAFILE,
  SET_DATAFILES,
  SET_MODELS,
  GET_MODELS,
} from './constants';
import {
  selectModelName,
} from './selectors';

function* performConnectionRoutine(socket, payload) {
  yield put(setConnectionStatus(payload));
  yield put(getMetropolisStatus());
  const modelName = yield(select(selectModelName()));
  yield apply(socket, socket.emit, [SET_MODEL_NAME, modelName]);
  yield apply(socket, socket.emit, [GET_DATAFILE]);
  yield apply(socket, socket.emit, [GET_DATAFILES]);
  yield apply(socket, socket.emit, [GET_MODELS]);
}

export function* takeConnectChannel(socket) {
  const eventName = 'connect';
  if (socket.connected) {
    yield call(performConnectionRoutine, socket, eventName);
  }
  const connectionChannel = yield call(createChannel, socket, eventName);
  while (true) {
    const payload = yield take(connectionChannel, buffers.sliding(5));
    yield call(performConnectionRoutine, socket, payload);
  }
}

export function* takeDisconnectChannel(socket) {
  const connectionChannel = yield call(createChannel, socket, 'disconnect');
  while (true) {
    const payload = yield take(connectionChannel, buffers.sliding(5));
    yield put(setConnectionStatus(payload));
  }
}

export function* takeStatusChannel(socket, action) {
  const statusChannel = yield call(createChannel, socket, SET_METROPOLIS_STATUS);
  while (true) {
    const payload = yield take(statusChannel, buffers.sliding(5));
    yield put(setMetropolisStatus(payload));
  }
}

export function* takeStatus(socket) {
  while (true) {
    const action = yield take(GET_METROPOLIS_STATUS);
    yield apply(socket, socket.emit, [action.type]);
  }
}

export function* emitModelName(socket) {
  while (true) {
    const action = yield take(SET_MODEL_NAME);
    yield apply(socket, socket.emit, [action.type, action.payload]);
  }
}

export function* emitSetDatafile(socket) {
  while (true) {
    const action = yield take(SET_DATAFILE);
    yield apply(socket, socket.emit, [action.type, action.payload]);
    yield apply(socket, socket.emit, [GET_MODELS]);
    yield put(clearInfo());
  }
}

export function* takeInfoChannel(socket) {
  const infoChannel = yield call(createChannel, socket, ADD_METROPOLIS_INFO);
  while (true) {
    const payload = yield take(infoChannel, buffers.sliding(10));
    yield put(setInfo(payload));
  }
}

export function* takeDatafileChannel(socket) {
  const datafileChannel = yield call(createChannel, socket, SET_DATAFILE);
  while (true) {
    const payload = yield take(datafileChannel, buffers.sliding(5));
    yield put(setDatafile(payload));
  }
}

export function* takeDatafilesChannel(socket) {
  const datafilesChannel = yield call(createChannel, socket, SET_DATAFILES);
  while (true) {
    const payload = yield take(datafilesChannel, buffers.sliding(5));
    yield put(setDatafiles(payload));
  }
}

export function* takeModelsChannel(socket) {
  const modelsChannel = yield call(createChannel, socket, SET_MODELS);
  while (true) {
    const payload = yield take(modelsChannel, buffers.sliding(5));
    yield put(setModels(payload));
  }
}

export function* receiveWebsocketData(socket) {
  yield [
    call(takeConnectChannel, socket),
    call(takeDisconnectChannel, socket),
    call(takeStatus, socket),
    call(takeStatusChannel, socket),
    call(emitModelName, socket),
    call(emitSetDatafile, socket),
    call(takeInfoChannel, socket),
    call(takeDatafileChannel, socket),
    call(takeDatafilesChannel, socket),
    call(takeModelsChannel, socket),
  ];
}

export default [
  receiveWebsocketData,
];
