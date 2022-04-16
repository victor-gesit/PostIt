/* eslint-env browser */
import request from 'superagent';
import utils from './utils';

const createGroupMiddleware = store => next => (action) => {
  // Pass all actions through by default
  next(action);
  const url = '/api';
  switch (action.type) {
    // Create a new group
    case 'CREATE_GROUP':
      request.post(`${url}/group`)
        .set('x-access-token', action.token)
        .send({
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
          utils.createGroup(res.body, (err, newState, createdGroup) => {
            next({
              type: 'CREATE_GROUP_SUCCESS',
              newState,
              data: { createdGroup }
            });
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
          utils.getPostItMembers(res.body, (err, newState) => {
            next({
              type: 'GET_POST_IT_MEMBERS_SUCCESS',
              newState
            });
          });
        });
      break;
    default:
      break;
  }
};

export default createGroupMiddleware;
