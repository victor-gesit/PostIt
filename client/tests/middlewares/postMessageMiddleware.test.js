import sinon from 'sinon';
import { postMessageMiddleware } from '../../middlewares';
import {
  getGroupMembers, addUser, getMessages, deleteMember,
  leaveGroup,
  deleteGroup,
  postMessage, seenBy,
  searchGroup,
} from '../../actions';

jest.mock('superagent');

describe('<postMessageMiddleware middleware/>', () => {
  it('passes on an action to post a message to a group', () => {
    const next = sinon.spy().withArgs({ type: 'POST_MESSAGE_SUCCESS',
      message: { body: 'Hey', priority: 'normal' } });
    postMessageMiddleware({})(next)(postMessage('abcd', 'Hey!', 'normal', false, 'validtoken'));
    expect(next.withArgs({ type: 'POST_MESSAGE_SUCCESS',
      message: { body: 'Hey', priority: 'normal' }
    }).called).toEqual(true);
  });
  it('passes on an action to add a member to the group', () => {
    const next = sinon.spy().withArgs({ type: 'ADD_MEMBER_SUCCESS',
      email: 'new@member.com' });
    postMessageMiddleware({})(next)(addUser('new@member.com', 'aGroupId', 'validtoken'));
    expect(next.withArgs({ type: 'ADD_MEMBER_SUCCESS',
      email: 'new@member.com'
    }).called).toEqual(true);
  });
  it('passes on an action to delete a group', () => {
    const next = sinon.spy().withArgs({ type: 'DELETE_A_GROUP_SUCCESS',
      groupId: 'aGroupId' });
    postMessageMiddleware({})(next)(deleteGroup('aGroupId', 'validToken'));
    expect(next.withArgs({ type: 'DELETE_A_GROUP_SUCCESS',
      groupId: 'aGroupId'
    }).called).toEqual(true);
  });
  it('passes on an action to get messages', () => {
    const next = sinon.spy().withArgs({ type: 'GET_MESSAGES_SUCCESS',
      messages: { rows: [{ body: 'Message One' }, { body: 'Message Two' }] } });
    postMessageMiddleware({})(next)(getMessages('aGroupId', 'aValidToken'));
    expect(next.withArgs({ type: 'GET_MESSAGES_SUCCESS',
      messages: { rows: [{ body: 'Message One' }, { body: 'Message Two' }] }
    }).called).toEqual(true);
  });
  it('passes on an action to get those who have seen a message', () => {
    const next = sinon.spy().withArgs({ type: 'SEEN_BY_SUCCESS',
      seenBy: { rows: [{ name: 'Me', id: '12345' }] } });
    postMessageMiddleware({})(next)(seenBy('aMessageId', 'validToken'));
    expect(next.withArgs({ type: 'SEEN_BY_SUCCESS',
      seenBy: { rows: [{ name: 'Me', id: '12345' }] }
    }).called).toEqual(true);
  });
  it('passes on an action to get members of a group', () => {
    const next = sinon.spy().withArgs({ type: 'GET_GROUP_MEMBERS_SUCCESS',
      groupMembers: { rows: [{ name: 'Me', id: '12345' }] } });
    postMessageMiddleware({})(next)(getGroupMembers('aGroupId', 'validToken'));
    expect(next.withArgs({ type: 'GET_GROUP_MEMBERS_SUCCESS',
      groupMembers: { rows: [{ name: 'Me', id: '12345' }] }
    }).called).toEqual(true);
  });
  it('passes on an action to delete a member of a group', () => {
    const next = sinon.spy().withArgs({ type: 'DELETE_GROUP_MEMBER_SUCCESS',
      success: true,
      message: 'Member deleted'
    });
    postMessageMiddleware({})(next)(deleteMember('idToDelete', 'aGroupId', 'validToken'));
    expect(next.withArgs({ type: 'DELETE_GROUP_MEMBER_SUCCESS',
      success: true,
      message: 'Member deleted'
    }).called).toEqual(true);
  });
  it('passes on an action to leave a group', () => {
    const next = sinon.spy().withArgs({ type: 'LEAVE_GROUP_SUCCESS',
      groupId: 'aGroupId' });
    postMessageMiddleware({})(next)(leaveGroup('aGroupId', 'validToken'));
    expect(next.withArgs({ type: 'LEAVE_GROUP_SUCCESS',
      groupId: 'aGroupId'
    }).called).toEqual(true);
  });
  it('passes on an action to search a group', () => {
    const next = sinon.spy().withArgs({ type: 'SEARCH_GROUP_LIST_SUCCESS',
      searchResult: {} });
    postMessageMiddleware({})(next)(searchGroup('validToken', 'aGroupId', 'searchQuery'));
    expect(next.withArgs({ type: 'SEARCH_GROUP_LIST_SUCCESS',
      searchResult: {}
    }).called).toEqual(true);
  });
  it('passes on all actions by default', () => {
    const next = sinon.spy().withArgs({ type: 'UNREGISTERED_PASSED' });
    postMessageMiddleware({})(next)({ type: 'UNREGISTERED' });
    expect(next.withArgs({ type: 'UNREGISTERED_PASSED' })
      .called).toEqual(true);
  });
});
