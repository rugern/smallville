import { createSelector } from 'reselect';

/**
 * Direct selector to the test state domain
 */
const selectTestDomain = () => (state) => state.get('test');

/**
 * Other specific selectors
 */

const selectStartMoney = () => createSelector(
  selectTestDomain(),
  (state) => state.get('startMoney')
);

const selectEndMoney = () => createSelector(
  selectTestDomain(),
  (state) => state.get('endMoney')
);

const selectStayMoney = () => createSelector(
  selectTestDomain(),
  (state) => state.get('stayMoney')
);

/**
 * Default selector used by Test
 */

const makeSelectTest = () => createSelector(
  selectTestDomain(),
  (substate) => substate.toJS()
);

export default makeSelectTest;
export {
  selectTestDomain,
  selectStartMoney,
  selectEndMoney,
  selectStayMoney,
};
