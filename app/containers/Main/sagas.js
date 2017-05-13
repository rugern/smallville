import { takeEvery, call, put, select, takeLatest, apply } from 'redux-saga/effects';
import queryString from 'query-string';

import appSagas from '../App/sagas';
import {
  setData,
} from './actions';
import {
  clearInfo,
  setModel,
} from '../App/actions';
import {
  SET_OFFSET,
  SET_LIMIT,
  START_TRAIN,
  DELETE_MODEL,
} from './constants';
import {
  selectOffset,
  selectLimit,
  selectEpochs,
} from './selectors';
import {
  SET_DATAFILE,
} from '../App/constants';
import {
  selectModel,
  selectDatafile,
} from '../App/selectors';
import api from '../../utils/api';

function* getData() {
  const limit = yield select(selectLimit());
  const offset = yield select(selectOffset());
  const datafile = yield select(selectDatafile());
  const model = yield select(selectModel());
  const epochs = yield select(selectEpochs());
  const query = queryString.parse({ limit, offset, datafile, model, epochs });
  const response = yield call(api.getData, query);
  yield put(setData(response));
}

function* setOffset() {
  yield call(getData);
}

export function* takeSetOffset() {
  yield takeLatest(SET_OFFSET, setOffset);
}

function* setLimit() {
  yield call(getData);
}

export function* takeSetLimit() {
  yield takeLatest(SET_LIMIT, setLimit);
}

function* setDatafile() {
  yield call(getData);
}

export function* takeSetDatafile() {
  yield takeLatest(SET_DATAFILE, setDatafile);
}

function* emitStartTrain(socket, action) {
  yield put(clearInfo());
  yield apply(socket, socket.emit, [action.type]);
}

function* takeStartTrain(socket) {
  yield takeEvery(START_TRAIN, emitStartTrain, socket);
}

function* deleteModel(model) {
  const currentModel = yield select(selectModel());
  if (currentModel === model) {
    yield put(setModel(''));
  }
  yield call(api.deleteModel, model);
  yield call(getData);
}

export function* takeDeleteModel() {
  yield takeEvery(DELETE_MODEL, deleteModel);
}

export function* receiveWebsocketData(socket) {
  yield [
    call(takeStartTrain, socket),
  ];
}

export default [
  receiveWebsocketData,
  takeSetLimit,
  takeSetOffset,
  takeSetDatafile,
  takeDeleteModel,
  ...appSagas,
];
