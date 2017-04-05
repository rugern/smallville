import { take, call, put, select, takeEvery } from 'redux-saga/effects';

function* fetchPlots() {
  try {
    const plots = yield call(Api.fetchPlots);
    yield put({type: 'FETCH_PLOTS_SUCCESSFUL', plots});
  } catch (error) {
    yield put({type: 'FETCH_PLOTS_FAILED', message: e.message});
  }
}

export function* fetchPlotsRequest() {
  yield takeEvery('FETCH_PLOTS_REQUEST', fetchPlots);
}

// All sagas to be loaded
export default [
  fetchPlotsRequest,
];
