import { createSelector } from 'reselect';

/**
 * Direct selector to the main state domain
 */
const selectMainDomain = () => (state) => state.get('main');

/**
 * Other specific selectors
 */
const selectConnectionStatus = () => createSelector(
  selectMainDomain(),
  (state) => state.get('connectionStatus')
);

const selectPredictions = () => createSelector(
  selectMainDomain(),
  (state) => state.get('predictions').toJS()
);

const selectIndicators = () => createSelector(
  selectMainDomain(),
  (state) => state.get('indicators').toJS()
);

const selectLabels = () => createSelector(
  selectMainDomain(),
  (state) => state.get('labels').toJS()
);

const selectMetropolisStatus = () => createSelector(
  selectMainDomain(),
  (state) => state.get('metropolisStatus')
);

const selectModelName = () => createSelector(
  selectMainDomain(),
  (state) => state.get('modelName')
);

const selectEpochs = () => createSelector(
  selectMainDomain(),
  (state) => state.get('epochs')
);

const selectOffset = () => createSelector(
  selectMainDomain(),
  (state) => state.get('offset')
);

const selectLimit = () => createSelector(
  selectMainDomain(),
  (state) => state.get('limit')
);

const selectModels = () => createSelector(
  selectMainDomain(),
  (state) => state.get('models').toJS()
);

const selectDatafiles = () => createSelector(
  selectMainDomain(),
  (state) => state.get('datafiles').toJS()
);

const selectDatafile = () => createSelector(
  selectMainDomain(),
  (state) => state.get('datafile')
);

const selectDatasize = () => createSelector(
  selectMainDomain(),
  (state) => state.get('datasize')
);

/**
 * Default selector used by Main
 */

const makeSelectMain = () => createSelector(
  selectMainDomain(),
  (substate) => substate.toJS()
);

export default makeSelectMain;
export {
  selectMainDomain,
  selectConnectionStatus,
  selectIndicators,
  selectPredictions,
  selectLabels,
  selectMetropolisStatus,
  selectModelName,
  selectEpochs,
  selectOffset,
  selectLimit,
  selectModels,
  selectDatafiles,
  selectDatafile,
  selectDatasize,
};
