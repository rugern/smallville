import { createSelector } from 'reselect';

/**
 * Direct selector to the controlPanel state domain
 */
const selectControlPanelDomain = () => (state) => state.get('controlPanel');

/**
 * Default selector used by ControlPanel
 */

const makeSelectControlPanel = () => createSelector(
  selectControlPanelDomain(),
  (substate) => substate.toJS()
);

export default makeSelectControlPanel;
export {
  selectControlPanelDomain,
};
