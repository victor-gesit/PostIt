/* eslint-env browser */
import React from 'react';
import { connect } from 'react-redux';
import 'jquery';
import NotificationSystem from 'react-notification-system';
import {
  getGroupsForUser, getAllGroupsForUser, resetErrorLog,
  getMessages, loadMessages, resetRedirect, resetLoadingState,
  getPostItMembers, createGroup, verifyToken, signOut,
  getGroupMembers,
} from '../../actions';

// Partials
import Footer from './partials/Footer.jsx';
import Navbar from './partials/NavBar.jsx';


/**
 * React component that displays the page for creating a new group
 */
export class CreateGroup extends React.Component {
  /**
   * Constructor initializes component parameters
   * @param {Object} props Properties passed from parent component
   */
  constructor(props) {
    super(props);
    this.switchTab = this.switchTab.bind(this);
    this.addMember = this.addMember.bind(this);
    this.createGroup = this.createGroup.bind(this);
    this.showNotification = this.showNotification.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.enterText = this.enterText.bind(this);
    this.selectedMembers = [];
    this.registeredMembers = {};
    this.membersCount = 0;
    this.state = {
      enableButton: false
    };
  }
  /**
   * Component method called before component mounts
   * to make API calls that update state
   * @returns {undefined} This method returns nothing
   */
  componentWillMount() {
    // Load all registered members
    const token = localStorage.getItem('token');
    this.props.getPostItMembers(token);
    this.props.getGroupsForUser(token);
  }
  /**
   * React component method called after component render
   * @return {undefined} this method returns nothing
   */
  componentDidMount() {
    // Initialize navbar
    $('.button-collapse').sideNav({
      closeOnClick: true,
      draggable: true
    });
    $('#sidenav-overlay').trigger('click');
    // Load a default tab for the createGroup page
    try {
      $('#defaultTab')[0].click();
    } catch (e) {}
    // Bind the notifications component
    this.notificationSystem = this.notificationRef;
  }
  /**
   * React component method called before componet receives new props
   * @returns {undefined} this method returns nothing
   */
  componentDidUpdate() {
    const allUsers = this.props.postItInfo.members.postItMembers;
    this.membersCount = this.props.postItInfo.members.meta.count;
    this.allLoaded = this.props.postItInfo.members.meta.allLoaded;
    this.previousOffset = this.props.postItInfo.members.meta.previousOffset;
    const redirect = this.props.apiError.redirect;
    const errorMessage = this.props.apiError.message;
    this.registeredMembers = allUsers;
    if (redirect.yes) {
      // Reset state of redirect property
      this.props.resetRedirect();
      // this.props.history.push(redirect.to);
      window.location = redirect.to;
    }
    if (!redirect.yes && errorMessage) {
      // Empty the array of selected members
      this.selectedMembers = [];
      this.showNotification('error', errorMessage);
      // Reset error log
      this.props.resetErrorLog();
    }
  }
  /**
   * Method to display notifications
   * @param {String} level the severity of the notification
   * @param {String} message the message to be diplayed
   * @return {undefined} this method returns nothing
   */
  showNotification(level, message) {
    this.notificationSystem.addNotification({
      message,
      level
    });
  }
  /**
   * Method for sending new group details to the api
   * @returns {undefined} This method returns nothing
   */
  createGroup() {
    const title = this.title.value;
    const description = this.description.value;
    const token = localStorage.getItem('token');
    const selectedMembers = this.selectedMembers;
    this.props.createGroup(title, description,
      selectedMembers, token);
  }
  /**
   * This method handles switching tabs in this react component
   * @param {String} button The button that was clicked
   * @param {String} tabName The div for the selected tab
   * @returns {undefined} This method returns nothing
   */
  switchTab(button, tabName) {
    const tabcontent = document.getElementsByClassName('tabcontent');
    for (let i = 0; i < tabcontent.length; i += 1) {
      tabcontent[i].style.display = 'none';
    }
    const tablinks = document.getElementsByClassName('tablinks');
    for (let i = 0; i < tablinks.length; i += 1) {
      tablinks[i].className = tablinks[i].className.replace(' active', '');
    }
    this.refs[tabName].style.display = 'block';
    this.refs[button].className += ' active';
  }
  /**
   * Method to add a member to the list of selected members
   * @param {Boolean} selected indicates if a member was selected or deselected
   * @param {String} memberEmail Email of member to be added
   * @returns {undefined} this method returns nothing
   */
  addMember(selected, memberEmail) {
    if (selected) {
      // Add member
      this.selectedMembers.push(memberEmail);
    } else {
      // Remove member if added earlier
      const index = this.selectedMembers.indexOf(memberEmail);
      this.selectedMembers.splice(index, 1);
    }
  }
  /**
   * Method to load more users from the DB, to be added to a newly created group
   * @returns {undefined} This method returns nothing
   */
  loadMore() {
    // Load all registered members
    const token = localStorage.getItem('token');
    const allLoaded = this.props.postItInfo.members.meta.allLoaded;
    this.props.getPostItMembers(token, allLoaded);
  }
  /**
   * Handle when a user types input
   * @returns {undefined} This method returns nothing
   */
  enterText() {
    const enableButton =
      this.title.value.length > 0 &&
      this.description.value.length > 3;
    this.setState({ enableButton });
  }
  /**
   * Render method of React component
   * @returns {Object} Returns the DOM object to be rendered
   */
  render() {
    const style = {
      NotificationItem: {
        DefaultStyle: {
          margin: '100px 5px 2px 1px',
          position: 'fixed',
          width: '320px'
        },
        success: {
          color: 'red'
        }
      }
    };
    const postItMembers = this.props.postItInfo.members.postItMembers;
    const membersCount = this.props.postItInfo.members.meta.count;
    const allLoaded = Object.keys(postItMembers).length;
    const allUserGroups = this.props.allUserGroups.userGroups;
    return (
      <div id="body">
        <Navbar
          store={this.props}
          allUserGroups={allUserGroups}
        />
        <NotificationSystem
          className='notification'
          style={style}
          ref={
            (notificationRef) => { this.notificationRef = notificationRef; }}
        />
        <div id="main">
          <div className="tab">
            <button className="tablinks" id="defaultTab" ref="defaultTab"
              onClick={() => this.switchTab('defaultTab', 'info')}>
              Group info
            </button>
            <button className="tablinks" id="add-members" ref="add-members"
              disabled={!this.state.enableButton}
              onClick={() => this.switchTab('add-members', 'members')}>
                Add members
              </button>
          </div>

              <div id="info" ref="info" className="tabcontent">
                <div className="row">
                  <div className="col s12 m8 offset-m2 offset-l3 l6">
                    <div className="group-details">
                      <h4 className="center">Enter group details</h4>
                      <div>
                        <div>
                          <input type="text"
                            ref={(title) => { this.title = title; }}
                            onKeyUp={this.enterText}
                            name="group-title" placeholder="Group Title" />
                        </div>
                        <div>
                          <textarea id="groupDescription"
                            ref={(description) => { this.description = description; }}
                            onKeyUp={this.enterText}
                            type="text"
                            className="materialize-textarea"
                            placeholder="Description"
                            name="group-desc" defaultValue={''} />
                        </div>
                      </div>
                      <button className="btn light-green darken-4"
                        disabled={!this.state.enableButton}
                        onClick={() => this.switchTab('add-members', 'members')}>
                          Next &gt;&gt;
                      </button>
                    </div>
                  </div>
                </div>
              </div>

          <div id="members" ref="members" className="tabcontent">
            <div className="row">
              <div className="col s12 m8 offset-m2 l6 offset-l3">
            <div>
              <div>
                <div className="classListHolder">
                  <ul className="collection with-header registeredMembersList">
                    <li className="collection-header"><h4 className="center">
                      Add members</h4></li>
                    {
                      Object.keys(postItMembers).map((userId, index) =>
                        <RegisteredMember
                          store={this.props}
                          addMember={this.addMember}
                          key={index}
                          id={userId}
                          userInfo={postItMembers[userId]}
                        />
                      )
                    }
                    {
                      allLoaded < membersCount ? (
                        <div className="center">
                        <button className="btn"
                          id="loadMoreButton"
                          onClick={ () => this.loadMore()}>...Load More</button>
                        </div>
                      ) : (
                        <div/>
                      )
                    }
                  </ul>
                <div className="row">
                  <button
                    className="btn col s8 offset-s2 m5 l5 light-green darken-4"
                    onClick={() => this.switchTab('defaultTab', 'info')}>
                    &lt;&lt; Group info
                  </button>
                  <div className="col s12 m2 s2"><br /></div>
                  <button onClick={this.createGroup}
                    id="createGroupButton"
                    className="btn col s8 offset-s2 m5 l5 light-green darken-4">
                    Create group
                  </button>
                </div>
                </div>
              </div>
            </div>
              </div>
            </div>
          </div>

        </div>
        <Footer/>
      </div>
    );
  }
}

