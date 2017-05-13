import { createSelector } from 'reselect';

// makeSelectLocationState expects a plain JS object for the routing state
const makeSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

/**
 * Direct selector to the main state domain
 */
const selectAppDomain = () => (state) => state.get('app');

/**
 * Other specific selectors
 */

const selectConnectionStatus = () => createSelector(
  selectAppDomain(),
  (state) => state.get('connectionStatus')
);

const selectMetropolisStatus = () => createSelector(
  selectAppDomain(),
  (state) => state.get('metropolisStatus')
);

const selectModel = () => createSelector(
  selectAppDomain(),
  (state) => state.get('model')
);

const selectModels = () => createSelector(
  selectAppDomain(),
  (state) => state.get('models').toJS()
);

const selectDatafiles = () => createSelector(
  selectAppDomain(),
  (state) => state.get('datafiles').toJS()
);

const selectDatafile = () => createSelector(
  selectAppDomain(),
  (state) => state.get('datafile')
);

const selectInfo = () => createSelector(
  selectAppDomain(),
  (state) => state.get('info').toJS()
);

export {
  makeSelectLocationState,
  selectConnectionStatus,
  selectMetropolisStatus,
  selectModel,
  selectModels,
  selectDatafiles,
  selectDatafile,
  selectInfo,
};
