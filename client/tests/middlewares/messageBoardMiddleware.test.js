import sinon from 'sinon';
import { messageBoardMiddleware } from '../../middlewares';
import { getAllGroupsForUser, getGroupsForUser
} from '../../actions';

jest.mock('superagent');


describe('<messageBoardMiddleware middleware/>', () => {
  it('passes on an action to get all groups a user belongs to', () => {
    const next = sinon.spy().withArgs({ type: 'GET_ALL_GROUPS_FOR_A_USER_SUCCESS',
      userGroups: { rows: [{ title: 'Cool Group', id: '12345' }] } });
    messageBoardMiddleware({})(next)(getGroupsForUser('validToken', 0, 6));
    expect(next.withArgs({ type: 'GET_ALL_GROUPS_FOR_A_USER_SUCCESS',
      userGroups: { rows: [{ title: 'Cool Group', id: '12345' }] }
    }).called).toEqual(true);
  });
  it('passes on an action to get all groups a user belongs to once', () => {
    const next = sinon.spy().withArgs({ type: 'GET_ALL_GROUPS_FOR_A_USER_AT_ONCE_SUCCESS',
      userGroups: { rows: [{ title: 'Cool Group', id: '12345' }] } });
    messageBoardMiddleware({})(next)(getAllGroupsForUser('validToken', 0));
    expect(next.withArgs({ type: 'GET_ALL_GROUPS_FOR_A_USER_AT_ONCE_SUCCESS',
      userGroups: { rows: [{ title: 'Cool Group', id: '12345' }] }
    }).called).toEqual(true);
  });
  it('passes on all actions by default', () => {
    const next = sinon.spy().withArgs({ type: 'UNREGISTERED_PASSED' });
    messageBoardMiddleware({})(next)({ type: 'UNREGISTERED' });
    expect(next.withArgs({ type: 'UNREGISTERED_PASSED' })
      .called).toEqual(true);
  });
});
