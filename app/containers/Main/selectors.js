import { createSelector } from 'reselect';

/**
 * Direct selector to the main state domain
 */
const selectMainDomain = () => (state) => state.get('main');

/**
 * Other specific selectors
 */

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
  selectIndicators,
  selectPredictions,
  selectLabels,
  selectEpochs,
  selectOffset,
  selectLimit,
  selectDatasize,
};
