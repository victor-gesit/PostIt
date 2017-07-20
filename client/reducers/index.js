import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import userGroupsReducer from './userGroupsReducer';
import userReducer from './userReducer';
import appInfoReducer from './appInfoReducer';
import loadingReducer from './loading';

const postItApp = combineReducers({
  groups: userGroupsReducer,
  dataError: errorReducer,
  userDetails: userReducer,
  allPostItUsers: appInfoReducer,
  allPostItGroups: appInfoReducer,
  dataLoading: loadingReducer
});

export default postItApp;
