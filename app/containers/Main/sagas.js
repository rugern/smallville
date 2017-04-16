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
  SET_OFFSET,
  SET_LIMIT,
  SET_METROPOLIS_STATUS,
  GET_METROPOLIS_STATUS,
  START_TRAIN,
  SET_MODEL_NAME,
  SET_EPOCHS,
  DELETE_MODEL,
  SET_DATAFILE,
} from './constants';
import {
  selectOffset,
  selectLimit,
  selectModelName,
} from './selectors';


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
    const modelName = yield(select(selectModelName()));
    yield apply(socket, socket.emit, [SET_MODEL_NAME, modelName]);
  }
}

export function* takeDisconnectChannel(socket) {
  const connectionChannel = yield call(createChannel, socket, 'disconnect');
  while (true) {
    const payload = yield take(connectionChannel);
    yield put(setConnectionStatus(payload));
  }
}

export function* takeDataChannel(socket) {
  const dataChannel = yield call(createChannel, socket, SET_DATA);
  while (true) {
    const payload = yield take(dataChannel);
    yield put(setData(payload));
  }
}

function* emitGetData(socket) {
  const offset = yield select(selectOffset());
  const limit = yield select(selectLimit());
  yield apply(socket, socket.emit, [GET_DATA, {offset, limit}]);
}

export function* takeGetData(socket) {
  yield takeLatest(GET_DATA, emitGetData, socket);
}

export function* takeSetOffset(socket) {
  yield takeLatest(SET_OFFSET, emitGetData, socket);
}

export function* takeSetLimit(socket) {
  yield takeLatest(SET_LIMIT, emitGetData, socket);
}

export function* takeStatusChannel(socket, action) {
  const statusChannel = yield call(createChannel, socket, SET_METROPOLIS_STATUS);
  while (true) {
    const payload = yield take(statusChannel);
    yield put(setMetropolisStatus(payload));
    if (payload === 'Idle') {
      yield call(emitGetData, socket);
    }
  }
}

export function* takeStatus(socket) {
  while (true) {
    const action = yield take(GET_METROPOLIS_STATUS);
    yield apply(socket, socket.emit, [action.type]);
  }
}

export function* emitStartTrain(socket) {
  while (true) {
    const action = yield take(START_TRAIN);
    yield apply(socket, socket.emit, [action.type]);
    yield put(setMetropolisStatus('Running'));
  }
}

export function* emitModelName(socket) {
  while (true) {
    const action = yield take(SET_MODEL_NAME);
    yield apply(socket, socket.emit, [action.type, action.payload]);
  }
}

export function* emitEpochs(socket) {
  while (true) {
    const action = yield take(SET_EPOCHS);
    yield apply(socket, socket.emit, [action.type, action.payload]);
  }
}

export function* emitDeleteModel(socket) {
  while (true) {
    const action = yield take(DELETE_MODEL);
    yield apply(socket, socket.emit, [action.type, action.payload]);
  }
}

export function* emitSetDatafile(socket) {
  while (true) {
    const action = yield take(SET_DATAFILE);
    yield apply(socket, socket.emit, [action.type, action.payload]);
    yield call(emitGetData, socket);
  }
}

export function* receiveWebsocketData() {
  const socket = yield call(() => io.connect('http://localhost:5000'));
  yield [
    call(takeConnectChannel, socket),
    call(takeDisconnectChannel, socket),
    call(takeDataChannel, socket),
    call(emitGetData, socket),
    call(takeStatus, socket),
    call(takeStatusChannel, socket),
    call(emitStartTrain, socket),
    call(emitModelName, socket),
    call(emitEpochs, socket),
    call(takeSetOffset, socket),
    call(takeSetLimit, socket),
    call(emitDeleteModel, socket),
    call(emitSetDatafile, socket),
  ];
}

export default [
  receiveWebsocketData,
];