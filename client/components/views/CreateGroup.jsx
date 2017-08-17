/* eslint-env browser */
import React from 'react';
import { connect } from 'react-redux';
import 'jquery';
import jwtDecode from 'jwt-decode';
import NotificationSystem from 'react-notification-system';
import {
  getGroupsForUser, getAllGroupsForUser, resetErrorLog,
  getMessages, loadMessages, resetRedirect,
  getPostItMembers, createGroup, verifyToken,
  getGroupMembers,
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
   * Constructor initializes component parameters
   * @param {Object} props Properties passed from parent component
   */
  constructor(props) {
    super(props);
    this.switchTab = this.switchTab.bind(this);
    this.addMember = this.addMember.bind(this);
    this.createGroup = this.createGroup.bind(this);
    this.showNotification = this.showNotification.bind(this);
    this.selectedMembers = [];
    this.registeredMembers = {};
  }
  /**
   * React component method called after component render
   * @return {undefined} this method returns nothing
   */
  componentDidMount() {
    // Initialize navbar
    $('.button-collapse').sideNav({
      closeOnClick: true
    });
    // Load a default tab for the createGroup page
    try {
      $('#defaultTab')[0].click();
    } catch (e) { return false; }
    // Bind the notifications component
    this.notificationSystem = this.notificationRef;
    // Load all registered members
    const token = localStorage.getItem('token');
    const decode = jwtDecode(token);
    const userId = decode.id;
    this.props.store.getPostItMembers(token);
    this.props.store.getAllGroupsForUser(userId, token);
  }
  /**
   * React component method called before componet receives new props
   * @returns {undefined} this method returns nothing
   */
  componentWillUpdate() {
    const allUsers = this.props.store.postItInfo.members.postItMembers;
    const redirect = this.props.store.apiError.redirect;
    const errorMessage = this.props.store.apiError.message;
    this.registeredMembers = allUsers;
    if (redirect.yes) {
      // Reset state of redirect property
      this.props.store.resetRedirect();
      window.location = redirect.to;
    } else {
      if (errorMessage) {
        // Empty the array of selected members
        this.selectedMembers = [];
        this.showNotification('error', errorMessage);
        // Reset error log
        this.props.store.resetErrorLog();
      }
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
    const decode = jwtDecode(token);
    const creatorId = decode.id;
    const selectedMembers = this.selectedMembers;
    this.props.store.createGroup(creatorId, title, description, selectedMembers, token);
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
    const dataLoading = this.props.store.dataLoading;
    const allUserGroups = this.props.store.allUserGroups.userGroups;
    return (
      <div id="body">
        <NavBar store={this.props.store} allUserGroups={allUserGroups}/>
        <NotificationSystem className='notification' style={style}
          ref={(notificationRef) => { this.notificationRef = notificationRef; }} />
        <div id="main">
          <div className="tab">
            <button className="tablinks" id="defaultTab" ref="defaultTab"
              onClick={() => this.switchTab('defaultTab', 'info')}>Group info</button>
            <button className="tablinks" id="add-members" ref="add-members"
              onClick={() => this.switchTab('add-members', 'members')}>Add members</button>
          </div>
          { dataLoading ? (
              <div id="info" ref="info" className="tabcontent">
                <div className="row">
                  <div className="col s12 m8 offset-m2 offset-l3 l6">
                    <div>
                      <div className="preloader-wrapper loader big active valign-wrapper">
                        <div className="spinner-layer spinner-white-only">
                          <div className="circle-clipper left">
                          <div className="circle"></div>
                          </div>
                          <div className="gap-patch">
                          <div className="circle"></div>
                          </div>
                          <div className="circle-clipper right">
                          <div className="circle"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div id="info" ref="info" className="tabcontent">
                <div className="row">
                  <div className="col s12 m8 offset-m2 offset-l3 l6">
                    <div className="group-details">
                      <h4 className="center">Enter group details</h4>
                      <div>
                        <div>
                          <input type="text" ref={(title) => { this.title = title; }}
                            name="group-title" placeholder="Group Title" />
                        </div>
                        <div>
                          <textarea id="groupDescription"
                            ref={(description) => { this.description = description; }}
                            type="text" className="materialize-textarea" placeholder="Description"
                            name="group-desc" defaultValue={''} />
                        </div>
                      </div>
                      <button className="btn light-green darken-4"
                        onClick={() => this.switchTab('add-members', 'members')}>Next &gt;&gt;</button>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
          <div id="members" ref="members" className="tabcontent">
            <div className="row">
              <div className="col s12 m8 offset-m2 l6 offset-l3">
          { /* Load spinner while contacting server */ }
          {dataLoading ? (
          <div>
              <div>
                <div className="classListHolder">
                  <ul className="collection with-header registeredMembersList">
                    <li className="collection-header"><h4 className="center">Add members</h4></li>
                    <li className="collection-item">
                      <input id="cb1" type="checkbox" disabled />
                      <label htmlFor="cb1" className="black-text">
                        <small className="grey-text"></small></label>
                    </li>
                    <li className="collection-item">
                      <input id="cb2" type="checkbox" disabled />
                      <label htmlFor="cb2" className="black-text">
                        <small className="grey-text"></small></label>
                    </li>
                    <li className="collection-item">
                      <input id="cb3" type="checkbox" disabled />
                      <label htmlFor="cb3" className="black-text">
                        <small className="grey-text"></small></label>
                    </li>
                    <li className="collection-item">
                      <input id="cb4" type="checkbox" disabled />
                      <label htmlFor="cb4" className="black-text">
                        <small className="grey-text"></small></label>
                    </li>
                  </ul>
                  <div className="row">
                    <button className="btn col s8 offset-s2 m5 l5 light-green darken-4"
                      onClick={() => this.switchTab('defaultTab', 'info')}>&lt;&lt; Group info</button>
                    <div className="col s12 m2 s2"><br /></div>
                    <button disabled className="btn col s8 offset-s2 m5 l5 light-green darken-4">
                      Create group</button>
                  </div>
                </div>
              </div>
              <div className="userlist-preloader">
                <div className="preloader-wrapper big loader active valign-wrapper">
                  <div className="spinner-layer spinner-white-only">
                    <div className="circle-clipper left">
                    <div className="circle"></div>
                    </div>
                    <div className="gap-patch">
                    <div className="circle"></div>
                    </div>
                    <div className="circle-clipper right">
                    <div className="circle"></div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          ) : (
            <div>
              <div>
                <div className="classListHolder">
                  <ul className="collection with-header registeredMembersList">
                    <li className="collection-header"><h4 className="center">Add members</h4></li>
                    {
                      Object.keys(this.registeredMembers).map((userId, index) =>
                        <RegisteredMember addMember={this.addMember} key={index}
                        id={userId} userInfo={this.registeredMembers[userId]}/>
                      )
                    }
                  </ul>
                  <div className="row">
                    <button className="btn col s8 offset-s2 m5 l5 light-green darken-4"
                      onClick={() => this.switchTab('defaultTab', 'info')}>&lt;&lt; Group info
                    </button>
                    <div className="col s12 m2 s2"><br /></div>
                    <button onClick={this.createGroup}
                      className="btn col s8 offset-s2 m5 l5 light-green darken-4">
                      Create group
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
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
class RegisteredMember extends React.Component {
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
    const userInfo = this.props.userInfo;
    return (
      <li className="collection-item">
        <input id={this.props.userInfo.email}
          type="checkbox"
          onClick={() => this.addOrRemove(this.props.userInfo.email)}
          ref={this.props.userInfo.email} />
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
    verifyToken: token => dispatch(verifyToken(token)),
    getPostItMembers: token => dispatch(getPostItMembers(token)),
    getAllGroupsForUser: (userId, token) => dispatch(getAllGroupsForUser(userId, token)),
    getMessages: (groupId, token) => dispatch(getMessages(groupId, token)),
    loadMessages: groupId => dispatch(loadMessages(groupId)),
    getGroupMembers: (groupId, token) => dispatch(getGroupMembers(groupId, token)),
    createGroup: (creatorId, title, description, selectedMembers, token) =>
      dispatch(createGroup(creatorId, title, description, selectedMembers, token)),
    getGroupsForUser: (userId, offset, limit, token) =>
    dispatch(getGroupsForUser(userId, offset, limit, token))
  });

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroup);