/**
 *  Component to contain a member loaded from the database
 */
export class RegisteredMember extends React.Component {
  /**
   * @param {Object} props component props passed from parent component
   */
  constructor(props) {
    super(props);
    this.selected = false;
    this.addOrRemove = this.addOrRemove.bind(this);
  }
  /**
   * Method to add a member to a group
   * @param {String} email Email of member to be added
   * @returns {undefined} This method returns nothing
   */
  addOrRemove(email) {
    this.selected = !this.selected;
    this.props.addMember(this.selected, email);
  }
  /**
   * Render method of React component
   * @returns {Object} Returns the DOM object to be rendered
   */
  render() {
    const userId = this.props.store.appInfo.userDetails.id;
    const userInfo = this.props.userInfo;
    return (
      <li className="collection-item">
        {
          userId === userInfo.id ? (
          <input id={this.props.userInfo.email}
            type="checkbox"
            checked
            disabled
            ref={this.props.userInfo.email} />
          ) : (
          <input id={this.props.userInfo.email}
            type="checkbox"
            onClick={() => this.addOrRemove(this.props.userInfo.email)}
            ref={this.props.userInfo.email} />
          )
        }
        <label className="brown-text" htmlFor={this.props.userInfo.email}>
          {userInfo.firstName} {userInfo.lastName}
          <small className="red-text"> { this.props.userInfo.email }</small>
        </label>
      </li>
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
    getPostItMembers: (token, offset, limit) =>
      dispatch(getPostItMembers(token, offset, limit)),
    getAllGroupsForUser: (token, offset) =>
      dispatch(getAllGroupsForUser(token, offset)),
    getMessages: (groupId, token) => dispatch(getMessages(groupId, token)),
    loadMessages: groupId => dispatch(loadMessages(groupId)),
    getGroupMembers: (groupId, token) =>
      dispatch(getGroupMembers(groupId, token)),
    createGroup: (title, description, selectedMembers, token) =>
      dispatch(createGroup(title,
        description, selectedMembers, token)),
    getGroupsForUser: (token, offset, limit) =>
      dispatch(getGroupsForUser(token, offset, limit)),
    signOut: () => dispatch(signOut())
  });

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroup);
