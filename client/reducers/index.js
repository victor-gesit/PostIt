import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import userGroupsReducer from './userGroupsReducer';
import userReducer from './userReducer';
import postItInfoReducer from './postItInfoReducer';
import loadingReducer from './loading';
import authStateReducer from './authStateReducer';
import allUserGroupsReducer from './allUserGroupsReducer';
import loadedMessagesReducer from './loadedMessagesReducer';
import messageInfoReducer from './messageInfoReducer';

const postItApp = combineReducers({
  groups: userGroupsReducer,
  allUserGroups: allUserGroupsReducer,
  apiError: errorReducer,
  dataLoading: loadingReducer,
  messageInfo: messageInfoReducer,
  appInfo: combineReducers({
    userDetails: userReducer,
    authState: authStateReducer,
    loadedMessages: loadedMessagesReducer
  }),
  postItInfo: postItInfoReducer
});

export default postItApp;
