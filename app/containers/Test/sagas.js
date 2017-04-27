import { take, takeEvery, call, put, select, takeLatest, apply, throttle } from 'redux-saga/effects';
import { buffers } from 'redux-saga'

import { createChannel } from '../../utils/sagaUtils';
import appSagas from '../App/sagas';
import {
  START_TEST,
  SET_TEST_RESULT,
} from './constants';
import {
  setTestResult,
} from './actions';

export function* emitStartTrain(socket) {
  while (true) {
    const action = yield take(START_TEST);
    yield apply(socket, socket.emit, [action.type]);
  }
}

export function* takeResultChannel(socket) {
  const resultChannel = yield call(createChannel, socket, SET_TEST_RESULT);
  while (true) {
    const payload = yield take(resultChannel, buffers.sliding(5));
    yield put(setTestResult(payload));
  }
}

export function* receiveWebsocketData(socket) {
  yield [
    call(emitStartTrain, socket),
    call(takeResultChannel, socket),
  ];
}

export default [
  receiveWebsocketData,
  ...appSagas,
];
