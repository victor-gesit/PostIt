import React from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { getGroupMembers, getMessages, createGroup, deleteMember, deleteGroup, getAllGroupsForUser, postMessage  } from '../../actions';
import { connect } from 'react-redux';
import 'jquery/dist/jquery';
import '../../js/materialize';


class PostMessage extends React.Component {
  constructor(props) {
    super(props);
  };
  render() {
    return(
      <div>
      <Body _that={this}/>
     </div>
    )
  }
}

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.getFormattedTimeStamp = this.getFormattedTimeStamp.bind(this);
    this.deleteMember = this.deleteMember.bind(this);
    this.deleteGroup = this.deleteGroup.bind(this);
    this.memberIdToDelete = '';
    this.groupIdToDelete = '';
    this.allMessages = null;
    this.allMembers = null;
    this.creatorEmail = "";
  }
  deleteMember() {
    const token = this.props._that.props.appInfo.userDetails.token;
    const idToDelete = this.memberIdToDelete;
    const ownerId = this.props._that.props.appInfo.userDetails.id;
    const groupId = this.props._that.props.appInfo.loadedChat.groupId;
    // Call the redux action to delete the member
    this.props._that.props.deleteMember(ownerId, idToDelete, groupId, token);
  }
  deleteGroup() {
    const token = this.props._that.props.appInfo.userDetails.token;
    const groupId = this.memberIdToDelete;
    const ownerId = this.props._that.props.appInfo.userDetails.id;
    // Call redux action to delete the group
    this.props._that.props.deleteGroup(ownerId, groupId, token);
  }
  componentWillMount() {
    const userId = this.props._that.props.appInfo.userDetails.id;
    const token = this.props._that.props.appInfo.userDetails.token;
    const groupId = this.props._that.props.appInfo.loadedChat.groupId;
    // Load user groups
    this.props._that.props.getAllGroupsForUser(userId, token);
    // Load all messages for the group
    this.props._that.props.getMessages(groupId, token);
    // Load all registered members of the stated group
    this.props._that.props.getGroupMembers(groupId, token);
  }
  componentDidMount() {
    // Custom JS to handle sidenav and modal
    $(document).ready(() => {
      $('.button-collapse').sideNav();
      $('#member-list-toggle').off().on('click', () => {
        $('#memberList').animate({ width: 'toggle' });
      });
      $('.modal').modal({
        // Handle modal dialog box
        ready: (modal, trigger) => {
          // Check if modal is for deleting group member or group entire
          if(modal[0].id === 'deleteMemberModal'){
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
          if(!target.parents('#memberList').length) {
            if(!target.parents('#deleteMemberModal').length) {
              $('#memberList').fadeOut();
            }
          }
        }
      });
    });
  }
  getFormattedTimeStamp(timeStamp, callback) {
    const months = ['January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August', 'September', 'October',
      'November', 'December'
    ]
    const year = timeStamp.slice(0,4);
    const monthString = timeStamp.slice(5,7);
    const month = months[parseInt(monthString) -1];
    const dayString = timeStamp.slice(8, 10);
    const day = parseInt(dayString);
    const hour = timeStamp.slice(11, 13);
    const minute = timeStamp.slice(14,16);
    const formattedTime = `${month} ${day}, ${year}, at ${hour}:${minute}`;
    callback(formattedTime);
  }
  render() {
    return(
    <div id="body">
      <Nav deleteGroup={this.deleteGroup} _that={this.props._that}/>
      <div id="main">
        <div id="main-postmessage">
          <div className="memberListToggle">
            <button id="member-list-toggle" className="btn s4">Member List</button>
          </div>
          <div className="row">
            <div className="col s12 m8 offset-m2 l8 offset-l2 messageboard">
              <div className="group-info row">
                <h5 className="col s8 m8 l8 center">Project NexBigThing</h5>
              </div>
              {/* Messages */}
              <Messages/>
            </div>
            {/*Side bar, visible by toggle*/}
            <GroupListToggle _that={this.props._that}/>
          </div>
        </div>
        {/* Modal to handle deleting a member from a group */}
         <MemberDeleteModal deleteMember={this.deleteMember}/>
        {/* Message Input Box */}
        <MessageInputBox _that={this.props._that}/>
      </div>
    </div>
    )
  }
}
class MemberDeleteModal extends React.Component {
  render() {
    return (
      <div id="deleteMemberModal" className="modal grey">
        <div className="modal-content">
          <h5 className="orange-text">Delete Member?</h5>
          <p className="white-text">This group member will be removed from this group.</p>
        </div>
        <div className="modal-footer">
          <a href="#!" onClick={this.props.deleteMember} className="modal-action modal-close waves-effect waves-green btn-flat green-text">Agree</a>
          <a className="modal-action modal-close waves-effect waves-green btn-flat green-text">Disagree</a>
        </div>
      </div>
    )
  }
}
class GroupListToggle extends React.Component {
  render() {
    const groupId = this.props._that.props.appInfo.loadedChat.groupId;
    const groupLoaded = this.props._that.props.groups.userGroups[groupId];
    let groupMembers;
    // Load the group members if group has loaded
    if(groupLoaded) {
      groupMembers = this.props._that.props.groups.userGroups[groupId].members
    }
    return(
      <div id="memberList" className="members-list-container m4 l3">
        <div className="row searchbox valign-wrapper">
          <div className="col s9">
            <input type="search" className="black-text" />
          </div>
          <div className="col s3">
            <span><i className="material-icons black-text">search</i></span>
          </div>
        </div>
        {
          groupLoaded?(
            <div>Project NextBigThing <span className="badge">24</span></div>
          ):(
            <div>Project NextBigThing <span className="badge"></span></div>
          )
        }
        <hr />
        <span>Members List</span>
        {
          groupLoaded?
          (
            <GroupMembers groupMembers={groupMembers}/>
          ):(
            <div className="pink-text">Loading...</div>
          )
        }
      </div>
    )
  }
}
class MessageInputBox extends React.Component {
  constructor(props){
    super(props);
    this.priority = 'normal'; // Default priority
    this.isComment = 'true';
    this.setPriority = this.setPriority.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.state = {
      priority: 'normal'
    }
  }
  setPriority(e) {
    const priority = e.target.id;
    this.setState({ priority: priority }, () => {
      console.log(this.state.priority);
    });
  }
  sendMessage() {
    const token = this.props._that.props.appInfo.userDetails.token;
  }
  render() {
    return(
      <div id="messageInputBox">
        <div id="messageInput">
          <div className="row">
            <div className="col center s12 m8 offset-m2 l8 offset-l2">
              <input name="priority" onClick={this.setPriority} ref={(normal) => {this.normal = normal}} type="radio" id="normal" defaultChecked />
              <label htmlFor="normal">Normal</label>
              <input name="priority" onClick={this.setPriority} ref={(urgent) => {this.urgent = urgent}} type="radio" id="urgent" />
              <label htmlFor="urgent">Urgent</label>
              <input name="priority" onClick={this.setPriority} ref={(critical) => {this.critical = critical}} type="radio" id="critical" />
              <label htmlFor="critical">Critical</label>
              <input name="priority" onClick={this.setPriority} ref={(comment) => {this.comment = comment}} type="radio" id="comment" />
              <label htmlFor="comment">Comment</label>
            </div>
            <div className="col s12 m8 offset-m2 l8 offset-l2">
              {/* Adjust the text input window to accept smaller text quantity for comments */}
              {
                this.state.priority === 'comment'?
                (
                  <div className="message-box">
                    <div className="text-input-field">
                      <input className="black-text materialize-textarea" type="text" name="mymessage" defaultValue={""} />
                    </div>
                    <div className="send-comment-button">
                      <button id="member-list-button" className="btn"><i className="material-icons">send</i></button>
                    </div>
                  </div>
                ):(
                  <div className="message-box">
                    <div className="text-input-field">
                      <textarea className="black-text materialize-textarea" type="text" name="mymessage" defaultValue={""} />
                    </div>
                    <div className="send-button">
                      <button id="member-list-button" className="btn"><i className="material-icons">send</i></button>
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}
class Messages extends React.Component {
  render() {
    const messages = [
      {
        sentBy: 'Ade Balogun',
        body: 'I will not be able to make it to the meeting',
        createdAt: 'Post created 12:06:2017, 11:34am',
        priority: 'critical'
      },
      {
        sentBy: 'John Smith',
        body: 'We will try to make up for your absence. Take care.',
        createdAt: 'Post created 12:06:2017, 11:50am',
        priority: 'urgent'
      },
      {
        sentBy: 'Joy Okafor',
        body: 'Can we get someone to fill his place?',
        createdAt: 'Post created 12:06:2017, 11:50am',
        priority: 'normal'
      },
      {
        sentBy: 'John Keneddy',
        body: 'Can we get someone to fill his place?',
        createdAt: 'Post created 12:06:2017, 11:50am',
        priority: 'comment'
      },
      {
        sentBy: 'John Smith',
        body: 'We will try to make up for your absence. Take care.',
        createdAt: 'Post created 12:06:2017, 11:50am',
        priority: 'critical'
      },
      {
        sentBy: 'John Smith',
        body: 'We will try to make up for your absence. Take care.',
        createdAt: 'Post created 12:06:2017, 11:50am',
        priority: 'urgent'
      },
      {
        sentBy: 'Joy Okafor',
        body: 'Can we get someone to fill his place?',
        createdAt: 'Post created 12:06:2017, 11:50am',
        priority: 'normal'
      },
      {
        sentBy: 'John Keneddy',
        body: 'Can we get someone to fill his place?',
        createdAt: 'Post created 12:06:2017, 11:50am',
        priority: 'none'
      },
      {
        sentBy: 'John Smith',
        body: 'We will try to make up for your absence. Take care.',
        createdAt: 'Post created 12:06:2017, 11:50am',
        priority: 'none'
      }
    ]
    return(
      <ul id="messages" className="messages row">
        {
          messages.map((messageDetails, index) => {
            return  <Message key={index} messageDetails={messageDetails}/>
          })
        }
      </ul>
    )
  }
}

class GroupMembers extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const groupMembers = this.props.groupMembers;
    const groupaMembers = {
      1: {
        firstName: 'Ade Balogun',
        lastName: 'Balogun',
        email: 'adebalogun@yahoo.com',
        id: 1
      },
      2: {
        firstName: 'John Smith',
        lastName: 'Smith',
        email: 'johnsmith@yahoo.com',
        id: 2
      },
      3: {
        firstName: 'Joy Okafor',
        lastName: 'Okafor',
        email: 'joyokafor@yahoo.com',
        id: 3
      },
      4: {
        firstName: 'John Kennedy',
        lastName: 'John',
        email: 'johnkennedy@yahoo.com',
        id: 4
      },
      5: {
        firstName: 'Ade Balogun',
        lastName: 'Ade',
        email: 'adebalogun@yahoo.com',
        id: 5
      },
      6: {
        firstName: 'John Smith',
        lastName: 'Smith',
        email: 'johnsmith@yahoo.com',
        id: 6
      },
      7: {
        name: 'Joy Okafor',
        email: 'joyokafor@yahoo.com',
        id: 7
      }
    }
    return(
      <ul className="collection members-list">
        {
          groupMembers?(
            Object.keys(groupMembers).map((memberId, index) => {
              return (
                <GroupMember key={index} memberDetails={groupMembers[memberId]}/>
              )
            })
          ): (
            <div>Loading...</div>
          )
        }

      </ul>
    )
  }
}

class GroupMember extends React.Component {
  render() {
    const memberDetails = this.props.memberDetails;
    return(
       <li className="collection-item">{memberDetails.firstName} {memberDetails.lastName}<br /><small className="grey-text">{memberDetails.email}</small><a href="#deleteMemberModal" id={memberDetails.id} value={memberDetails.name} className="secondary-content modal-trigger red-text"><i  className="material-icons">clear</i></a></li>
    )
  }
}

class Message extends React.Component {
  render() {
    const messageDetails = this.props.messageDetails;
    const priority = messageDetails.priority;
    switch(priority){
      case 'normal': return(
      <li className="message card col s11">
        <small className="sender-name">{messageDetails.sentBy}<a className="secondary-content green-text"><i className="material-icons">lens</i></a></small>
        <div className="message-body white-text">{messageDetails.body}</div>
        <div className="message-info"><small>{messageDetails.createdAt}</small></div>
      </li>
      )
      case 'urgent': return(
      <li className="message card col s11">
        <small className="sender-name">{messageDetails.sentBy}<a className="secondary-content orange-text"><i className="material-icons">lens</i></a></small>
        <div className="message-body white-text">{messageDetails.body}</div>
        <div className="message-info"><small>{messageDetails.createdAt}</small></div>
      </li>
      )
      case 'critical': return(
      <li className="ownmessage message card col s11 offset-s1">
        <small className="sender-name">{messageDetails.sentBy}<a className="secondary-content red-text"><i className="material-icons">lens</i></a></small>
        <div className="message-body white-text">{messageDetails.body}</div>
        <div className="message-info"><small>{messageDetails.createdAt}</small></div>
      </li>
      )
      default: return (
      <li className="ownmessage message card col s11 offset-s1">
        <small className="sender-name">{messageDetails.sentBy}<a className="secondary-content grey-text"><i className="material-icons">lens</i></a></small>
        <div className="message-body white-text">{messageDetails.body}</div>
        <div className="message-info"><small>{messageDetails.createdAt}</small></div>
      </li>
      )
    }
  }
}
class Nav extends React.Component {
  render() {
    const groupId = this.props._that.props.appInfo.loadedChat.groupId;
    const userGroups = this.props._that.props.allUserGroups;
    const userDetails = this.props._that.props.appInfo.userDetails;
    const allUserGroups = this.props._that.props.allUserGroups.userGroups;
    return(
      <div className="navbar-fixed">
        <nav className="pink darken-4">
          <div className="nav-wrapper">
            <a id="brand" className="brand-logo left">PostIt</a>
            <a href="#" data-activates="mobile-demo" data-hover="true" className="button-collapse show-on-large"><i className="material-icons">menu</i></a>
            <ul className="right">
              <li>
                {/* Dropdown Trigger */}
                <ul>
                  <li>
                    <a className="dropdown-button" data-alignment="right" data-constrainwidth="false" data-beloworigin="true" data-hover="true" data-activates="notifications">
                      <i className="material-icons">notifications_active</i>
                    </a>
                  </li>
                </ul>
                {/* Dropdown Structure */}
                <ul id="notifications" className="dropdown-content">
                  <li><a href="#!" className="black-text">Family and Friends<span className="badge">1</span></a></li>
                  <li><a href="#!" className="black-text">DisruptI.T. Project<span className="new pink badge">1</span></a></li>
                </ul>
              </li>
              <li>
                {/* Dropdown Trigger */}
                <ul>
                  <li>
                    <a className="dropdown-button" data-alignment="right" data-constrainwidth="false" data-beloworigin="true" data-hover="true"  data-activates="createGroup">
                      <i className="material-icons">library_add</i>
                    </a>
                  </li>
                </ul>
                {/* Dropdown Structure */}
                <ul id="createGroup" className="dropdowns dropdown-content">
                  <li><Link to='/creategroup' className="black-text"><i className="material-icons green-text">library_add</i>Create Group</Link></li>
                </ul>
              </li>
              <li>
                {/* Dropdown Trigger */}
                <ul>
                  <li>
                    <a className="dropdown-button" data-beloworigin="true" data-hover="true" data-activates="userInfo">
                      <i className="material-icons">person</i>
                    </a>
                  </li>
                </ul>
                {/* Dropdown Structure */}
                <ul id="userInfo" className="dropdowns dropdown-content">
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
                        <button className="btn sign-out-button  black">Sign out</button>
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
            {/* Side Nav */}
            <ul id="mobile-demo" className="side-nav fixed">
              <li>
                <div className="user-details">
                  <div className="background">
                    {/* Overlay navbar background color on sidenav */}
                    <div id="emptySpace" className="pink darken-4">
                      <div className="brand-logo">PostIt</div>
                    </div>
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
              <li><a href="#groupDeleteModal" id={groupId}><i className="large material-icons red-text">texture</i>Delete Group</a></li>
              <hr />
              <li><a ><i className="large material-icons black-text">texture</i>All Groups</a></li>
              <div className="row searchbox valign-wrapper">
                <div className="col s9">
                  <input type="search" placeholder="Find a group" className="white-text" />
                </div>
                <div className="col s3">
                  <span><i className="material-icons black-text">search</i></span>
                </div>
              </div>
              {/* Groups a user belongs to */}
              <Groups allUserGroups={allUserGroups}/>
              <hr />
              <li><a href="#"><i className="large material-icons black-text">info</i>About PostIt</a></li>
              <li><a href="#"><i className="large material-icons red-text">info</i>Sign Out</a></li>
            </ul>
          </div>
          {/* Modal Structure for group delete dialog */}
          <GroupDeleteModal deleteGroup={this.props.deleteGroup}/>
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
             return <li key={index}><a href="#"><i className="material-icons teal-text">people_outline</i>{allUserGroups[groupId].info.title}</a></li>
          })
        }
      </ul>
    )
  }
}

