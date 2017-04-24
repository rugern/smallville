import { take, takeEvery, call, put, select, takeLatest, apply, throttle } from 'redux-saga/effects';
import { buffers } from 'redux-saga'

import { createChannel } from '../../utils/sagaUtils';
import {
  setData,
  getData,
} from './actions';
import {
  clearInfo,
} from '../App/actions';
import {
  SET_DATA,
  GET_DATA,
  SET_OFFSET,
  SET_LIMIT,
  START_TRAIN,
  SET_EPOCHS,
  DELETE_MODEL,
  DATAFILE_CHANGED,
} from './constants';
import {
  selectOffset,
  selectLimit,
  selectEpochs,
} from './selectors';
import {
  SET_CONNECTION_STATUS,
  SET_METROPOLIS_STATUS,
  GET_MODELS,
} from '../App/constants';
import appSagas from '../App/sagas';

export function* takeConnectionStatus(socket) {
  while (true) {
    const action = yield take(SET_CONNECTION_STATUS);
    yield put(getData());
    const epochs = yield(select(selectEpochs()));
    yield apply(socket, socket.emit, [SET_EPOCHS, epochs]);
  }
}

export function* takeMetropolisStatus(socket) {
  while (true) {
    const action = yield take(SET_METROPOLIS_STATUS);
    if (action.payload === 'Idle') {
      yield call(emitGetData, socket);
      yield apply(socket, socket.emit, [GET_MODELS]);
    }
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

export function* emitStartTrain(socket) {
  while (true) {
    const action = yield take(START_TRAIN);
    yield put(clearInfo());
    yield apply(socket, socket.emit, [action.type]);
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
    console.log(action);
    yield apply(socket, socket.emit, [action.type, action.payload]);
  }
}

export function* datafileChangedChannel(socket) {
  const changedChannel = yield call(createChannel, socket, DATAFILE_CHANGED);
  while (true) {
    const payload = yield take(changedChannel, buffers.sliding(5));
    yield call(emitGetData, socket);
  }
}

export function* receiveWebsocketData(socket) {
  yield [
    call(takeConnectionStatus, socket),
    call(takeDataChannel, socket),
    call(emitGetData, socket),
    call(emitStartTrain, socket),
    call(emitEpochs, socket),
    call(takeSetOffset, socket),
    call(takeSetLimit, socket),
    call(emitDeleteModel, socket),
    call(datafileChangedChannel, socket),
    call(takeMetropolisStatus, socket),
  ];
}

export default [
  receiveWebsocketData,
  ...appSagas,
];
