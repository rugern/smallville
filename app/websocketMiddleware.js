import io from 'socket.io-client';

import {
  setConnectionStatus,
  getIndicators,
  getPredictions,
  setIndicators,
  setPredictions,
} from './actions';

export default function websocketMiddleware(store) {
  const socket = io.connect('http://localhost:5000');

  socket.on('connect', () => {
    store.dispatch(setConnectionStatus('Connected'));
    store.dispatch(getIndicators({data: false}));
    store.dispatch(getPredictions({data: false}));
  });

  socket.on('disconnect', () => {
    store.dispatch(setConnectionStatus('Disconnected'));
  });

  socket.on('set_predictions', (predictions) => {
    store.dispatch(setPredictions(predictions));
  });

  socket.on('set_indicators', (indicators) => {
    store.dispatch(setIndicators(indicators));
  });

  return next => action => {
    if (action.meta && action.meta.websocket) {
      socket.emit(action.type, action.options);
      return;
    }
    return next(action);
  };
}
