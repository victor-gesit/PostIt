import React from 'react';
import { connect } from 'react-redux';
import { getGroupsForUser, getAllGroupsForUser, resetErrorLog, resetRedirect, getPostItMembers, createGroup } from '../../actions';
import NotificationSystem from 'react-notification-system';

import 'jquery';


class CreateGroup extends React.Component {
  render() {
    return (
      <div>
        <Body _that={this}/>
      </div>
    )
  }
}

class Body extends React.Component {
  constructor(props){
    super(props);
    this.switchTab = this.switchTab.bind(this);
    this.addMember = this.addMember.bind(this);
    this.createGroup = this.createGroup.bind(this);
    this.showNotification = this.showNotification.bind(this);
    this.selectedMembers = [];
    this.registeredMembers = {
      abracadabra: {
        name: 'Victor Idongesit',
        id: 'abracadabra',
        email: 'victor@yahoo.com'
      },
      janana: {
        name: 'Jane Does',
        id: 'janana',
        email: 'jane@doe.com'
      },
      obiisaboy: {
        name: 'Obi Nna',
        id: 'obiisaboy',
        email: 'obi@ezekweseli.com'
      }
    };
  }
  showNotification(level, message) {
      this._notificationSystem.addNotification({
      message: message,
      level: level
    });
  }
  componentDidMount() {
    // Bind the notifications component
    this._notificationSystem = this.notificationRef;
    // Load all registered members
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    this.props._that.props.getPostItMembers(token);
    this.props._that.props.getAllGroupsForUser(userId, token);
  }
  componentWillUpdate() {
    const allUsers = this.props._that.props.postItInfo.members.postItMembers;
    const apiError = this.props._that.props.apiError.errored;
    const redirect = this.props._that.props.apiError.redirect;
    console.log(this.props._that.props.apiError);
    const errorMessage = this.props._that.props.apiError.message;
    this.registeredMembers = allUsers;
    if(redirect.yes) {
      // Reset state of redirect property
      this.props._that.props.resetRedirect();
      this.props._that.props.history.push(redirect.to);
    } else {
      if(errorMessage) {
        // Empty the array of selected members
        this.selectedMembers = [];
        this.showNotification('error', errorMessage);
        // Reset error log
        this.props._that.props.resetErrorLog();
      }
    }
  };
  createGroup() {
    const title = this.title.value;
    const description = this.description.value;
    const creatorId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const selectedMembers = this.selectedMembers;
    this.props._that.props.createGroup(creatorId, title, description, selectedMembers, token);
  }
  switchTab(button, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    this.refs[tabName].style.display = "block";
    this.refs[button].className += " active";
  }
    // Method to add a member to the list of selected members
  addMember(selected, memberEmail) {
    if(selected) {
      // Add member
      this.selectedMembers.push(memberEmail);
    } else {
      // Remove member if added earlier
      const index = this.selectedMembers.indexOf(memberEmail);
      this.selectedMembers.splice(index, 1);
    }
  }

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
    }
    let dataLoading  = this.props._that.props.dataLoading;
    return (
      <div id="body">
        <NavBar _that={this.props._that}/>
        <NotificationSystem className='notification' style={style} ref={(notificationRef) => { this.notificationRef = notificationRef }} />
        <div id="main">
          <div className="tab">
            <button className="tablinks" id="defaultTab" ref="defaultTab" onClick={() => this.switchTab("defaultTab", 'info')}>Group info</button>
            <button className="tablinks" id="add-members" ref="add-members" onClick={() => this.switchTab("add-members", 'members')}>Add members</button>
          </div>
          <div id="info" ref="info" className="tabcontent">
            <div className="row">
              <div className="col s12 m8 offset-m2 offset-l3 l6">
                <div className="group-details">
                  <h4 className="center">Enter group details</h4>
                  <form>
                    <div>
                      <input type="text" ref={(title) => { this.title = title; }} name="group-title" placeholder="Group Title" />
                    </div>
                    <div>
                      <textarea id="groupDescription" ref={(description) => { this.description = description; }} type="text" className="materialize-textarea" placeholder="Description" name="group-desc" defaultValue={""} />
                    </div>
                  </form>
                  <button className="btn light-green darken-4" onClick={() => this.switchTab("add-members", 'members')}>Next &gt;&gt;</button>
                </div>
              </div>
            </div>
          </div>

          <div id="members" ref="members" className="tabcontent">
            <div className="row">
              <div className="col s12 m8 offset-m2 l6 offset-l3">
          { /* Load spinner while contacting server */ }
          {dataLoading ? (
          <div>
              <form>
                <ul className="collection with-header">
                  <li className="collection-header"><h4>Add members</h4></li>
                  <li className="collection-item">
                    <input id="cb1" type="checkbox" disabled  />
                    <label htmlFor="cb1" className="black-text"><small className="grey-text"></small></label>
                  </li>
                  <li className="collection-item">
                    <input id="cb2" type="checkbox" disabled  />
                    <label htmlFor="cb2" className="black-text"><small className="grey-text"></small></label>
                  </li>
                  <li className="collection-item">
                    <input id="cb3" type="checkbox" disabled  />
                    <label htmlFor="cb3" className="black-text"><small className="grey-text"></small></label>
                  </li>
                  <li className="collection-item">
                    <input id="cb4" type="checkbox" disabled  />
                    <label htmlFor="cb4" className="black-text"><small className="grey-text"></small></label>
                  </li>
                </ul>
              </form>
              <div className="userlist-preloader">
                <div className="preloader-wrapper big active valign-wrapper">
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
              <div className="row">
                <button className="btn col s8 offset-s2 m5 l5 light-green darken-4" onClick={() => this.switchTab("defaultTab", 'info')}>&lt;&lt; Group info</button>
                <div className="col s12 m2 s2"><br /></div>
                <button disabled className="btn col s8 offset-s2 m5 l5 light-green darken-4">Create group</button>
              </div>
          </div>
          ) : (
            <div>
              <form>
                <h3 className="center">Add members</h3>
                <div className="registeredMembersList">
                  <ul className="collection">
                    {
                    Object.keys(this.registeredMembers).map((userId, index ) => {
                      return <RegisteredMember addMember={this.addMember} key={index} id={userId} userInfo={this.registeredMembers[userId]}/>
                    })
                    }
                  </ul>
                </div>
              </form>
              <div className="row">
                <button className="btn col s8 offset-s2 m5 l5 light-green darken-4" onClick={() => this.switchTab("defaultTab", 'info')}>&lt;&lt; Group info</button>
                <div className="col s12 m2 s2"><br /></div>
                <button onClick={this.createGroup} className="btn col s8 offset-s2 m5 l5 light-green darken-4">Create group</button>
              </div>
            </div>
          )}
              </div>
            </div>
          </div>

        </div>
        <Footer/>
      </div>
    )
  }
}



