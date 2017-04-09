import io from 'socket.io-client';
import {
  receiveIndicators,
  receivePredictions,
  receiveMetropolisStatus,
  receiveInstanceName,
  receiveModels,
  setConnectionStatus,
} from './actions';

export default function websocketMiddleware(store) {
  const socket = io.connect('http://localhost:5000');

  socket.on('connect', () => {
    store.dispatch(setConnectionStatus('Connected'));
    socket.emit('predictions');
    socket.emit('indicators');
  });

  socket.on('disconnect', () => {
    store.dispatch(setConnectionStatus('Disconnected'));
  });

  socket.on('predictions', (predictions) => {
    store.dispatch(receivePredictions(predictions));
  });

  socket.on('indicators', (indicators) => {
    store.dispatch(receiveIndicators(indicators));
  });

  return next => action => {
    if (action.meta && action.meta.websocket) {
      socket.emit(action.type);
      return;
    }
    return next(action);
  };
}
