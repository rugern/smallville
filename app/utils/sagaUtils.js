import { eventChannel } from 'redux-saga'

export function createChannel(socket, eventName) {
  return eventChannel((emit) => {
    const handler = (data) => {
      const payload = data ? data : eventName;
      emit(payload);
    };

    const unsubscribe = () => {
      socket.off(eventName);
    };

    socket.on(eventName, handler);
    return unsubscribe;
  });
}
