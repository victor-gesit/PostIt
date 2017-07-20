import request from 'superagent';

const dataService = store => next => (action) => {
  /*
  Pass all actions through by default
  */
  next(action);
  switch (action.type) {
    case 'POST_MESSAGE':
      /*
      In case we receive an action to send an API request, send the appropriate request
      */
      request.post(`https://posit-api-victor/api/group/${action.groupId}/message`)
        .set('x-access-token', action.token)
        .send({
          message: action.message,
          priority: action.priority,
          isComment: action.isComment,
          senderId: action.senderId
        })
        .end((err, res) => {
          if (err) {
            /*
            in case there is any error, dispatch an action containing the error
            */
            return next({
              type: 'POST_MESSAGE_ERROR',
              err
            });
          }
          const data = JSON.parse(res.text);
          /*
          Once data is received, dispatch an action telling the application
          that data was received successfully, along with the parsed data
          */
          next({
            type: 'POST_MESSAGE_SUCCESS',
            data
          });
        });
      break;
    case 'ADD_MEMBER':
      /*
      In case we receive an action to send an API request, send the appropriate request
      */
      request.post(`https://posit-api-victor/api/group/${action.groupId}/user`)
        .set('x-access-token', action.token)
        .send({
          email: action.email,
          adderId: action.adderId,
        })
        .end((err, res) => {
          if (err) {
            /*
            in case there is any error, dispatch an action containing the error
            */
            return next({
              type: 'ADD_MEMBER_SUCCESS',
              err
            });
          }
          const data = JSON.parse(res.text);
          /*
          Once data is received, dispatch an action telling the application
          that data was received successfully, along with the parsed data
          */
          next({
            type: 'ADD_MEMBER_ERROR',
            data
          });
        });
      break;
    case 'DELETE_A_GROUP':
      /*
      In case we receive an action to send an API request, send the appropriate request
      */
      request
        .delete(`https://posit-api-victor/api/group/${action.groupId}/delete`)
        .end((err, res) => {
          if (err) {
            /*
            in case there is any error, dispatch an action containing the error
            */
            return next({
              type: 'DELETE_A_GROUP_ERROR',
              err
            });
          }
          const data = JSON.parse(res.text);
          /*
          Once data is received, dispatch an action telling the application
          that data was received successfully, along with the parsed data
          */
          next({
            type: 'DELETE_A_GROUP_SUCCESS',
            data
          });
        });
      break;
    case 'CREATE_GROUP':
      /*
      In case we receive an action to send an API request, send the appropriate request
      */
      request.post('https://posit-api-victor/api/group')
        .set('x-access-token', action.token)
        .send({
          userId: action.email,
          title: action.adderId,
          description: action.description,
          initialMembers: action.initialMembers
        })
        .end((err, res) => {
          if (err) {
            /*
            in case there is any error, dispatch an action containing the error
            */
            return next({
              type: 'CREATE_GROUP_ERROR',
              err
            });
          }
          const data = JSON.parse(res.text);
          /*
          Once data is received, dispatch an action telling the application
          that data was received successfully, along with the parsed data
          */
          next({
            type: 'CREATE_GROUP_SUCCESS',
            data
          });
        });
      break;
    case 'GET_MESSAGES':
      /*
      In case we receive an action to send an API request, send the appropriate request
      */
      request
        .get(`https://posit-api-victor/api/group/${action.groupId}/messages`)
        .set('x-access-token', action.token)
        .end((err, res) => {
          if (err) {
            /*
            in case there is any error, dispatch an action containing the error
            */
            return next({
              type: 'GET_MESSAGES_ERROR',
              err
            });
          }
          const data = JSON.parse(res.text);
          /*
          Once data is received, dispatch an action telling the application
          that data was received successfully, along with the parsed data
          */
          next({
            type: 'GET_MESSAGES_SUCCESS',
            data
          });
        });
      break;
    case 'GET_GROUP_MEMBERS':
      /*
      In case we receive an action to send an API request, send the appropriate request
      */
      request
        .get(`https://posit-api-victor/api/group/${groupId}/members`)
        .set('x-access-token', action.token)
        .end((err, res) => {
          if (err) {
            /*
            in case there is any error, dispatch an action containing the error
            */
            return next({
              type: 'GET_GROUP_MEMBERS_ERROR',
              err
            });
          }
          const members = JSON.parse(res.text);
          /*
          Once data is received, dispatch an action telling the application
          that data was received successfully, along with the parsed data
          */
          next({
            type: 'GET_GROUP_MEMBERS_SUCCESS',
            data: { members, groupId: action.groupId }
          });
        });
      break;
    case 'GET_POST_IT_MEMBERS':
      /*
      In case we receive an action to send an API request, send the appropriate request
      */
      request
        .get('https://posit-api-victor/api/members')
        .set('x-access-token', action.token)
        .end((err, res) => {
          if (err) {
            /*
            in case there is any error, dispatch an action containing the error
            */
            return next({
              type: 'GET_POST_IT_MEMBERS_ERROR',
              err
            });
          }
          const data = JSON.parse(res.text);
          /*
          Once data is received, dispatch an action telling the application
          that data was received successfully, along with the parsed data
          */
          next({
            type: 'GET_POST_IT_MEMBERS_SUCCESS',
            data
          });
        });
      break;
    case 'GET_ALL_GROUPS':
      /*
      In case we receive an action to send an API request, send the appropriate request
      */
      request
        .get('https://posit-api-victor/api/groups')
        .set('x-access-token', action.token)
        .end((err, res) => {
          if (err) {
            /*
            in case there is any error, dispatch an action containing the error
            */
            return next({
              type: 'GET_ALL_GROUPS_ERROR',
              err
            });
          }
          const data = JSON.parse(res.text);
          /*
          Once data is received, dispatch an action telling the application
          that data was received successfully, along with the parsed data
          */
          next({
            type: 'GET_ALL_GROUPS_SUCCESS',
            data
          });
        });
      break;
    case 'GET_ALL_GROUPS_FOR_A_USER':
      /*
      In case we receive an action to send an API request, send the appropriate request
      */
      request
        .get(`https://posit-api-victor/api/user/${action.userId}/groups`)
        .set('x-access-token', action.token)
        .end((err, res) => {
          if (err) {
            /*
            in case there is any error, dispatch an action containing the error
            */
            return next({
              type: 'GET_ALL_GROUPS_FOR_A_USER_ERROR',
              err
            });
          }
          const data = JSON.parse(res.text);
          /*
          Once data is received, dispatch an action telling the application
          that data was received successfully, along with the parsed data
          */
          next({
            type: 'GET_ALL_GROUPS__FOR_A_USER_SUCCESS',
            data
          });
        });
      break;
    case 'DELETE_GROUP_MEMBER':
      /*
      In case we receive an action to send an API request, send the appropriate request
      */
      request
        .delete(`https://posit-api-victor/api/group/${action.groupId}/members`)
        .set('x-access-token', action.token)
        .end((err, res) => {
          if (err) {
            /*
            in case there is any error, dispatch an action containing the error
            */
            return next({
              type: 'DELETE_GROUP_MEMBER_ERROR',
              err
            });
          }
          const data = JSON.parse(res.text);
          /*
          Once data is received, dispatch an action telling the application
          that data was received successfully, along with the parsed data
          */
          next({
            type: 'DELETE_GROUP_MEMBER_SUCCESS',
            data
          });
        });
      break;
    /*
    Do nothing if the action does not interest us
    */
    default:
      break;
  }
};

export default dataService;
