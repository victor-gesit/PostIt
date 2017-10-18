/* eslint-env browser */
import request from 'superagent';

const authMiddleware = store => next => (action) => {
  // Pass all actions through by default
  if (action.type !== 'VERIFY_TOKEN') {
    next(action);
  }
  const url = '/api';
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
          next({
            type: 'SIGN_IN_SUCCESS',
            userDetails: res.body.user
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
          next({
            type: 'SIGN_UP_SUCCESS',
            userDetails: res.body.user
          });
        });
      break;
    // Verify token
    case 'VERIFY_TOKEN':
      request
        .get('/api/token')
        .set('x-access-token', action.token)
        .end((err, res) => {
          if (err) {
            return next({
              type: 'VERIFY_TOKEN_ERROR',
            });
          }
          return next({
            type: 'VERIFY_TOKEN_SUCCESS',
            userDetails: res.body.user
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
          next({
            type: 'SIGN_IN_SUCCESS',
            userDetails: res.body.user
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
          next({
            type: 'SIGN_IN_SUCCESS',
            userDetails: res.body.user
          });
        });
      break;
    default:
      break;
  }
};

export default authMiddleware;
