import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import userGroupsReducer from './userGroupsReducer';
import userReducer from './userReducer';
import postItInfoReducer from './postItInfoReducer';
import loadingReducer from './loading';
import authStateReducer from './authStateReducer';

const postItApp = combineReducers({
  groups: userGroupsReducer,
  apiError: errorReducer,
  dataLoading: loadingReducer,
  appInfo: combineReducers({
    userDetails: userReducer,
    authState: authStateReducer
  }),
  postItInfo: postItInfoReducer
});

export default postItApp;
