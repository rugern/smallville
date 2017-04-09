import { createSelector } from 'reselect';

const selectWebsocketDomain = () => (state) => state.get('websocket');

const selectPredictions = () => createSelector(
  selectWebsocketDomain(),
  (state) => state.get('predictions').toJS()
);

const selectIndicators = () => createSelector(
  selectWebsocketDomain(),
  (state) => state.get('indicators').toJS()
);

const selectConnectionStatus = () => createSelector(
  selectWebsocketDomain(),
  (state) => state.get('connectionStatus')
);

export {
  selectPredictions,
  selectIndicators,
  selectConnectionStatus,
};
