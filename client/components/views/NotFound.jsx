import React from 'react';
import { connect } from 'react-redux';
import 'jquery';
import {
  getGroupsForUser, getAllGroupsForUser, resetErrorLog,
  getMessages, loadMessages, resetRedirect, getGroupMembers,
  getPostItMembers, createGroup, verifyToken
} from '../../actions';

// Partials
import Footer from './partials/Footer.jsx';
import NavBar from './partials/NavBar.jsx';


/**
 * React component that displays the page for creating a new group
 */
class CreateGroup extends React.Component {
  /**
   * Render method of React component
   * @returns {Object} Returns the DOM object to be rendered
   */
  render() {
    return (
      <div>
        <Body store={this.props}/>
      </div>
    );
  }
}

/**
 * React component for displaying page body
 */
class Body extends React.Component {
  /**
   * Component method called after a component renders
   * @returns {undefined} This method returns nothing
   */
  componentDidMount() {
    // Initialize side nav
    $('.button-collapse').sideNav({
      closeOnClick: true
    });
  }
  /**
   * Render method of React component
   * @returns {Object} Returns the DOM object to be rendered
   */
  render() {
    const allUserGroups = this.props.store.allUserGroups.userGroups;
    return (
      <div id="body">
        <NavBar store={this.props.store} allUserGroups={allUserGroups}/>
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
    verifyToken: token => dispatch(verifyToken(token)),
    getPostItMembers: token => dispatch(getPostItMembers(token)),
    getAllGroupsForUser: (userId, token) => dispatch(getAllGroupsForUser(userId, token)),
    getGroupMembers: (groupId, token) => dispatch(getGroupMembers(groupId, token)),
    getMessages: (groupId, token) => dispatch(getMessages(groupId, token)),
    loadMessages: groupId => dispatch(loadMessages(groupId)),
    createGroup: (creatorId, title, description, selectedMembers, token) =>
      dispatch(createGroup(creatorId, title, description, selectedMembers, token)),
    getGroupsForUser: (userId, offset, limit, token) =>
    dispatch(getGroupsForUser(userId, offset, limit, token))
  });

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroup);
