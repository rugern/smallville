/*
 *
 * Main actions
 *
 */

import {
  DEFAULT_ACTION,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function click() {
  console.log('click');
  return {
    type: 'click',
  };
}
