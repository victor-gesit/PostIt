import { Reducer } from 'redux-testkit';
import indexReducer from '../../reducers/';
import { indexReducerMock as mock } from '../mockData';

describe('indexReducer', () => {
  it('should have an initial state', () => {
    expect(indexReducer(undefined, {
      type: 'UNREGISTERED'
    })).toEqual(mock.initialState);
  });
  it('should not affect state', () => {
    Reducer(indexReducer).expect({ type: 'NOT_EXISTING' })
      .toReturnState(mock.initialState);
  });
  it('should reset state after a user signs out', () => {
    Reducer(indexReducer).expect(mock.actionSignOut)
      .toReturnState(mock.initialState);
  });
});