class Footer extends React.Component {
  render() {
    return (
      <footer className="page-footer pink darken-4">
        <div className="shift-left white-text">Built by Victor Idongesit</div>
        <div className="footer-copyright shift-left">© Andela, 2017</div>
      </footer>
    )
  }
}

class NavBar extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    const userDetailsString = localStorage.getItem('userDetails');
    const userDetails = JSON.parse(userDetailsString);
    const allUserGroups = this.props._that.props.allUserGroups.userGroups;
    return (
      <div className="navbar-fixed">
        <nav className="pink darken-4">
          <div className="nav-wrapper">
            <a href="#" id="brand" className="brand-logo left">PostIt</a>
            <a href="#" data-activates="mobile-demo" data-hover="true" className="button-collapse show-on-large"><i className="material-icons">menu</i></a>
            <ul className="right">
              <li>
                {/* Dropdown Trigger */}
                <ul>
                  <li>
                    <a className="dropdown-button" data-alignment="right" data-constrainwidth="false" data-beloworigin="true" data-hover="true" href="#" data-activates="dropdown0">
                      <i className="material-icons">notifications_active</i>
                    </a>
                  </li>
                </ul>
                {/* Dropdown Structure */}
                <ul id="dropdown0" className="dropdown-content">
                  <li><a href="#!" className="black-text">Family and Friends<span className="badge">1</span></a></li>
                  <li><a href="#!" className="black-text">DisruptI.T. Project<span className="new pink badge">1</span></a></li>
                </ul>
              </li>
              <li>
                {/* Dropdown Trigger */}
                <ul>
                  <li>
                    <a className="dropdown-button" data-beloworigin="true" data-hover="true" href="#" data-activates="dropdown3">
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
                        <div className="title black-text">{userDetails.firstName} {userDetails.lastName}</div>
                        <p>{userDetails.email}<br />{userDetails.phone}</p>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <div className="row valign-wrapper">
                      <div className="col s12 center">
                        <button className="btn  black sign-out-button">Sign out</button>
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
            {/* Side Nav */}
            <ul id="mobile-demo" className="side-nav">
              <li>
                <div className="user-details">
                  <div className="background">
                    <img src="images/fire2.png" />
                  </div>
                </div>
                <ul className="collection">
                  <li className="collection-item avatar black-text">
                    <i className="material-icons purple circle">person</i>
                    <span className="title black-text">{userDetails.firstName} {userDetails.lastName}</span>
                    <p>{userDetails.email}<br />{userDetails.phone}</p>
                  </li>
                </ul>
              </li>
              <hr />
              <li><a href="#"><i className="large material-icons red-text">texture</i>All Groups</a></li>
              <div className="row searchbox valign-wrapper">
                <div className="col s9">
                  <input type="search" placeholder="Find a group" className="white-text" />
                </div>
                <div className="col s3">
                  <span><i className="material-icons black-text">search</i></span>
                </div>
              </div>
              <Groups allUserGroups={allUserGroups} />
              <hr />
              <li><a href="#"><i className="large material-icons black-text">info</i>About PostIt</a></li>
              <li><a href="#"><i className="large material-icons red-text">info</i>Sign Out</a></li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}


