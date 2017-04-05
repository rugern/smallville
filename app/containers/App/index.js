import React from 'react';
import io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';

const socket = io.connect('http://localhost:5000');
socket.on('connect', () => {
  console.log("socket connected");
});

socket.on('disconnect', () => {
  console.log("socket disconnected");
});

const plotsObserver = new Observable((observer) => {
  socket.on('plots', (data) => {
    observer.next(data);
  });
});

const plotObserver = new Observable((observer) => {
  socket.on('plot', (data) => {
    observer.next(data);
  });
});

function retrieveData(name) {
  socket.emit('plot', name);
}


export default class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    return (
      <div>
        {React.Children.toArray(this.props.children)}
      </div>
    );
  }
}
