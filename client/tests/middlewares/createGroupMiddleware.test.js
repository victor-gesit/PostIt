import sinon from 'sinon';
import { createGroupMiddleware } from '../../middlewares';
import { getPostItMembers, createGroup
} from '../../actions';

jest.mock('superagent');


describe('<createGroupMiddleware middleware/>', () => {
  it('passes on an action to create a group', () => {
    const next = sinon.spy().withArgs({ type: 'CREATE_GROUP_SUCCESS',
      groupInfo: { name: 'New Group' } });
    createGroupMiddleware({})(next)(createGroup('New Group',
      'A New Group', 'me@me.com', 'validToken'));
    expect(next.withArgs({ type: 'CREATE_GROUP_SUCCESS',
      groupInfo: { name: 'New Group' }
    }).called).toEqual(true);
  });
  it('passes on an action to get postIt members', () => {
    const next = sinon.spy().withArgs({ type: 'GET_POST_IT_MEMBERS_SUCCESS',
      postItMembers: { rows: [{ name: 'Me', id: '12345' }] } });
    createGroupMiddleware({})(next)(getPostItMembers('validToken'));
    expect(next.withArgs({ type: 'GET_POST_IT_MEMBERS_SUCCESS',
      postItMembers: { rows: [{ name: 'Me', id: '12345' }] }
    }).called).toEqual(true);
  });
  it('passes on all actions by default', () => {
    const next = sinon.spy().withArgs({ type: 'UNREGISTERED_PASSED' });
    createGroupMiddleware({})(next)({ type: 'UNREGISTERED' });
    expect(next.withArgs({ type: 'UNREGISTERED_PASSED' })
      .called).toEqual(true);
  });
});
