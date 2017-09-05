/* eslint-env browser */
import React from 'react';
import jwtDecode from 'jwt-decode';
import { Link } from 'react-router-dom';
import ReactToolTip from 'react-tooltip';
import Groups from './Groups.jsx';
import GroupDeleteModal from './GroupDeleteModal.jsx';
import AboutPostitModal from './AboutPostitModal.jsx';
/**
 * React component to display the navbar
 */
export default class NavBar extends React.Component {
  /**
   * 
   * @param {Object} props component properties passed from parent component
   */
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
  }
  /**
   * Sign out a user by deleting token from local storage
   * @returns {undefined} This method returns nothing
   */
  signOut() {
    localStorage.removeItem('token');
    this.props.store.signOut();
    this.props.store.history.push('/');
  }
  /**
   * Render method of React component
   * @returns {Object} Returns the DOM object to be rendered
   */
  render() {
    const groupId = this.props.store.match.params.groupId;
    const isCreator = this.props.isCreator;
    const token = localStorage.getItem('token');
    let decode;
    try {
      decode = jwtDecode(token);
    } catch (err) {
      this.props.store.history.push('/');
    }
    const userDetails = decode;
    const allUserGroups = this.props.allUserGroups;
    const path = this.props.store.match.path;
    let modalText = 'Leave Group';
    let modalHREF = '#leaveGroupModal';
    let sideNavClass = 'side-nav';
    if (path === '/postmessage/:groupId') {
      sideNavClass = 'side-nav fixed';
    }
    if (isCreator) {
      modalText = 'Delete Group';
      modalHREF = '#deleteGroupModal';
    }
    return (
      <div className="navbar-fixed">
        <ReactToolTip/>
        <nav className="pink darken-4">
          <div className="nav-wrapper">
            <a id="brand" className="brand-logo left">PostIt</a>
            <a data-activates="mobile-demo" data-hover="true"
              className="button-collapse show-on-large">
              <i id="sideNavIcon" className="material-icons">menu</i></a>
            <ul className="right">
              {
                path === '/postmessage/:groupId' ? (
                  <li>
                      <a
                      onClick={ () => this.props.store.getGroupMembers(groupId, token) }
                      ><i id="member-list-toggle" data-tip="Group info"
                      className="material-icons">info_outline</i></a>
                  </li>
                ) : (
                  <li></li>
                )
              }
              {/* Link to messageboard shouldn't be visible on messageboard page */}
              {
                path === '/messageboard' ? (
              <li>
              </li>
                ) : (
                <li>
                      <Link to="/messageboard">
                        <i data-tip="Message Board"className="material-icons">view_module</i>
                      </Link>
                </li>
                )
              }
              <li>
                    <Link to="/creategroup">
                      <i data-tip='Create group' className="material-icons">library_add</i>
                    </Link>
              </li>
            </ul>
            {/* Side Nav */}
            <ul id="mobile-demo" className={sideNavClass}>
              {
                path === '/postmessage/:groupId' ? (
                <li>
                  <div className="user-details">
                    <div className="background">
                      {/* Overlay navbar background color on sidenav */}
                      <div id="emptySpace" className="pink darken-4">
                        <div className="brand-logo">PostIt</div>
                      </div>
                      <img id="sideNavImage" src="images/fire2.png" />
                    </div>
                  </div>
                  <ul className="collection">
                    <li className="collection-item avatar black-text">
                      <i className="material-icons purple circle">person</i>
                      <span className="title black-text">
                        {userDetails.firstName} {userDetails.lastName}</span>
                      <p>{userDetails.email}<br />{userDetails.phone}</p>
                    </li>
                  </ul>
                </li>
                ) : (
                <li>
                  <div className="user-details">
                    <div className="background">
                      <img id="sideNavImage" src="images/fire2.png" />
                    </div>
                  </div>
                  <ul className="collection">
                    <li className="collection-item avatar black-text">
                      <i className="material-icons purple circle">person</i>
                      <span className="title black-text">
                        {userDetails.firstName} {userDetails.lastName}</span>
                      <p>{userDetails.email}<br />{userDetails.phone}</p>
                    </li>
                  </ul>
                </li>
                )
              }
              {
                path === '/postmessage/:groupId' ? (
                  <li><a href={modalHREF} id={groupId}>
                    <i className="large material-icons red-text">
                    texture</i>{modalText}</a></li>
                ) : (
                  path === '/#/creategroup' ? (
                    <li><a><i className="large material-icons green-text">library_add</i>
                    Create New Group</a></li>
                  ) : (
                    <li><Link to='/creategroup'>
                    <i className="large material-icons green-text">library_add</i>
                    Create New Group</Link></li>
                  )
                )
              }
              <hr />
              <div className="row searchbox valign-wrapper">
                <div className="col s9">
                  <input type="search" placeholder="Find a group" className="white-text" />
                </div>
                <div className="col s3">
                  <span><i className="material-icons black-text">search</i></span>
                </div>
              </div>
              <li id="allGroups" className="pink darken-4"><a id="allGroups" className="white-text"><i className="large material-icons white-text">texture</i>All Groups</a></li>
              {/* Groups a user belongs to */}
              <Groups store={this.props.store} allUserGroups={allUserGroups}/>
              <hr />
              <li><a href="#aboutPostitModal"><i className="large material-icons black-text">info</i>
                About PostIt</a></li>
              <li><a onClick={this.signOut}><i className="large material-icons red-text">exit_to_app</i>
                Sign Out</a></li>
            </ul>
          </div>
          {/* Modal Structure for group delete dialog */}
          <GroupDeleteModal deleteGroup={this.props.deleteGroup}/>
          <AboutPostitModal/>
        </nav>
      </div>
    );
  }
}
