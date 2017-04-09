import { createSelector } from 'reselect';

const selectWebsocketDomain = () => (state) => state.get('websocket');
const selectAppDomain = () => (state) => state.get('app');

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
 * Other shared specific selectors
 */
const selectMetropolisStatus = () => createSelector(
  selectWebsocketDomain(),
  (websocketState) => websocketState.get('metropolisStatus'),
);

const selectConnectionStatus = () => createSelector(
  selectWebsocketDomain(),
  (websocketState) => websocketState.get('connectionStatus'),
);

const selectIndicators = () => createSelector(
  selectWebsocketDomain(),
  (websocketState) => websocketState.get('indicators').toJS(),
);

const selectPredictions = () => createSelector(
  selectWebsocketDomain(),
  (websocketState) => websocketState.get('predictions').toJS(),
);

const selectInstanceName = () => createSelector(
  selectWebsocketDomain(),
  (websocketState) => websocketState.get('instanceName'),
);

const selectModels = () => createSelector(
  selectWebsocketDomain(),
  (websocketState) => websocketState.get('models').toJS(),
);

const selectSidebarOpen = () => createSelector(
  selectAppDomain(),
  (state) => state.get('sidebarOpen')
);

export {
  makeSelectLocationState,
  selectMetropolisStatus,
  selectConnectionStatus,
  selectWebsocketDomain,
  selectIndicators,
  selectPredictions,
  selectInstanceName,
  selectModels,
  selectSidebarOpen,
};
