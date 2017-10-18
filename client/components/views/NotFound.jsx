import React from 'react';
import { connect } from 'react-redux';
import 'jquery';
import {
  getGroupsForUser, getAllGroupsForUser, resetErrorLog,
  getMessages, loadMessages, resetRedirect, getGroupMembers,
  getPostItMembers, createGroup, verifyToken, signOut,
  resetLoadingState
} from '../../actions';

// Partials
import Footer from './partials/Footer.jsx';
import Navbar from './partials/NavBar.jsx';


/**
 * React component that displays the page for creating a new group
 */
export class NotFound extends React.Component {
  /**
   * Component method called when component loads to reset state of spinner
   * @returns {undefined} This method returns nothing
   */
  componentDidMount() {
    this.props.resetLoadingState();
      // Initialize navbar
    $('.button-collapse').sideNav({
      closeOnClick: true,
      draggable: true
    });
  }
  /**
   * Render method of React component
   * @returns {Object} Returns the DOM object to be rendered
   */
  render() {
    const allUserGroups = this.props.allUserGroups.userGroups;
    return (
      <div id="body">
        <Navbar store={this.props} allUserGroups={allUserGroups}/>
          <h3 id="main" className="grey-text center">Page not found</h3>
        <Footer/>
      </div>
    );
  }
}


const mapStateToProps = state => (
  {
    apiError: state.apiError,
    dataLoading: state.dataLoading,
    groups: state.groups,
    allUserGroups: state.allUserGroups,
    appInfo: {
      userDetails: state.appInfo.userDetails,
      authState: state.appInfo.authState,
      loadedMessages: state.appInfo.loadedMessages
    },
    postItInfo: state.postItInfo
  }
);


const mapDispatchToProps = dispatch =>
  ({
    resetErrorLog: () => dispatch(resetErrorLog()),
    resetRedirect: () => dispatch(resetRedirect()),
    resetLoadingState: () => dispatch(resetLoadingState()),
    verifyToken: token => dispatch(verifyToken(token)),
    getPostItMembers: token => dispatch(getPostItMembers(token)),
    getAllGroupsForUser: (token, offset) =>
      dispatch(getAllGroupsForUser(token, offset)),
    getGroupMembers: (groupId, token) =>
      dispatch(getGroupMembers(groupId, token)),
    getMessages: (groupId, token) => dispatch(getMessages(groupId, token)),
    loadMessages: groupId => dispatch(loadMessages(groupId)),
    createGroup: (creatorId, title, description, selectedMembers, token) =>
      dispatch(createGroup(creatorId, title, description,
        selectedMembers, token)),
    getGroupsForUser: (token, offset, limit) =>
    dispatch(getGroupsForUser(token, offset, limit)),
    signOut: () => dispatch(signOut())
  });

export default connect(mapStateToProps, mapDispatchToProps)(NotFound);
