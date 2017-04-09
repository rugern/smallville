import {
  START_TRAINING,
} from './constants';

export function startTraining() {
  return {
    type: START_TRAINING,
    meta: {
      websocket: true,
    }
  };
}
