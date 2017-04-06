import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
} from './constants';

const initialState = fromJS({
  plots: ['hei'],
});

function mainReducer(state = initialState, action) {
  switch (action.type) {
    case 'click':
      return state.set('plots', ['hallo']);
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default mainReducer;
