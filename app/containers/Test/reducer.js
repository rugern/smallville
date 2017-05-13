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
      return state
        .set('startMoney', action.payload.startMoney)
        .set('endMoney', action.payload.endMoney)
        .set('buys', action.payload.buys)
        .set('sells', action.payload.sells)
        .set('stayMoney', action.payload.stayMoney);
    default:
      return state;
  }
}

export default testReducer;
