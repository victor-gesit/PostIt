import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import userGroupsReducer from './userGroupsReducer';
import userReducer from './userReducer';
import postItInfoReducer from './postItInfoReducer';
import loadingReducer from './loading';
import authStateReducer from './authStateReducer';
import allUserGroupsReducer from './allUserGroupsReducer';
import loadedChatReducer from './loadedChatReducer';

const postItApp = combineReducers({
  groups: userGroupsReducer,
  allUserGroups: allUserGroupsReducer,
  apiError: errorReducer,
  dataLoading: loadingReducer,
  appInfo: combineReducers({
    userDetails: userReducer,
    authState: authStateReducer,
    loadedChat: loadedChatReducer
  }),
  postItInfo: postItInfoReducer
});

export default postItApp;
