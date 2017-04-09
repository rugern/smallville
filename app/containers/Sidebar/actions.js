/*
 *
 * Sidebar actions
 *
 */

import {
  DEFAULT_ACTION,
  TOGGLE_SIDEBAR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function toggleSidebar(value) {
  return {
    type: TOGGLE_SIDEBAR,
    value,
  };
}
