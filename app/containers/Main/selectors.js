import { createSelector } from 'reselect';

const selectMainDomain = () => (state) => state.get('main');

const makeSelectMain = () => createSelector(
  selectMainDomain(),
  (substate) => substate.toJS(),
);

export {
  makeSelectMain,
  selectMainDomain,
};
