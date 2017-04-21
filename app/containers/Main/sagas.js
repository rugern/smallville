import { take, takeEvery, call, put, select, takeLatest, apply, throttle } from 'redux-saga/effects';
import { eventChannel, buffers } from 'redux-saga'

import {
  setConnectionStatus,
  setMetropolisStatus,
  setData,
  getData,
  getMetropolisStatus,
  setInfo,
  clearInfo,
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
  ADD_METROPOLIS_INFO,
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
  if (socket.connected) {
    yield put(setConnectionStatus('connect'));
    yield put(getMetropolisStatus());
    yield put(getData());
    const modelName = yield(select(selectModelName()));
    yield apply(socket, socket.emit, [SET_MODEL_NAME, modelName]);
  }
  const connectionChannel = yield call(createChannel, socket, 'connect');
  while (true) {
    const payload = yield take(connectionChannel, buffers.sliding(5));
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
    const payload = yield take(connectionChannel, buffers.sliding(5));
    yield put(setConnectionStatus(payload));
  }
}

export function* takeDataChannel(socket) {
  const dataChannel = yield call(createChannel, socket, SET_DATA);
  while (true) {
    const payload = yield take(dataChannel, buffers.sliding(5));
    yield put(setData(payload));
  }
}

function* emitGetData(socket) {
  const offset = yield select(selectOffset());
  const limit = yield select(selectLimit());
  yield apply(socket, socket.emit, [GET_DATA, {offset, limit}]);
}

export function* takeGetData(socket) {
  yield throttle(200, GET_DATA, emitGetData, socket);
}

export function* takeSetOffset(socket) {
  yield throttle(200, SET_OFFSET, emitGetData, socket);
}

export function* takeSetLimit(socket) {
  yield throttle(200, SET_LIMIT, emitGetData, socket);
}

export function* takeStatusChannel(socket, action) {
  const statusChannel = yield call(createChannel, socket, SET_METROPOLIS_STATUS);
  while (true) {
    const payload = yield take(statusChannel, buffers.sliding(5));
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
    yield put(clearInfo());
    yield apply(socket, socket.emit, [action.type]);
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

export function* takeInfoChannel(socket) {
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
    call(takeInfoChannel, socket),
  ];
}

export default [
  receiveWebsocketData,
];
