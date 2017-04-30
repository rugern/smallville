/*
 *
 * Test reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SET_TEST_RESULT,
} from './constants';

const initialState = fromJS({
  startMoney: 0,
  endMoney: 0,
  stayMoney: 0,
  sells: 0,
  buys: 0,
});

function testReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TEST_RESULT:
      state = state.set('startMoney', action.payload.startMoney);
      state = state.set('endMoney', action.payload.endMoney);
      state = state.set('buys', action.payload.buys);
      state = state.set('sells', action.payload.sells);
      return state.set('stayMoney', action.payload.stayMoney);
    default:
      return state;
  }
}

export default testReducer;