class GroupDeleteModal extends React.Component {
  render() {
    return(
      <div id="groupDeleteModal" className="modal grey">
        <div className="modal-content">
          <h5 className="orange-text">Delete Group?</h5>
          <p className="white-text">This group will be deleted.</p>
        </div>
        <div className="modal-footer">
          <a href="#!" onClick={this.props.deleteGroup} className="modal-action modal-close waves-effect waves-green btn-flat green-text">Agree</a>
          <a className="modal-action modal-close waves-effect waves-green btn-flat green-text">Disagree</a>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    apiError: state.apiError,
    dataLoading: state.dataLoading,
    groups: state.groups,
    allUserGroups: state.allUserGroups,
    appInfo: {
      userDetails: state.appInfo.userDetails,
      authState: state.appInfo.authState,
      loadedChat: state.appInfo.loadedChat
    }
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllGroupsForUser: (userId, token) => dispatch(getAllGroupsForUser(userId, token)),
    getGroupMembers: (groupId, token) => dispatch(getGroupMembers(groupId, token)),
    resetErrorLog: () => dispatch(resetErrorLog()),
    deleteMember: (ownerId, idToDelete, groupId, token) => dispatch(deleteMember(ownerId, idToDelete, groupId, token)),
    deleteGroup: (ownerId, groupId, token) => dispatch(deleteGroup(ownerId, groupId, token)),
    getMessages: (groupId, token) => dispatch(getMessages(groupId, token)),
    postMessage: (senderId, body, priority, isComment, token) => dispatch(postMessage(senderId, body, priority, isComment, token))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PostMessage);