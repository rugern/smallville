import { takeEvery, call, put, select, takeLatest, apply, throttle } from 'redux-saga/effects';
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
} from './constants';
import {
  selectOffset,
  selectLimit,
  selectEpochs,
} from './selectors';
import {
  SET_DATAFILE,
  SET_METROPOLIS_STATUS,
  DELETE_MODEL,
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
  const query = queryString.stringify({ limit, offset });
  const response = yield call(api.getData, datafile, query);
  yield put(setData(response));
}

function* setOffset() {
  yield call(getData);
}

export function* takeSetOffset() {
  yield throttle(200, SET_OFFSET, setOffset);
}

function* setLimit() {
  yield call(getData);
}

export function* takeSetLimit() {
  yield throttle(200, SET_LIMIT, setLimit);
}

function* setDatafile() {
  yield call(getData);
}

export function* takeSetDatafile() {
  yield takeLatest(SET_DATAFILE, setDatafile);
}

function* emitStartTrain(socket, action) {
  yield put(clearInfo());
  const datafile = yield select(selectDatafile());
  const epochs = yield select(selectEpochs());
  const model = yield select(selectModel());
  yield apply(socket, socket.emit, [action.type, { datafile, epochs, model }]);
}

function* takeStartTrain(socket) {
  yield takeEvery(START_TRAIN, emitStartTrain, socket);
}

function* setMetropolisStatus(action) {
  switch (action.payload) {
    case 'Finished training':
      yield call(getData);
      break;
    default:
      // Do nothing
  }
}

export function* takeSetMetropolisStatus() {
  yield takeEvery(SET_METROPOLIS_STATUS, setMetropolisStatus);
}

export function* receiveWebsocketData(socket) {
  yield [
    call(takeStartTrain, socket),
  ];
}

function* deleteModel(action) {
  const datafile = yield select(selectDatafile());
  const currentModel = yield select(selectModel());
  if (currentModel === action.payload.model) {
    yield put(setModel(''));
  }

  yield call(api.deleteModel, datafile, action.payload.model);
  yield call(getData);
}

export function* takeDeleteModel() {
  yield takeEvery(DELETE_MODEL, deleteModel);
}

export default [
  receiveWebsocketData,
  takeSetMetropolisStatus,
  takeSetLimit,
  takeSetOffset,
  takeSetDatafile,
  takeDeleteModel,
  ...appSagas,
];
