import io from 'socket.io-client';

export default function connect() {
  return io.connect('http://localhost:5000');
}
