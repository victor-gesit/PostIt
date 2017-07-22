import request from 'superagent';

const dataService = store => next => (action) => {
  // Pass all actions through by default
  next(action);
  const url = 'http://localhost:8002/api';
  switch (action.type) {
    case 'SIGN_IN':
      request.post(`${url}/user/signin`)
        .send({
          email: action.email,
          password: action.password,
        })
        .end((err, res) => {
          if (err) {
            return next({
              type: 'SIGN_IN_ERROR',
              message: err.message
            });
          }
          const userDetails = res.body;
          next({
            type: 'SIGN_IN_SUCCESS',
            userDetails
          });
        });
      break;

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
            return next({
              type: 'SIGN_UP_ERROR',
              message: err.message
            });
          }
          const userDetails = res.body;
          next({
            type: 'SIGN_UP_SUCCESS',
            userDetails
          });
        });
      break;
    case 'POST_MESSAGE':
      request.post(`${url}/group/${action.groupId}/message`)
        .set('x-access-token', action.token)
        .send({
          message: action.message,
          priority: action.priority,
          isComment: action.isComment,
          senderId: action.senderId
        })
        .end((err, res) => {
          if (err) {
            return next({
              type: 'POST_MESSAGE_ERROR',
              message: err.message
            });
          }
          const message = res.body;
          next({
            type: 'POST_MESSAGE_SUCCESS',
            message
          });
        });
      break;
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
              type: 'ADD_MEMBER_SUCCESS',
              message: err.message
            });
          }
          const members = res.body;
          next({
            type: 'ADD_MEMBER_ERROR',
            members
          });
        });
      break;

    case 'DELETE_A_GROUP':
      request
        .delete(`${url}/group/${action.groupId}/delete`)
        .end((err, res) => {
          if (err) {
            return next({
              type: 'DELETE_A_GROUP_ERROR',
              message: err.message
            });
          }
          const data = res.body;
          next({
            type: 'DELETE_A_GROUP_SUCCESS',
            data
          });
        });
      break;

    case 'CREATE_GROUP':
      request.post(`${url}/group`)
        .set('x-access-token', action.token)
        .send({
          userId: action.email,
          title: action.adderId,
          description: action.description,
          initialMembers: action.initialMembers
        })
        .end((err, res) => {
          if (err) {
            return next({
              type: 'CREATE_GROUP_ERROR',
              message: err.message
            });
          }
          const data = res.body;
          next({
            type: 'CREATE_GROUP_SUCCESS',
            data
          });
        });
      break;

    case 'GET_MESSAGES':
      request
        .get(`${url}/group/${action.groupId}/messages`)
        .set('x-access-token', action.token)
        .end((err, res) => {
          if (err) {
            return next({
              type: 'GET_MESSAGES_ERROR',
              message: err.message
            });
          }
          const messages = res.body;
          next({
            type: 'GET_MESSAGES_SUCCESS',
            messages
          });
        });
      break;
    case 'GET_GROUP_MEMBERS':

      request
        .get(`${url}/group/${action.groupId}/members`)
        .set('x-access-token', action.token)
        .end((err, res) => {
          if (err) {
            return next({
              type: 'GET_GROUP_MEMBERS_ERROR',
              message: err.message
            });
          }
          const members = res.body;
          next({
            type: 'GET_GROUP_MEMBERS_SUCCESS',
            data: { members, groupId: action.groupId }
          });
        });
      break;

    case 'GET_POST_IT_MEMBERS':
      request
        .get(`${url}/members`)
        .set('x-access-token', action.token)
        .end((err, res) => {
          if (err) {
            return next({
              type: 'GET_POST_IT_MEMBERS_ERROR',
              message: err.message
            });
          }
          const postItUsers = res.body;
          next({
            type: 'GET_POST_IT_MEMBERS_SUCCESS',
            postItUsers
          });
        });
      break;

    case 'GET_ALL_GROUPS':
      request
        .get(`${url}/groups`)
        .set('x-access-token', action.token)
        .end((err, res) => {
          if (err) {
            return next({
              type: 'GET_ALL_GROUPS_ERROR',
              message: err.message
            });
          }
          const postItGroups = res.body;
          next({
            type: 'GET_ALL_GROUPS_SUCCESS',
            postItGroups
          });
        });
      break;

    case 'GET_ALL_GROUPS_FOR_A_USER':
      request
        .get(`${url}/user/${action.userId}/groups`)
        .set('x-access-token', action.token)
        .end((err, res) => {
          if (err) {
            return next({
              type: 'GET_ALL_GROUPS_FOR_A_USER_ERROR',
              message: err.message
            });
          }
          const data = res.body;
          next({
            type: 'GET_ALL_GROUPS__FOR_A_USER_SUCCESS',
            data
          });
        });
      break;

    case 'DELETE_GROUP_MEMBER':
      request
        .delete(`${url}/group/${action.groupId}/members`)
        .set('x-access-token', action.token)
        .end((err, res) => {
          if (err) {
            return next({
              type: 'DELETE_GROUP_MEMBER_ERROR',
              message: err.message
            });
          }
          const data = res.body;
          next({
            type: 'DELETE_GROUP_MEMBER_SUCCESS',
            data
          });
        });
      break;

    default:
      break;
  }
};

export default dataService;
