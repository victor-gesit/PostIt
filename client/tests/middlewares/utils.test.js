import utils from '../../middlewares/utils';

describe('util', () => {
  it('takes in the groups snapshot from db, and makes a state object', () => {
    const expectedState = { meta: { count: 1, allLoaded: 1 },
      userGroups: { 12345: { info: {
        id: '12345',
        title: 'Mock Group'
      } } } };
    const dbSnapshot = {
      rows: [{
        id: '12345',
        title: 'Mock Group',
      }],
      count: 1,
      allLoaded: 1
    };
    utils.getGroups(dbSnapshot, (err, returnedState) => {
      expect(returnedState).toEqual(expectedState);
    });
  });
  it('takes in the group members snapshot from db, and makes a state object', () => {
    const expectedState = { members: { postItMembers: { 12345: {
      id: '12345',
      title: 'Mock Member' } },
      meta: { count: 1, allLoaded: 1 } } };

    const dbSnapshot = {
      rows: [{
        id: '12345',
        title: 'Mock Member',
      }],
      count: 1,
      allLoaded: 1
    };
    utils.getPostItMembers(dbSnapshot, (err, returnedState) => {
      expect(returnedState).toEqual(expectedState);
    });
  });
  it('takes in a newly created group, and makes a state object', () => {
    const expectedState = { meta: { count: 1 },
      userGroups: { 12345: { info: { id: '12345', title: 'Mock Group' },
        members: {},
        messages: {} } } };
    const apiCallResult = {
      createdGroup: {
        id: '12345',
        title: 'Mock Group'
      }
    };
    utils.createGroup(apiCallResult, (err, returnedState) => {
      expect(returnedState).toEqual(expectedState);
    });
  });
  it('takes in a group search result, and makes a state object', () => {
    const expectedState = { meta: { count: 1 },
      userGroups: { abcdef: { info: {}, members: { 12345: { id: '12345', name: 'Found Member' } }, messages: {} } } };
    const formerState = {
      userGroups: {
        abcdef: {}
      }
    };
    const groupId = 'abcdef';
    const searchResult = {
      rows: [{
        id: '12345',
        name: 'Found Member',
      }],
      count: 1
    };
    const newState = utils.searchGroup(formerState, searchResult, groupId);
    expect(newState).toEqual(expectedState);
  });
});
