
/* eslint-env browser */
import React from 'react';
import 'jquery/dist/jquery';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import {
  getGroupMembers, addUser, getMessages, loadMessages,
  resetRedirect, deleteMember, leaveGroup, getPostItMembers,
  deleteGroup, getAllGroupsForUser, resetLoadingState, getGroupsForUser,
  postMessage, verifyToken, signOut, notify, seenBy, searchGroup
} from '../../actions';

// Partials
import Navbar from './partials/NavBar.jsx';
import GroupList from './partials/GroupList.jsx';
import Messages from './partials/Messages.jsx';
import AddMemberModal from './partials/AddMemberModal.jsx';
import MessageInputBox from './partials/MessageInputBox.jsx';
import DeleteMemberModal from './partials/DeleteMemberModal.jsx';
import LeaveGroupModal from './partials/LeaveGroupModal.jsx';
import MessageInfoModal from './partials/MessageInfoModal.jsx';

const socket = io();
/**
 * React component that displays the Post Message page
 */
export class PostMessage extends React.Component {
  /**
   * Component method called when a user leaves the Post Message page
   * to notify the socket of the user leaving the conversation
   * @returns {undefined} This method returns nothing
   */
  componentWillUnmount() {
    const token = localStorage.getItem('token');
    const groupId = this.props.match.params.groupId;
    socket.emit('close group', { groupId, token });
  }
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
    const token = localStorage.getItem('token');
    const groupId = this.props.match.params.groupId;
    socket.emit('open group', { groupId, token });
  }
  /**
   * Component method called after component renders to initialize modals
   * and initialize side nav
   * @returns {undefined} This method returns nothing
   */
  componentDidMount() {
    const matchQuery = window.matchMedia('(max-width: 992px)');
    if (matchQuery.matches) {
      $('.button-collapse').sideNav({
        closeOnClick: true,
        draggable: true
      });
    }
    $('#sidenav-overlay').trigger('click');
    this.props.resetLoadingState();
    const token = localStorage.getItem('token');
    const groupId = this.props.match.params.groupId;
    // Load all messages for the group
    this.props.getMessages(groupId, token);
    // // Load user groups
    this.props.getAllGroupsForUser(token);
    // Load all members of the group
    this.props.getGroupMembers(groupId, token);
    /* Toggle group list*/
    $('#member-list-toggle').off().on('click', () => {
      $('#memberList').animate({ width: 'toggle' });
    });
    if ($('.modal').modal) {
      $('.modal').modal({
        // Handle modal dialog box
        ready: (modal, trigger) => {
          // Check if modal is for deleting group member or entire group
          if (modal[0].id === 'deleteMemberModal') {
            this.memberIdToDelete = trigger[0].id;
          } else if (modal[0].id === 'messageInfoModal') {
            const messageId = trigger[0].id;
            this.props.seenBy(messageId, token);
          } else {
            this.groupIdToDelete = trigger[0].id;
          }
        },
      });
    }
    // Toggle memberList
    $(document).on('click', (e) => {
      const target = $(e.target);
      // Hide member list when a click is made outside
      // of memberlist window or deleteMemberModal
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
    const idToDelete = this.memberIdToDelete;
    const groupId = this.props.match.params.groupId;
    // Remove user socket from group sockets list
    socket.emit('delete member', { groupId, token });
    // Call the redux action to delete the member
    this.props.deleteMember(idToDelete, groupId, token);
  }
  /**
   * Method to delete a group
   * @returns {undefined} This method returns nothing
   */
  deleteGroup() {
    const token = localStorage.getItem('token');
    const groupId = this.groupIdToDelete;
    socket.emit('delete group', { groupId, token });
    // Call redux action to delete the group
    this.props.deleteGroup(groupId, token);
  }
  /**
   * Method for leaving a group
   * @returns {undefined} This method returns nothing
   */
  leaveGroup() {
    const token = localStorage.getItem('token');
    const groupId = this.groupIdToDelete;
    // Remove user socket from group sockets list
    socket.emit('close group', { groupId, token });
    this.props.leaveGroup(token, groupId);
  }
  /**
   * Render method of React component
   * @returns {Object} Returns the DOM object to be rendered
   */
  render() {
    // Accessing a deleted group, or
    // loading messages from a group you've been removed from
    const redirect = this.props.apiError.redirect;
    if (redirect.yes) {
      if (redirect.to.indexOf('postmessage') !== -1) {
        // No page reloading when opening a different group
        this.props.resetRedirect();
      } else {
        this.props.history.push(redirect.to);
      }
    }
    const allUserGroups = this.props.allUserGroups.userGroups;
    const groupId = this.props.match.params.groupId;
    const groupLoaded = this.props.allUserGroups.userGroups[groupId];
    const userEmail = this.props.appInfo.userDetails.email;
    let creatorEmail, isCreator;
    if (groupLoaded) {
      creatorEmail = groupLoaded.info.creatorEmail;
      isCreator = creatorEmail === userEmail;
    }
    return (
    <div id="body" >
      <Navbar deleteGroup={this.deleteGroup}
        isCreator={isCreator} creatorEmail={creatorEmail}
        allUserGroups={allUserGroups}
        leaveGroup={leaveGroup}
        store={this.props}
      />
      <div id="main" >
        <div id="main-postmessage">
          <div className="row">
            <div className="col s12 m8 offset-m2 l8 offset-l2 messageboard">
              {/* Messages */}
              <Messages socket={socket} store={this.props}/>
            </div>
            {/* Side bar, visible by toggle */}
            <GroupList store={this.props}/>
          </div>
        </div>
        {/* Modal to handle deleting a member from a group */}
         <DeleteMemberModal deleteMember={this.deleteMember}/>
        {/* Modal to handle adding a member to a group */}
         <AddMemberModal store={this.props}/>
        {/* Modal to handle leaving a gorup */}
         <LeaveGroupModal leaveGroup={this.leaveGroup}/>
        {/* Message Input Box */}
        {/* Modal to display who has read a message */}
        <MessageInfoModal
          dataLoading={this.props.dataLoading}
          messageInfo={this.props.messageInfo}
        />
      </div>
      <MessageInputBox
        notify={this.props.notify}
        socket={socket}
        store={this.props}
      />
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
    getAllGroupsForUser: (token, offset) =>
      dispatch(getAllGroupsForUser(token, offset)),
    getGroupsForUser: (token, offset, limit) =>
      dispatch(getGroupsForUser(token, offset, limit)),
    getGroupMembers: (groupId, token) =>
      dispatch(getGroupMembers(groupId, token)),
    resetRedirect: () => dispatch(resetRedirect()),
    verifyToken: token => dispatch(verifyToken(token)),
    deleteMember: (idToDelete, groupId, token) =>
      dispatch(deleteMember(idToDelete, groupId, token)),
    leaveGroup: (token, groupId) => dispatch(leaveGroup(token, groupId)),
    deleteGroup: (groupId, token) =>
      dispatch(deleteGroup(groupId, token)),
    getMessages: (groupId, token) => dispatch(getMessages(groupId, token)),
    loadMessages: groupId => dispatch(loadMessages(groupId)),
    getPostItMembers: (token, offset) =>
      dispatch(getPostItMembers(token, offset)),
    searchGroup: (token, groupId, searchQuery, offset, limit) =>
      dispatch(searchGroup(token, groupId, searchQuery, offset, limit)),
    addUser: (email, groupId, token) =>
      dispatch(addUser(email, groupId, token)),
    postMessage: (groupId, body, priority, isComment, token) =>
      dispatch(postMessage(groupId, body,
        priority, isComment, token)),
    resetLoadingState: () => dispatch(resetLoadingState()),
    notify: (newMessage, groupId) => dispatch(notify(newMessage, groupId)),
    seenBy: (messageId, token) => dispatch(seenBy(messageId, token)),
    signOut: () => dispatch(signOut())
  });
export default connect(mapStateToProps, mapDispatchToProps)(PostMessage);
