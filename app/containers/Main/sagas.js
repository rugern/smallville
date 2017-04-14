import { take, takeEvery, call, put, select, cancel, takeLatest, apply } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga'
import io from 'socket.io-client';

import {
  setConnectionStatus,
  setMetropolisStatus,
  setData,
  getData,
  getMetropolisStatus,
} from './actions';
import {
  SET_DATA,
  GET_DATA,
  SET_METROPOLIS_STATUS,
  GET_METROPOLIS_STATUS,
  START_TRAIN,
  SET_MODEL_NAME,
} from './constants';


function createChannel(socket, eventName) {
  return eventChannel((emit) => {
    const handler = (data) => {
      const payload = data ? data : eventName;
      emit(payload);
    };

    const unsubscribe = () => {
      socket.off(eventName);
    };

    socket.on(eventName, handler);
    return unsubscribe;
  });
}

export function* takeConnectChannel(socket) {
  const connectionChannel = yield call(createChannel, socket, 'connect');
  while (true) {
    const payload = yield take(connectionChannel);
    yield put(setConnectionStatus(payload));
    yield put(getMetropolisStatus());
    yield put(getData());
  }
}

export function* takeDisconnectChannel(socket) {
  const connectionChannel = yield call(createChannel, socket, 'disconnect');
  while (true) {
    const payload = yield take(connectionChannel);
    yield put(setConnectionStatus(payload));
  }
}

function* takeDataChannel(socket, action) {
  const dataChannel = yield call(createChannel, socket, SET_DATA);
  yield apply(socket, socket.emit, [action.type, {}]);
  while (true) {
    const payload = yield take(dataChannel);
    yield put(setData(payload));
  }
}

export function* takeData(socket) {
  yield takeEvery(GET_DATA, takeDataChannel, socket);
}

function* takeStatusChannel(socket, action) {
  const statusChannel = yield call(createChannel, socket, SET_METROPOLIS_STATUS);
  yield apply(socket, socket.emit, [action.type]);
  while (true) {
    const payload = yield take(statusChannel);
    yield put(setMetropolisStatus(payload));
    if (payload === 'Idle') {
      yield put(getData());
    }
  }
}

export function* takeStatus(socket) {
  yield takeEvery(GET_METROPOLIS_STATUS, takeStatusChannel, socket);
}

export function* emitStartTrain(socket) {
  while (true) {
    const action = yield take(START_TRAIN);
    yield apply(socket, socket.emit, [action.type]);
    yield put(setMetropolisStatus('Running'));
  }
}

function* emitModelName(socket, action) {
  yield apply(socket, socket.emit, [action.type, action.payload]);
}

export function* takeModelName(socket) {
  yield takeEvery(SET_MODEL_NAME, emitModelName, socket);
}

export function* receiveWebsocketData() {
  const socket = yield call(() => io.connect('http://localhost:5000'));
  yield [
    call(takeConnectChannel, socket),
    call(takeDisconnectChannel, socket),
    call(takeData, socket),
    call(takeStatus, socket),
    call(emitStartTrain, socket),
    call(takeModelName, socket),
  ];
}

export default [
  receiveWebsocketData,
];
