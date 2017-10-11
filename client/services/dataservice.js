/* eslint-env browser */
import request from 'superagent';
import methods from './utils';

const dataService = store => next => (action) => {
  // Pass all actions through by default
  if (action.type !== 'VERIFY_TOKEN') {
    next(action);
  }
  const home = location.origin;
  const url = `${home}/api`;
  switch (action.type) {
    // Signin a user
    case 'SIGN_IN':
      request.post(`${url}/user/signin`)
        .send({
          email: action.email,
          password: action.password,
        })
        .end((err, res) => {
          // Return the first error message when there are many
          if (err) {
            // Ignore browser errors which do not have a res object
            if (res) {
              return next({
                type: 'SIGN_IN_ERROR',
                message: res.body.message
              });
            }
          }
          const userDetails = res.body.user;
          userDetails.token = res.body.token;
          next({
            type: 'SIGN_IN_SUCCESS',
            userDetails
          });
        });
      break;
    // Signup a new user
    case 'SIGN_UP':
      request.post(`${url}/user/signup`)
        .send({
          firstName: action.firstName,
          lastName: action.lastName,
          email: action.email,
          phone: action.phone,
          password: action.password,
        })
        .end((err, res) => {
          if (err) {
            // Ignore browser errors which do not have a res object
            if (res) {
              if (res.body.messages) {
                // Return the first error message when there are many
                return next({
                  type: 'SIGN_UP_ERROR',
                  message: res.body.messages[0]
                });
              }
              return next({
                type: 'SIGN_UP_ERROR',
                message: res.body.message
              });
            }
          }
          const userDetails = res.body.user;
          userDetails.token = res.body.token;
          next({
            type: 'SIGN_UP_SUCCESS',
            userDetails
          });
        });
      break;
    // Post a message to a group
    case 'POST_MESSAGE':
      request.post(`${url}/group/${action.groupId}/message`)
        .set('x-access-token', action.token)
        .send({
          body: action.body,
          priority: action.priority,
          isComment: action.isComment,
          senderId: action.senderId,
        })
        .end((err, res) => {
          if (err) {
            return next({
              type: 'POST_MESSAGE_ERROR',
              message: err.message
            });
          }
          const message = res.body.message;
          next({
            type: 'POST_MESSAGE_SUCCESS',
            message,
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
          adderId: action.adderId,
        })
        .end((err, res) => {
          if (err) {
            return next({
              type: 'ADD_MEMBER_ERROR',
              message: err.message
            });
          }
          const addedMembers = res.body.addedMembers;
          next({
            type: 'ADD_MEMBER_SUCCESS',
            addedMembers,
            groupId: action.groupId
          });
        });
      break;
    // Delete a group
    case 'DELETE_A_GROUP':
      request
        .delete(`${url}/group/${action.groupId}/delete`)
        .set('x-access-token', action.token)
        .send({
          ownerId: action.ownerId
        })
        .end((err) => {
          if (err) {
            return next({
              type: 'DELETE_A_GROUP_ERROR',
              message: err.message
            });
          }
          const groupId = action.groupId;
          next({
            type: 'DELETE_A_GROUP_SUCCESS',
            groupId
          });
        });
      break;
    // Create a new group
    case 'CREATE_GROUP':
      request.post(`${url}/group`)
        .set('x-access-token', action.token)
        .send({
          creatorId: action.creatorId,
          title: action.title,
          description: action.description,
          initialMembers: action.initialMembers
        })
        .end((err, res) => {
          if (err) {
            // Ignore browser errors which do not have a res object
            if (res) {
              return next({
                type: 'CREATE_GROUP_ERROR',
                // Return the first error if there are many
                message: res.body.messages[0]
              });
            }
          }
          const data = res.body;
          methods.createGroup(data, (err, newState, createdGroup) => {
            next({
              type: 'CREATE_GROUP_SUCCESS',
              newState,
              data: { createdGroup }
            });
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
              // No authentication
              if (res.status === 401) {
                return next({
                  type: 'INVALID_AUTH',
                });
              }
            }
            return;
          }
          const messagesDbSnapshot = res.body;
          next({
            type: 'GET_MESSAGES_SUCCESS',
            groupId: action.groupId,
            messagesDbSnapshot,
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
          const data = res.body;
          return next({
            type: 'SEEN_BY_SUCCESS',
            data
          });
        });
      break;
    // Get members of a group
    case 'GET_GROUP_MEMBERS':
      request
        .get(`${url}/group/${action.groupId}/members/`)
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
          const membersDBSnapshot = res.body;
          next({
            type: 'GET_GROUP_MEMBERS_SUCCESS',
            membersDBSnapshot,
            groupId: action.groupId
          });
        });
      break;
    // Get all users registered on PostIt
    case 'GET_POST_IT_MEMBERS':
      request
        .get(`${url}/members?offset=${action.offset}`)
        .set('x-access-token', action.token)
        .end((err, res) => {
          if (err) {
            // Ignore browser errors which do not have a res object
            if (res) {
              if (res.status === 401) {
                return next({
                  type: 'INVALID_AUTH'
                });
              }
              return next({
                type: 'GET_POST_IT_MEMBERS_ERROR',
                message: err.message
              });
            }
          }
          const dbSnapShot = res.body;
          methods.getPostItMembers(dbSnapShot, (err, newState) => {
            next({
              type: 'GET_POST_IT_MEMBERS_SUCCESS',
              newState
            });
          });
        });
      break;
    // Get all groups created on PostIt
    case 'GET_ALL_GROUPS':
      request
        .get(`${url}/groups?offset=${action.offset}&limit=${action.limit}`)
        .set('x-access-token', action.token)
        .end((err, res) => {
          if (err) {
            return next({
              type: 'GET_ALL_GROUPS_ERROR',
              message: err.message
            });
          }
          const postItGroups = res.body;
          methods.getAllPostItGroups(postItGroups, (newState) => {
            next({
              type: 'GET_ALL_GROUPS_SUCCESS',
              newState
            });
          });
        });
      break;
    // Get all groups a user belongs to (paginated)
    case 'GET_ALL_GROUPS_FOR_A_USER':
      request
        .get(`${url}/user/${action.userId}/groups?offset=${action.offset}&limit=${action.limit}`)
        .set('x-access-token', action.token)
        .end((err, res) => {
          if (err) {
            // Ignore browser errors
            if (res) {
              return next({
                type: 'GET_ALL_GROUPS_FOR_A_USER_ERROR',
                message: err.message
              });
            }
          }
          const data = res.body;
          methods.getGroups(data, (err, newState) => {
            next({
              type: 'GET_ALL_GROUPS_FOR_A_USER_SUCCESS',
              newState
            });
          });
        });
      break;
    // Get all groups a user belongs to (non paginated)
    case 'GET_ALL_GROUPS_FOR_A_USER_AT_ONCE':
      request
        .get(`${url}/user/${action.userId}/groups?offset=${action.offset}`)
        .set('x-access-token', action.token)
        .end((err, res) => {
          if (err) {
            return next({
              type: 'GET_ALL_GROUPS_FOR_A_USER_AT_ONCE_ERROR',
              message: err.message
            });
          }
          const data = res.body;
          methods.getGroups(data, (err, newState) => {
            next({
              type: 'GET_ALL_GROUPS_FOR_A_USER_AT_ONCE_SUCCESS',
              newState
            });
          });
        });
      break;
    // Delete a user from a group
    case 'DELETE_GROUP_MEMBER':
      request
        .delete(`${url}/group/${action.groupId}/members`)
        .set('x-access-token', action.token)
        .send({
          ownerId: action.ownerId,
          idToDelete: action.idToDelete,
        })
        .end((err) => {
          if (err) {
            return next({
              type: 'DELETE_GROUP_MEMBER_ERROR',
              message: err.message
            });
          }
          const deletedId = action.idToDelete;
          const groupId = action.groupId;
          next({
            type: 'DELETE_GROUP_MEMBER_SUCCESS',
            deletedId,
            groupId
          });
        });
      break;
    // Verify token
    case 'VERIFY_TOKEN':
      request
        .get(`${url}/token`)
        .set('x-access-token', action.token)
        .end((err) => {
          if (err) {
            return next({
              type: 'VERIFY_TOKEN_ERROR',
            });
          }
          next({
            type: 'VERIFY_TOKEN_SUCCESS',
          });
        });
      break;
    case 'GOOGLE_LOGIN':
      request
        .post(`${url}/user/google/login`)
        .send(action.userDetails)
        .end((err, res) => {
          // Return the first error message when there are many
          if (err) {
            // Ignore browser errors which do not have a res object
            if (res) {
              return next({
                type: 'SIGN_IN_ERROR',
                message: res.body.message
              });
            }
          }
          const userDetails = res.body.user;
          userDetails.token = res.body.token;
          next({
            type: 'SIGN_IN_SUCCESS',
            userDetails
          });
        });
      break;
    case 'RECOVER_PASSWORD':
      request
        .post(`${url}/password/recover`)
        .send({
          email: action.email
        })
        .end((err, res) => {
          // Return the first error message when there are many
          if (err) {
            // Ignore browser errors which do not have a res object
            if (res) {
              return next({
                type: 'RECOVER_PASSWORD_ERROR',
                message: res.body.message
              });
            }
          }
          next({
            type: 'RECOVER_PASSWORD_SUCCESS',
            message: res.body.message
          });
        });
      break;
    case 'RESET_PASSWORD':
      request
        .post(`${url}/password/reset`)
        .set('x-access-token', action.token)
        .send({
          newPassword: action.password
        })
        .end((err, res) => {
          // Return the first error message when there are many
          if (err) {
            // Ignore browser errors which do not have a res object
            if (res) {
              return next({
                type: 'SIGN_IN_ERROR',
                message: res.body.message
              });
            }
          }
          const userDetails = res.body.user;
          userDetails.token = res.body.token;
          next({
            type: 'SIGN_IN_SUCCESS',
            userDetails
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
          const deletedId = action.idToDelete;
          const groupId = action.groupId;
          next({
            type: 'LEAVE_GROUP_SUCCESS',
            deletedId,
            groupId
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
          const searchResult = res.body;
          next({
            type: 'SEARCH_GROUP_LIST_SUCCESS',
            searchResult,
            groupId: action.groupId
          });
        });
      break;
    default:
      break;
  }
};

export default dataService;
