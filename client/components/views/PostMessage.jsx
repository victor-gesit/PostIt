/* eslint-env browser */
import React from 'react';
import 'jquery/dist/jquery';
import { connect } from 'react-redux';
import {
  getGroupMembers, addUser, getMessages, loadMessages,
  resetRedirect, deleteMember, getPostItMembers,
  deleteGroup, getAllGroupsForUser, postMessage, verifyToken
} from '../../actions';

// Partials
import NavBar from './partials/NavBar.jsx';
import GroupList from './partials/GroupList.jsx';
import Messages from './partials/Messages.jsx';
import AddMemberModal from './partials/AddMemberModal.jsx';
import MessageInputBox from './partials/MessageInputBox.jsx';
import MemberDeleteModal from './partials/MemberDeleteModal.jsx';
import '../../js/materialize';

/**
 * React component that displays the Post Message page
 */
class PostMessage extends React.Component {
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
    this.memberIdToDelete = '';
    this.groupIdToDelete = '';
  }
  /**
   * Component method called after componetn renders to initialize modals
   * @returns {undefined} This method returns nothing
   */
  componentDidMount() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const groupId = localStorage.getItem('groupId');
    // Load all messages for the group
    this.props.store.getMessages(groupId, token);
    // Load user groups
    this.props.store.getAllGroupsForUser(userId, token);
    // Load all members of the group
    this.props.store.getGroupMembers(groupId, token);

    /* Toggle group list*/
    $('.button-collapse').sideNav();
    $('#member-list-toggle').off().on('click', () => {
      $('#memberList').animate({ width: 'toggle' });
    });
    $('.modal').modal({
      // Handle modal dialog box
      ready: (modal, trigger) => {
        // Check if modal is for deleting group member or entire group
        if (modal[0].id === 'deleteMemberModal') {
          this.memberIdToDelete = trigger[0].id;
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
    const ownerId = localStorage.getItem('userId');
    const idToDelete = this.memberIdToDelete;
    const groupId = localStorage.getItem('groupId');
    // Call the redux action to delete the member
    this.props.store.deleteMember(ownerId, idToDelete, groupId, token);
  }
  /**
   * Method to delete a group
   * @returns {undefined} This method returns nothing
   */
  deleteGroup() {
    const token = localStorage.getItem('token');
    const ownerId = localStorage.getItem('userId');
    const groupId = this.groupIdToDelete;
    // Call redux action to delete the group
    this.props.store.deleteGroup(ownerId, groupId, token);
  }
  /**
   * Render method of React component
   * @returns {Object} Returns the DOM object to be rendered
   */
  render() {
    // Accessing a deleted group, or loading messages from a group you've been removed from
    const redirect = this.props.store.apiError.redirect;
    if (redirect.yes) {
      if (redirect.to === '/postmessage'){
        // No page reloading when opening a different group
        this.props.store.resetRedirect();
      } else {
        window.location = redirect.to;
      }
    }
    let allUserGroups = {};
    const groupId = localStorage.getItem('groupId');
    const groupLoaded = this.props.store.allUserGroups.userGroups[groupId];
    let groupTitle;
    if (groupLoaded) {
      groupTitle = groupLoaded.info.title;
      allUserGroups = this.props.store.allUserGroups.userGroups;
    } else {
      groupTitle = 'Loading...';
    }
    return (
    <div id="body" >
      <NavBar deleteGroup={this.deleteGroup} allUserGroups={allUserGroups}
        store={this.props.store}/>
      <div id="main" >
        <div id="main-postmessage">
          <div className="memberListToggle">
            <button id="member-list-toggle" className="btn s4">Group Info</button>
          </div>
          <div className="row">
            <div className="col s12 m8 offset-m2 l8 offset-l2 messageboard">
              {/* Messages */}
              <Messages store={this.props.store}/>
            </div>
            {/* Side bar, visible by toggle */}
            <GroupList store={this.props.store}/>
          </div>
        </div>
        {/* Modal to handle deleting a member from a group */}
         <MemberDeleteModal deleteMember={this.deleteMember}/>
        {/* Modal to handle adding a member to a group */}
         <AddMemberModal store={this.props.store}/>
        {/* Message Input Box */}
      </div>
      <MessageInputBox store={this.props.store}/>
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
    postItInfo: state.postItInfo
  });

const mapDispatchToProps = dispatch =>
  ({
    getAllGroupsForUser: (userId, token) => dispatch(getAllGroupsForUser(userId, token)),
    getGroupMembers: (groupId, token) => dispatch(getGroupMembers(groupId, token)),
    resetRedirect: () => dispatch(resetRedirect()),
    verifyToken: token => dispatch(verifyToken(token)),
    deleteMember: (ownerId, idToDelete, groupId, token) =>
      dispatch(deleteMember(ownerId, idToDelete, groupId, token)),
    deleteGroup: (ownerId, groupId, token) => dispatch(deleteGroup(ownerId, groupId, token)),
    getMessages: (groupId, token) => dispatch(getMessages(groupId, token)),
    loadMessages: () => dispatch(loadMessages()),
    getPostItMembers: token => dispatch(getPostItMembers(token)),
    addUser: (email, groupId, adderId, token) => dispatch(addUser(email, groupId, adderId, token)),
    postMessage: (senderId, groupId, body, priority, isComment, token) =>
      dispatch(postMessage(senderId, groupId, body, priority, isComment, token))
  });
export default connect(mapStateToProps, mapDispatchToProps)(PostMessage);
