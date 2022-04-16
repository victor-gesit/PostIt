import { Reducer } from 'redux-testkit';
import postItInfoReducer from '../../reducers/postItInfoReducer';
import { postItInfoReducerMock as mock } from '../mockData';

describe('postItInfoReducer', () => {
  it('should have an initial state', () => {
    expect(postItInfoReducer(undefined, {
      type: 'UNREGISTERED'
    })).toEqual(mock.initialState);
  });
  it('should not affect state', () => {
    Reducer(postItInfoReducer).expect({ type: 'NOT_EXISTING' })
      .toReturnState(mock.initialState);
  });
  it('should set store with all members registered on the application', () => {
    Reducer(postItInfoReducer).expect(mock.actionMembersGotten)
      .toReturnState({ ...mock.initialState, ...mock.postItMembers });
  });
  it('should set store with the list of all the groups on the application', () => {
    Reducer(postItInfoReducer).expect(mock.actionAllGroupsGotten)
      .toReturnState({ ...mock.initialState, ...mock.postItGroups });
  });
  it('should reset state after a user signs out', () => {
    Reducer(postItInfoReducer).expect(mock.actionSignOut)
      .toReturnState(mock.initialState);
  });
});
