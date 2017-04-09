
import { fromJS } from 'immutable';
import controlPanelReducer from '../reducer';

describe('controlPanelReducer', () => {
  it('returns the initial state', () => {
    expect(controlPanelReducer(undefined, {})).toEqual(fromJS({}));
  });
});
