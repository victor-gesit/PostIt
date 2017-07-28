import React from 'react';
import { connect } from 'react-redux';
import { getGroupsForUser, getPostItMembers, createGroup } from '../../actions';

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
  componentDidMount() {
    // Load all registered members
    const token = this.props._that.props.appInfo.userDetails.token;
    this.props._that.props.getPostItMembers(token);
  }
  componentWillUpdate() {
    const allUsers = this.props._that.props.postItInfo.members.postItMembers;
    this.registeredMembers = allUsers;
    console.log(allUsers);
  };
  createGroup(title, description) {
    const creatorId = this.props._that.props.appInfo.userDetails.id;
    const token = this.props._that.props.appInfo.userDetails.token;
    const selectedMembers = this.selectedMembers;
    // this.props._that.props.createGroup(creatorId, title, description, selectedMembers, token);
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
    console.log(memberEmail);
    if(selected) {
      // Add member
      this.selectedMembers.push(memberEmail);
    } else {
      // Remove member if added earlier
      const index = this.selectedMembers.indexOf(memberEmail);
      this.selectedMembers.splice(index, 1);
    }
    console.log(this.selectedMembers);
  }

  render() {
    let usersLoaded = true;
    return (
      <div id="body">
        <NavBar _that={this.props._that}/>
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
                  <button className="btn light-green darken-4" onClick={() => this.switchTab("defaultTab", 'members')}>Next &gt;&gt;</button>
                </div>
              </div>
            </div>
          </div>

          <div id="members" ref="members" className="tabcontent">
            <div className="row">
              <div className="col s12 m8 offset-m2 l6 offset-l3">
          { /* Load spinner while contacting server */ }
          {!usersLoaded ? (
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
                <ul className="collection registeredMembersList">
                  {
                   Object.keys(this.registeredMembers).map((userId, index ) => {
                     return <RegisteredMember addMember={this.addMember} key={index} id={userId} userInfo={this.registeredMembers[userId]}/>
                   })
                  }
                </ul>
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
  componentDidMount(){
    // Load all the groups a user belongs to
    const token = this.props._that.props.appInfo.userDetails.token;
    //this.props._that.props.getGroupsForUser(null, null, token);
  }
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="pink darken-4">
          <div className="nav-wrapper">
            <a href="#" id="brand" className="brand-logo">PostIt</a>
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
                        <div className="title black-text">Philip Newmann</div>
                        <p>philip@newmann.com<br />08033322425</p>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <div className="row valign-wrapper">
                      <div className="col s12 center">
                        <button className="btn  black">Sign out</button>
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
                    <span className="title black-text">Philip Newmann</span>
                    <p>philip@newmann.com<br />08033322425</p>
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
              <ul className="list-side-nav">
                <li><a href="#"><i className="material-icons teal-text">people_outline</i>Invent NextBigThing</a></li>
                <li><a href="#"><i className="material-icons teal-text">people_outline</i>Just GetStuffDone</a></li>
                <li><a href="#"><i className="material-icons teal-text">people_outline</i>Let's MakesThingsWork</a></li>
                <li><a href="#"><i className="material-icons teal-text">people_outline</i>Make and DisruptIt</a></li>
                <li><a href="#"><i className="material-icons teal-text">people_outline</i>Invent NextBigThing</a></li>
                <li><a href="#"><i className="material-icons teal-text">people_outline</i>Just GetStuffDone</a></li>
                <li><a href="#"><i className="material-icons teal-text">people_outline</i>Let's MakesThingsWork</a></li>
                <li><a href="#"><i className="material-icons teal-text">people_outline</i>Make and DisruptIt</a></li>
                <li><a href="#"><i className="material-icons teal-text">people_outline</i>Invent NextBigThing</a></li>
                <li><a href="#"><i className="material-icons teal-text">people_outline</i>Just GetStuffDone</a></li>
                <li><a href="#"><i className="material-icons teal-text">people_outline</i>Let's MakesThingsWork</a></li>
                <li><a href="#"><i className="material-icons teal-text">people_outline</i>Make and DisruptIt</a></li>
              </ul>
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

function mapStateToProps(state) {
  return {
    apiError: state.apiError,
    dataLoading: state.dataLoading,
    groups: state.groups,
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
    getPostItMembers: (token) => dispatch(getPostItMembers(token)),
    createGroup: (creatorId, title, description, selectedMembers, token) =>
      dispatch(createGroup(creatorId, title, description, selectedMembers, token)),
    getGroupsForUser: (userId, offset, limit, token) => dispatch(getGroupsForUser(userID, offset, limit, token))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateGroup);
