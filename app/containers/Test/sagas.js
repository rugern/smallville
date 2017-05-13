import { call, put, apply, takeEvery } from 'redux-saga/effects';

import { createChannel } from '../../utils/sagaUtils';
import appSagas from '../App/sagas';
import {
  START_TEST,
  SET_TEST_RESULT,
} from './constants';
import {
  setTestResult,
} from './actions';
import {
  clearInfo,
} from '../App/actions';

function* emitStartTest(socket, action) {
  yield put(clearInfo());
  yield apply(socket, socket.emit, [action.type]);
}

export function* takeStartTest(socket) {
  yield takeEvery(START_TEST, emitStartTest, socket);
}

function* testResult(payload) {
  yield put(setTestResult(payload));
}

export function* takeResultChannel(socket) {
  const resultChannel = yield call(createChannel, socket, SET_TEST_RESULT);
  yield takeEvery(resultChannel, testResult);
}

export function* receiveWebsocketData(socket) {
  yield [
    call(takeStartTest, socket),
    call(takeResultChannel, socket),
  ];
}

export default [
  receiveWebsocketData,
  ...appSagas,
];