class Groups extends React.Component{
  render() {
    const allUserGroups = this.props.allUserGroups;
    return(
      <ul className="list-side-nav">
        {
          Object.keys(allUserGroups).map((groupId, index) => {
            return <UserGroup key={index} groupDetails={allUserGroups[groupId].info} />
          })
        }
      </ul>
    )
  }
}
class UserGroup extends React.Component {
  render() {
    const groupDetails = this.props.groupDetails;
    return (
     <li><a href="#"><i className="material-icons teal-text">people_outline</i>{groupDetails.title}</a></li>
    )
  }
}

// Component to contain a member loaded from the database
class RegisteredMember extends React.Component {
  constructor(props) {
    super(props);
    this.selected = false;
    this.addOrRemove = this.addOrRemove.bind(this);
  }
  // Method add or remove a member
  addOrRemove(state, email) {
    this.selected = !this.selected;
    this.props.addMember(this.selected, email);
  }
  render() {
    const userInfo = this.props.userInfo;
    return (
      <li className="collection-item">
        <input id={this.props.userInfo.email}
          type="checkbox"
          onClick={() => this.addOrRemove(event, this.props.userInfo.email)}
          ref={this.props.userInfo.email} />
        <label className="brown-text" htmlFor={this.props.userInfo.email}>{userInfo.firstName} {userInfo.lastName}<small className="red-text">   {this.props.userInfo.email}</small></label>
      </li>
    )
  }
}

const mapStateToProps = (state)  => {
  return {
    apiError: state.apiError,
    dataLoading: state.dataLoading,
    groups: state.groups,
    allUserGroups: state.allUserGroups,
    appInfo: {
      userDetails: state.appInfo.userDetails,
      authState: state.appInfo.authState
    },
    postItInfo: state.postItInfo
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetErrorLog: () => dispatch(resetErrorLog()),
    resetRedirect: () => dispatch(resetRedirect()),
    getPostItMembers: (token) => dispatch(getPostItMembers(token)),
    getAllGroupsForUser: (userId, token) => dispatch(getAllGroupsForUser(userId, token)),
    createGroup: (creatorId, title, description, selectedMembers, token) =>
      dispatch(createGroup(creatorId, title, description, selectedMembers, token)),
    getGroupsForUser: (userId, offset, limit, token) => dispatch(getGroupsForUser(userID, offset, limit, token))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateGroup);
