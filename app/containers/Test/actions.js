/*
 *
 * Test actions
 *
 */

import {
  START_TEST,
  SET_TEST_RESULT,
} from './constants';

export function startTest() {
  return {
    type: START_TEST,
  };
}

export function setTestResult(payload) {
  return {
    type: SET_TEST_RESULT,
    payload,
  };
}
