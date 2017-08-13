import React from 'react';
import Groups from './Groups.jsx';
import GroupDeleteModal from './GroupDeleteModal.jsx';

/**
 * React component to display the navbar
 */
export default class NavBar extends React.Component {
  /**
   * Render method of React component
   * @returns {Object} Returns the DOM object to be rendered
   */
  render() {
    const groupId = localStorage.getItem('groupId');
    const userDetailsString = localStorage.getItem('userDetails');
    const userDetails = JSON.parse(userDetailsString);
    const allUserGroups = this.props.allUserGroups;
    const path = window.location.pathname;
    let sideNavClass = 'side-nav';
    if (path === '/postmessage') {
      sideNavClass = 'side-nav fixed';
    }
    return (
      <div className="navbar-fixed">
        <nav className="pink darken-4">
          <div className="nav-wrapper">
            <a id="brand" className="brand-logo left">PostIt</a>
            <a href="#" data-activates="mobile-demo" data-hover="true"
              className="button-collapse show-on-large">
              <i className="material-icons">menu</i></a>
            <ul className="right">
              {/* Link to messageboard shouldn't be visible on messageboard page */}
              {
                path === '/messageboard' ? (
              <li>
              </li>
                ) : (
                <li>
                      <a href="/messageboard">
                        <i className="material-icons">view_module</i>
                      </a>
                </li>
                )
              }
              <li>
                {/* Dropdown Trigger */}
                <ul>
                  <li>
                    <a className="dropdown-button" data-alignment="right"
                      data-constrainwidth="false" data-beloworigin="true"
                      data-hover="true" href="#" data-activates="dropdown0">
                      <i className="material-icons">notifications_active</i>
                    </a>
                  </li>
                </ul>
                {/* Dropdown Structure */}
                <ul id="dropdown0" className="dropdown-content">
                  <li><a href="#!" className="black-text">Family and Friends
                    <span className="badge">1</span></a></li>
                  <li><a href="#!" className="black-text">DisruptI.T. Project
                    <span className="new pink badge">1</span></a></li>
                </ul>
              </li>
              <li>
                {/* Dropdown Trigger */}
                <ul>
                  <li>
                    <a className="dropdown-button" data-alignment="right"
                      data-constrainwidth="false" data-beloworigin="true"
                      data-hover="true" href="#" data-activates="dropdown1">
                      <i className="material-icons">library_add</i>
                    </a>
                  </li>
                </ul>
                {/* Dropdown Structure */}
                <ul id="dropdown1" className="dropdowns dropdown-content">
                  {
                    path === '/creategroup' ? (
                      <li><a className="black-text"><i className="material-icons green-text">
                        library_add</i>Create Group</a></li>
                    ) : (
                      <li><a href="/creategroup" className="black-text">
                      <i className="material-icons green-text">library_add</i>Create Group</a></li>
                    )
                  }
                </ul>
              </li>
              <li>
                {/* Dropdown Trigger */}
                <ul>
                  <li>
                    <a className="dropdown-button" data-beloworigin="true"
                    data-hover="true" href="#" data-activates="dropdown3">
                      <i className="material-icons">person</i>
                    </a>
                  </li>
                </ul>
                {/* Dropdown Structure */}
                <ul id="dropdown3" className="dropdowns dropdown-content">
                  <li className="user-profile-container">
                    <ul className="collection">
                      <li className="collection-item avatar black-text">
                        <i className="material-icons purple circle">person</i>
                        <div className="title black-text">
                          {userDetails.firstName} {userDetails.lastName}</div>
                        <p>{userDetails.email}<br />{userDetails.phone}</p>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <div className="row valign-wrapper">
                      <div className="col s12 center">
                        <button className="btn sign-out-button black">Sign out</button>
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
            {/* Side Nav */}
            <ul id="mobile-demo" className={sideNavClass}>
              {
                path === '/postmessage' ? (
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
                      <img src="images/fire2.png" />
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
                path === '/postmessage' ? (
                  <li><a href="#groupDeleteModal" id={groupId}>
                    <i className="large material-icons red-text">
                    texture</i>Delete Group</a></li>
                ) : (
                  path === '/creategroup' ? (
                    <li><a><i className="large material-icons green-text">library_add</i>
                    Create New Group</a></li>
                  ) : (
                    <li><a href='/creategroup'>
                    <i className="large material-icons green-text">library_add</i>
                    Create New Group</a></li>
                  )
                )
              }
              <hr />
              <li><a><i className="large material-icons black-text">texture</i>All Groups</a></li>
              <div className="row searchbox valign-wrapper">
                <div className="col s9">
                  <input type="search" placeholder="Find a group" className="white-text" />
                </div>
                <div className="col s3">
                  <span><i className="material-icons black-text">search</i></span>
                </div>
              </div>
              {/* Groups a user belongs to */}
              <Groups store={this.props.store} allUserGroups={allUserGroups}/>
              <hr />
              <li><a href="#"><i className="large material-icons black-text">info</i>
                About PostIt</a></li>
              <li><a href="#"><i className="large material-icons red-text">exit_to_app</i>
                Sign Out</a></li>
            </ul>
          </div>
          {/* Modal Structure for group delete dialog */}
          <GroupDeleteModal deleteGroup={this.props.deleteGroup}/>
        </nav>
      </div>
    );
  }
}
