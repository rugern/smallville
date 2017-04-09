import { createSelector } from 'reselect';

/**
 * Direct selector to the sidebar state domain
 */
const selectSidebarDomain = () => (state) => state.get('sidebar');

/**
 * Other specific selectors
 */
const selectSidebarOpen = () => createSelector(
  selectSidebarDomain(),
  (state) => state.get('sidebarOpen')
);

/**
 * Default selector used by Sidebar
 */

const makeSelectSidebar = () => createSelector(
  selectSidebarDomain(),
  (substate) => substate.toJS()
);

export default makeSelectSidebar;
export {
  selectSidebarDomain,
  selectSidebarOpen,
};
