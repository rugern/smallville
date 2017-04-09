import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import {
  PLOT_INDICATOR,
  PLOT_PREDICTION,
} from './constants';
import {
  SET_PREDICTIONS,
  SET_INDICATORS,
} from '../../constants';

function* plotPredictionRequest(action) {
  let predictions = {};
  predictions[action.prediction] = {};
  try {
    if (action.plot) {
      prediction = yield call(fetchPrediction, action.prediction);
    }
    prediction.plot = action.plot;
    predictions[action.prediction] = prediction;
    yield put({type: SET_PREDICTIONS, predictions, merge: true});
  } catch (error) {
    console.error('plotPredictionRequest:', error);
    yield put({type: SET_PREDICTIONS, predictions});
  }
}

export function* plotPrediction() {
  yield takeEvery(PLOT_PREDICTION, plotPredictionRequest);
}

function* plotIndicatorRequest(action) {
  let indicators = {};
  indicators[action.indicator] = {};
  try {
    if (action.plot) {
      indicator = yield call(fetchPrediction, action.indicator);
    }
    indicator.plot = action.plot;
    indicators[action.indicator] = indicator;
    yield put({type: SET_PREDICTIONS, indicators, merge: true});
  } catch (error) {
    console.error('plotIndicatorRequest:', error);
    yield put({type: SET_PREDICTIONS, indicators});
  }
}

export function* plotIndicator() {
  console.log('kom hit');
  yield takeEvery(PLOT_PREDICTION, plotPredictionRequest);
}

// All sagas to be loaded
export default [
  plotPrediction,
  plotIndicator,
];
