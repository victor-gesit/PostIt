webpackHotUpdate(0,{

/***/ 152:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _superagent = __webpack_require__(312);

var _superagent2 = _interopRequireDefault(_superagent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dataService = function dataService(store) {
  return function (next) {
    return function (action) {
      // Pass all actions through by default
      next(action);
      var url = 'http://postit-api-victor.herokuapp.com/api';
      switch (action.type) {
        // Signin a user
        case 'SIGN_IN':
          _superagent2.default.post(url + '/user/signin').send({
            email: action.email,
            password: action.password
          }).end(function (err, res) {
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
            var userDetails = res.body.user;
            userDetails.token = res.body.token;
            next({
              type: 'SIGN_IN_SUCCESS',
              userDetails: userDetails
            });
          });
          break;
        // Signup a new user
        case 'SIGN_UP':
          _superagent2.default.post(url + '/user/signup').send({
            firstName: action.firstName,
            lastName: action.lastName,
            email: action.email,
            phone: action.phone,
            password: action.password
          }).end(function (err, res) {
            if (err) {
              // Ignore browser errors which do not have a res object
              if (res) {
                if (res.body.messages) {
                  // Return the first error message when there are many
                  return next({
                    type: 'SIGN_UP_ERROR',
                    message: res.body.messages[0]
                  });
                } else {
                  return next({
                    type: 'SIGN_UP_ERROR',
                    message: res.body.message
                  });
                }
              }
            }
            var userDetails = res.body.user;
            userDetails.token = res.body.token;
            next({
              type: 'SIGN_UP_SUCCESS',
              userDetails: userDetails
            });
          });
          break;
        // Post a message to a group
        case 'POST_MESSAGE':
          _superagent2.default.post(url + '/group/' + action.groupId + '/message').set('x-access-token', action.token).send({
            body: action.body,
            priority: action.priority,
            isComment: action.isComment,
            senderId: action.senderId
          }).end(function (err, res) {
            if (err) {
              return next({
                type: 'POST_MESSAGE_ERROR',
                message: err.message
              });
            }
            var message = res.body.message;
            next({
              type: 'POST_MESSAGE_SUCCESS',
              message: message,
              groupId: action.groupId
            });
          });
          break;
        // Add group members
        case 'ADD_MEMBER':
          _superagent2.default.post(url + '/group/' + action.groupId + '/user').set('x-access-token', action.token).send({
            email: action.email,
            adderId: action.adderId
          }).end(function (err, res) {
            if (err) {
              return next({
                type: 'ADD_MEMBER_ERROR',
                message: err.message
              });
            }
            var addedMembers = res.body;
            next({
              type: 'ADD_MEMBER_SUCCESS',
              addedMembers: addedMembers,
              groupId: action.groupId
            });
          });
          break;
        // Delete a group
        case 'DELETE_A_GROUP':
          _superagent2.default.delete(url + '/group/' + action.groupId + '/delete').set('x-access-token', action.token).send({
            ownerId: action.ownerId
          }).end(function (err, res) {
            if (err) {
              return next({
                type: 'DELETE_A_GROUP_ERROR',
                message: err.message
              });
            }
            var groupId = action.groupId;
            next({
              type: 'DELETE_A_GROUP_SUCCESS',
              groupId: groupId
            });
          });
          break;
        // Create a new group
        case 'CREATE_GROUP':
          _superagent2.default.post(url + '/group').set('x-access-token', action.token).send({
            creatorId: action.creatorId,
            title: action.title,
            description: action.description,
            initialMembers: action.initialMembers
          }).end(function (err, res) {
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
            var data = res.body;
            next({
              type: 'CREATE_GROUP_SUCCESS',
              data: data
            });
          });
          break;
        // Load messages from group
        case 'GET_MESSAGES':
          _superagent2.default.get(url + '/group/' + action.groupId + '/messages').set('x-access-token', action.token).end(function (err, res) {
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
                // No authentication
                if (res.status === 401) {
                  return next({
                    type: 'INVALID_AUTH'
                  });
                }
              }
              return;
            }
            var messagesDbSnapshot = res.body;
            next({
              type: 'GET_MESSAGES_SUCCESS',
              groupId: action.groupId,
              messagesDbSnapshot: messagesDbSnapshot
            });
          });
          break;
        // Get members of a group
        case 'GET_GROUP_MEMBERS':
          _superagent2.default.get(url + '/group/' + action.groupId + '/members/').set('x-access-token', action.token).end(function (err, res) {
            if (err) {
              // Ignore browser errors which do not have a res object
              if (res) {
                return next({
                  type: 'GET_GROUP_MEMBERS_ERROR',
                  message: err.message
                });
              }
            }
            var membersDBSnapshot = res.body;
            next({
              type: 'GET_GROUP_MEMBERS_SUCCESS',
              membersDBSnapshot: membersDBSnapshot,
              groupId: action.groupId
            });
          });
          break;
        // Get all users registered on PostIt
        case 'GET_POST_IT_MEMBERS':
          _superagent2.default.get(url + '/members').set('x-access-token', action.token).end(function (err, res) {
            if (err) {
              // Ignore browser errors which do not have a res object
              if (res) {
                if (res.status === 401) {
                  return next({
                    type: 'INVALID_AUTH'
                  });
                } else {
                  return next({
                    type: 'GET_POST_IT_MEMBERS_ERROR',
                    message: err.message
                  });
                }
              }
            }
            var dbSnapShot = res.body;
            next({
              type: 'GET_POST_IT_MEMBERS_SUCCESS',
              dbSnapShot: dbSnapShot
            });
          });
          break;
        // Get all groups created on PostIt
        case 'GET_ALL_GROUPS':
          _superagent2.default.get(url + '/groups/' + action.offset + '/' + action.limit).set('x-access-token', action.token).end(function (err, res) {
            if (err) {
              return next({
                type: 'GET_ALL_GROUPS_ERROR',
                message: err.message
              });
            }
            var postItGroups = res.body;
            next({
              type: 'GET_ALL_GROUPS_SUCCESS',
              postItGroups: postItGroups
            });
          });
          break;
        // Get all groups a user belongs to (paginated)
        case 'GET_ALL_GROUPS_FOR_A_USER':
          _superagent2.default.get(url + '/user/' + action.userId + '/groups/' + action.offset + '/' + action.limit).set('x-access-token', action.token).end(function (err, res) {
            if (err) {
              // Ignore browser errors
              if (res) {
                return next({
                  type: 'GET_ALL_GROUPS_FOR_A_USER_ERROR',
                  message: err.message
                });
              }
            }
            var data = res.body;
            next({
              type: 'GET_ALL_GROUPS_FOR_A_USER_SUCCESS',
              data: data
            });
          });
          break;
        // Get all groups a user belongs to (non paginated)
        case 'GET_ALL_GROUPS_FOR_A_USER_AT_ONCE':
          _superagent2.default.get(url + '/user/' + action.userId + '/groups/').set('x-access-token', action.token).end(function (err, res) {
            if (err) {
              return next({
                type: 'GET_ALL_GROUPS_FOR_A_USER_AT_ONCE_ERROR',
                message: err.message
              });
            }
            var data = res.body;
            next({
              type: 'GET_ALL_GROUPS_FOR_A_USER_AT_ONCE_SUCCESS',
              data: data
            });
          });
          break;
        // Delete a user from a group
        case 'DELETE_GROUP_MEMBER':
          _superagent2.default.delete(url + '/group/' + action.groupId + '/members').set('x-access-token', action.token).send({
            ownerId: action.ownerId,
            idToDelete: action.idToDelete
          }).end(function (err, res) {
            if (err) {
              return next({
                type: 'DELETE_GROUP_MEMBER_ERROR',
                message: err.message
              });
            }
            var deletedId = action.idToDelete;
            var groupId = action.groupId;
            next({
              type: 'DELETE_GROUP_MEMBER_SUCCESS',
              deletedId: deletedId,
              groupId: groupId
            });
          });
          break;
        // Verify token
        case 'VERIFY_TOKEN':
          _superagent2.default.get(url + '/token').set('x-access-token', action.token).end(function (err, res) {
            if (err) {
              return next({
                type: 'VERIFY_TOKEN_ERROR'
              });
            }
            next({
              type: 'VERIFY_TOKEN_SUCCESS'
            });
          });
          break;

        default:
          break;
      }
    };
  };
};

exports.default = dataService;

/***/ })

})
//# sourceMappingURL=0.ee83a48609239faf9d7d.hot-update.js.map