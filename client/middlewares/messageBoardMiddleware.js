/* eslint-env browser */
import request from 'superagent';
import utils from './utils';

const messageBoardMiddleware = store => next => (action) => {
  // Pass all actions through by default
  next(action);
  const url = '/api';
  switch (action.type) {
    // Get all groups a user belongs to (paginated)
    case 'GET_ALL_GROUPS_FOR_A_USER':
      request
        .get(`${url}/user/groups?offset=${action.offset}&limit=${action.limit}`)
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
          utils.getGroups(res.body, (err, newState) => {
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
        .get(`${url}/user/groups?offset=${action.offset}`)
        .set('x-access-token', action.token)
        .end((err, res) => {
          if (err) {
            return next({
              type: 'GET_ALL_GROUPS_FOR_A_USER_AT_ONCE_ERROR',
              message: err.message
            });
          }
          utils.getGroups(res.body, (err, newState) => {
            next({
              type: 'GET_ALL_GROUPS_FOR_A_USER_AT_ONCE_SUCCESS',
              newState
            });
          });
        });
      break;
    default:
      break;
  }
};

export default messageBoardMiddleware;
