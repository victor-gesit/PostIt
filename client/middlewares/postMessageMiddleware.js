/* eslint-env browser */
import request from 'superagent';

const postMessageMiddleware = store => next => (action) => {
  // Pass all actions through by default
  next(action);
  const url = '/api';
  switch (action.type) {
    // Post a message to a group
    case 'POST_MESSAGE':
      request.post(`${url}/group/${action.groupId}/message`)
        .set('x-access-token', action.token)
        .send({
          body: action.body,
          priority: action.priority,
          isComment: action.isComment,
        })
        .end((err, res) => {
          if (err) {
            return next({
              type: 'POST_MESSAGE_ERROR',
              message: err.message
            });
          }
          next({
            type: 'POST_MESSAGE_SUCCESS',
            message: res.body.message,
            groupId: action.groupId
          });
        });
      break;
    // Add group members
    case 'ADD_MEMBER':
      request.post(`${url}/group/${action.groupId}/user`)
        .set('x-access-token', action.token)
        .send({
          email: action.email,
        })
        .end((err, res) => {
          if (err) {
            return next({
              type: 'ADD_MEMBER_ERROR',
              message: err.message
            });
          }
          next({
            type: 'ADD_MEMBER_SUCCESS',
            addedMembers: res.body.addedMembers,
            groupId: action.groupId
          });
        });
      break;
    // Delete a group
    case 'DELETE_A_GROUP':
      request
        .delete(`${url}/group/${action.groupId}/delete`)
        .set('x-access-token', action.token)
        .send()
        .end((err) => {
          if (err) {
            return next({
              type: 'DELETE_A_GROUP_ERROR',
              message: err.message
            });
          }
          next({
            type: 'DELETE_A_GROUP_SUCCESS',
            groupId: action.groupId
          });
        });
      break;
    // Load messages from group
    case 'GET_MESSAGES':
      request
        .get(`${url}/group/${action.groupId}/messages`)
        .set('x-access-token', action.token)
        .end((err, res) => {
          if (err) {
            // Ignore browser errors which do not have a res object
            if (res) {
              // No authentication
              if (res.status === 401) {
                return next({
                  type: 'INVALID_AUTH',
                });
              }
              // If group no found
              if (res.status === 404) {
                return next({
                  type: 'GET_MESSAGES_ERROR',
                  message: err.message
                });
              }
              if (res.status === 422) {
                return next({
                  type: 'INVALID_GROUP_ID',
                  message: err.message
                });
              }
            }
            return;
          }
          next({
            type: 'GET_MESSAGES_SUCCESS',
            groupId: action.groupId,
            messagesDbSnapshot: res.body
          });
        });
      break;
    case 'SEEN_BY':
      request
        .get(`${url}/group/${action.messageId}/message/seenby`)
        .set('x-access-token', action.token)
        .end((err, res) => {
          if (err) {
            // Ignore browser errors, which do not have a res object
            if (res) {
              return next({
                type: 'SEEN_BY_ERROR'
              });
            }
          }
          return next({
            type: 'SEEN_BY_SUCCESS',
            data: res.body
          });
        });
      break;
    // Get members of a group
    case 'GET_GROUP_MEMBERS':
      request
        .get(`${url}/group/${action.groupId}/members`)
        .set('x-access-token', action.token)
        .end((err, res) => {
          if (err) {
            // Ignore browser errors which do not have a res object
            if (res) {
              return next({
                type: 'GET_GROUP_MEMBERS_ERROR',
                message: err.message
              });
            }
          }
          next({
            type: 'GET_GROUP_MEMBERS_SUCCESS',
            membersDBSnapshot: res.body,
            groupId: action.groupId
          });
        });
      break;
    // Delete a user from a group
    case 'DELETE_GROUP_MEMBER':
      request
        .delete(`${url}/group/${action.groupId}/members`)
        .set('x-access-token', action.token)
        .send({
          idToDelete: action.idToDelete,
        })
        .end((err) => {
          if (err) {
            return next({
              type: 'DELETE_GROUP_MEMBER_ERROR',
              message: err.message
            });
          }
          next({
            type: 'DELETE_GROUP_MEMBER_SUCCESS',
            deletedId: action.idToDelete,
            groupId: action.groupId
          });
        });
      break;
    case 'LEAVE_GROUP':
      request
        .delete(`${url}/group/${action.groupId}/leave`)
        .set('x-access-token', action.token)
        .end((err) => {
          if (err) {
            return next({
              type: 'LEAVE_GROUP_ERROR',
              message: err.message
            });
          }
          next({
            type: 'LEAVE_GROUP_SUCCESS',
            deletedId: action.idToDelete,
            groupId: action.groupId
          });
        });
      break;
    case 'SEARCH_GROUP_LIST':
      request
        .get(`${url}/group/${action.groupId}/search?searchQuery=${action.searchQuery}`)
        .set('x-access-token', action.token)
        .end((err, res) => {
          if (err) {
            return next({
              type: 'SEARCH_GROUP_LIST_ERROR',
              message: err.message
            });
          }
          next({
            type: 'SEARCH_GROUP_LIST_SUCCESS',
            searchResult: res.body,
            groupId: action.groupId
          });
        });
      break;
    default:
      break;
  }
};

export default postMessageMiddleware;
