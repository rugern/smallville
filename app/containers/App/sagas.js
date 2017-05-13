import { take, call, put, takeLatest } from 'redux-saga/effects';
import { buffers } from 'redux-saga';

import { createChannel } from '../../utils/sagaUtils';
import {
  setConnectionStatus,
  setInfo,
  setDatafiles,
  setModels,
} from './actions';
import {
  ADD_METROPOLIS_INFO,
  GET_DATAFILES,
  SET_DATAFILE,
} from './constants';
import api from '../../utils/api';

function* takeConnectChannel(socket) {
  const eventName = 'connect';
  if (socket.connected) {
    yield put(setConnectionStatus(eventName));
  }
  const connectionChannel = yield call(createChannel, socket, eventName);
  while (true) {
    const payload = yield take(connectionChannel, buffers.sliding(5));
    yield put(setConnectionStatus(payload));
  }
}

function* takeDisconnectChannel(socket) {
  const connectionChannel = yield call(createChannel, socket, 'disconnect');
  while (true) {
    const payload = yield take(connectionChannel, buffers.sliding(5));
    yield put(setConnectionStatus(payload));
  }
}

function* takeInfoChannel(socket) {
  const infoChannel = yield call(createChannel, socket, ADD_METROPOLIS_INFO);
  while (true) {
    const payload = yield take(infoChannel, buffers.sliding(10));
    yield put(setInfo(payload));
  }
}

export function* receiveWebsocketData(socket) {
  yield [
    call(takeConnectChannel, socket),
    call(takeDisconnectChannel, socket),
    call(takeInfoChannel, socket),
  ];
}

function* getDatafiles() {
  const response = yield call(api.getDatafiles);
  yield put(setDatafiles(response));
}

export function* takeGetDatafiles() {
  yield takeLatest(GET_DATAFILES, getDatafiles);
}

function* getModels(action) {
  const response = yield call(api.getModels, action.payload);
  yield put(setModels(response));
}

export function* takeSetDatafile() {
  yield takeLatest(SET_DATAFILE, getModels);
}

export default [
  receiveWebsocketData,
  takeGetDatafiles,
  takeSetDatafile,
];
