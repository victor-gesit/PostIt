
/* eslint-env browser */
import React from 'react';
import 'jquery/dist/jquery';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import io from 'socket.io-client';
import {
  getGroupMembers, addUser, getMessages, loadMessages,
  resetRedirect, deleteMember, leaveGroup, getPostItMembers,
  deleteGroup, getAllGroupsForUser, resetLoadingState,
  postMessage, verifyToken, signOut, notify, seenBy
} from '../../actions';

// Partials
import NavBar from './partials/NavBar.jsx';
import GroupList from './partials/GroupList.jsx';
import Messages from './partials/Messages.jsx';
import AddMemberModal from './partials/AddMemberModal.jsx';
import MessageInputBox from './partials/MessageInputBox.jsx';
import DeleteMemberModal from './partials/DeleteMemberModal.jsx';
import LeaveGroupModal from './partials/LeaveGroupModal.jsx';
import MessageInfoModal from './partials/MessageInfoModal.jsx';

import '../../js/materialize';

const socket = io();
/**
 * React component that displays the Post Message page
 */
class PostMessage extends React.Component {
  constructor(props){
    super(props);
    const token = localStorage.getItem('token');
    let decode;
    try {
      decode = jwtDecode(token);
    } catch (err) {
      this.props.store.signOut();
    }
    const userId = decode.id;
    const groupId = this.props.match.params.groupId;
    socket.emit('open group', { groupId, userId });
  }
  /**
   * Component method called when component loads to reset state of spinner
   * and hide navbar on small screens
   * @returns {undefined} This method returns nothing
   */
  componentDidMount() {
    const matchQuery = window.matchMedia('(max-width: 992px)');
    if (matchQuery.matches) {
      $('.button-collapse').sideNav({
        closeOnClick: true
      });
    }
    $('#sidenav-overlay').trigger('click');
    this.props.resetLoadingState();
  }
  /**
   * Component method called when a user leaves the Post Message page
   * to notify the socket of the user leaving the conversation
   */
  componentWillUnmount() {
    const token = localStorage.getItem('token');
    let decode;
    let userId;
    try {
      decode = jwtDecode(token);
      userId = decode.id;
    } catch (err) {
      this.props.history.push('/');
    }
    const groupId = this.props.match.params.groupId;
    socket.emit('close group', { groupId, userId });
  }
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
 * React component that displays the body of the page
 */
class Body extends React.Component {
  /**
   * Constructor initializes component parameters
   * @param {Object} props Properties passed from parent component
   */
  constructor(props) {
    super(props);
    this.deleteMember = this.deleteMember.bind(this);
    this.deleteGroup = this.deleteGroup.bind(this);
    this.leaveGroup = this.leaveGroup.bind(this);
    this.memberIdToDelete = '';
    this.groupIdToDelete = '';
  }
  /**
   * Component method called after componetn renders to initialize modals
   * @returns {undefined} This method returns nothing
   */
  componentDidMount() {
    const token = localStorage.getItem('token');
    let decode;
    try {
      decode = jwtDecode(token);
    } catch (err) {
      this.props.store.signOut();
    }
    const userId = decode.id;
    const groupId = this.props.store.match.params.groupId;
    // Load all messages for the group
    this.props.store.getMessages(groupId, token);
    // // Load user groups
    this.props.store.getAllGroupsForUser(userId, token);
    // Load all members of the group
    this.props.store.getGroupMembers(groupId, token);

    // Initialize side nav
    $('.button-collapse').sideNav();
    /* Toggle group list*/
    $('#member-list-toggle').off().on('click', () => {
      $('#memberList').animate({ width: 'toggle' });
    });
    $('.modal').modal({
      // Handle modal dialog box
      ready: (modal, trigger) => {
        // Check if modal is for deleting group member or entire group
        if (modal[0].id === 'deleteMemberModal') {
          this.memberIdToDelete = trigger[0].id;
        } else if (modal[0].id === 'messageInfoModal') {
          const messageId = trigger[0].id;
          this.props.store.seenBy(messageId, token);
        } else {
          this.groupIdToDelete = trigger[0].id;
        }
      },
    });
    // Toggle memberList
    $(document).on('click', (e) => {
      const target = $(e.target);
      // Hide member list when a click is made outside of memberlist window or deleteMemberModal
      if (!(target.is('#member-list-toggle'))) {
        if (!target.parents('#memberList').length) {
          if (!target.parents('#deleteMemberModal').length) {
            if (!target.parents('#addMemberModal').length) {
              $('#memberList').fadeOut();
            }
          }
        }
      }
    });
  }
  /**
   * Method to delete a member from a group
   * @returns {undefined} This method returns nothing
   */
  deleteMember() {
    const token = localStorage.getItem('token');
    const decode = jwtDecode(token);
    const ownerId = decode.id;
    const idToDelete = this.memberIdToDelete;
    const groupId = this.props.store.match.params.groupId;
    // Remove user socket from group sockets list
    socket.emit('delete member', { groupId, userId: idToDelete });
    // Call the redux action to delete the member
    this.props.store.deleteMember(ownerId, idToDelete, groupId, token);
  }
  /**
   * Method to delete a group
   * @returns {undefined} This method returns nothing
   */
  deleteGroup() {
    const token = localStorage.getItem('token');
    const decode = jwtDecode(token);
    const ownerId = decode.id;
    const groupId = this.groupIdToDelete;
    socket.emit('delete group', { groupId, userId: ownerId });
    // Call redux action to delete the group
    this.props.store.deleteGroup(ownerId, groupId, token);
  }
  /**
   * Method for leaving a group
   * @returns {undefined} This method returns nothing
   */
  leaveGroup() {
    const token = localStorage.getItem('token');
    const groupId = this.groupIdToDelete;
    const decode = jwtDecode(token);
    const userId = decode.id;
    // Remove user socket from group sockets list
    socket.emit('close group', { groupId, userId });
    this.props.store.leaveGroup(token, groupId);
  }
  /**
   * Render method of React component
   * @returns {Object} Returns the DOM object to be rendered
   */
  render() {
    // Accessing a deleted group, or loading messages from a group you've been removed from
    const redirect = this.props.store.apiError.redirect;
    if (redirect.yes) {
      if (redirect.to.indexOf('postmessage') !== -1){
        // No page reloading when opening a different group
        this.props.store.resetRedirect();
      } else {
        this.props.store.history.push(redirect.to);
      }
    }
    let allUserGroups = {};
    const groupId = this.props.store.match.params.groupId;
    const groupLoaded = this.props.store.allUserGroups.userGroups[groupId];
    const token = localStorage.getItem('token');
    let decode;
    try {
      decode = jwtDecode(token);
    } catch (err) {
      this.props.store.history.push('/');
    }
    const userEmail = decode.email;
    let groupTitle, creatorEmail, isCreator;
    if (groupLoaded) {
      groupTitle = groupLoaded.info.title;
      creatorEmail = groupLoaded.info.creatorEmail;
      isCreator = creatorEmail === userEmail;
      allUserGroups = this.props.store.allUserGroups.userGroups;
    } else {
      groupTitle = 'Loading...';
    }
    return (
    <div id="body" >
      <NavBar deleteGroup={this.deleteGroup}
        isCreator={isCreator} creatorEmail={creatorEmail}
        allUserGroups={allUserGroups}
        leaveGroup={leaveGroup}
        store={this.props.store}/>
      <div id="main" >
        <div id="main-postmessage">
          <div className="memberListToggle">
            <button id="member-list-toggle"
            onClick={ () => this.props.store.getGroupMembers(groupId, token) }
            className="btn s4">Group Info</button>
          </div>
          <div className="row">
            <div className="col s12 m8 offset-m2 l8 offset-l2 messageboard">
              {/* Messages */}
              <Messages socket={socket} store={this.props.store}/>
            </div>
            {/* Side bar, visible by toggle */}
            <GroupList store={this.props.store}/>
          </div>
        </div>
        {/* Modal to handle deleting a member from a group */}
         <DeleteMemberModal deleteMember={this.deleteMember}/>
        {/* Modal to handle adding a member to a group */}
         <AddMemberModal store={this.props.store}/>
        {/* Modal to handle leaving a gorup */}
         <LeaveGroupModal leaveGroup={this.leaveGroup}/>
        {/* Message Input Box */}
        {/* Modal to display who has read a message */}
         <MessageInfoModal dataLoading={this.props.store.dataLoading}
          messageInfo={this.props.store.messageInfo}/>
      </div>
      <MessageInputBox notify={this.props.notify} socket={socket} store={this.props.store}/>
    </div>
    );
  }
}

const mapStateToProps = state =>
  ({
    apiError: state.apiError,
    dataLoading: state.dataLoading,
    groups: state.groups,
    allUserGroups: state.allUserGroups,
    appInfo: {
      userDetails: state.appInfo.userDetails,
      authState: state.appInfo.authState,
      loadedMessages: state.appInfo.loadedMessages
    },
    postItInfo: state.postItInfo,
    messageInfo: state.messageInfo
  });

const mapDispatchToProps = dispatch =>
  ({
    getAllGroupsForUser: (userId, token) => dispatch(getAllGroupsForUser(userId, token)),
    getGroupMembers: (groupId, token) => dispatch(getGroupMembers(groupId, token)),
    resetRedirect: () => dispatch(resetRedirect()),
    verifyToken: token => dispatch(verifyToken(token)),
    deleteMember: (ownerId, idToDelete, groupId, token) =>
      dispatch(deleteMember(ownerId, idToDelete, groupId, token)),
    leaveGroup: (token, groupId) => dispatch(leaveGroup(token, groupId)),
    deleteGroup: (ownerId, groupId, token) => dispatch(deleteGroup(ownerId, groupId, token)),
    getMessages: (groupId, token) => dispatch(getMessages(groupId, token)),
    loadMessages: groupId => dispatch(loadMessages(groupId)),
    getPostItMembers: token => dispatch(getPostItMembers(token)),
    addUser: (email, groupId, adderId, token) => dispatch(addUser(email, groupId, adderId, token)),
    postMessage: (senderId, groupId, body, priority, isComment, token) =>
      dispatch(postMessage(senderId, groupId, body, priority, isComment, token)),
    resetLoadingState: () => dispatch(resetLoadingState()),
    notify: (newMessage, groupId) => dispatch(notify(newMessage, groupId)),
    seenBy: (messageId, token) => dispatch(seenBy(messageId, token)),
    signOut: () => dispatch(signOut())
  });
export default connect(mapStateToProps, mapDispatchToProps)(PostMessage);
