import React from 'react';
import { connect } from 'react-redux';


class PostMessage extends React.Component {
  constructor(props) {
    super(props);
    this.getFormattedTimeStamp = this.getFormattedTimeStamp.bind(this);
    this.state = {
        allMessages : null,
        allMembers: null,
        emptyMessages: [],
        creatorEmail: "victor4l@yahoo.com"
    }
  }

  componentDidMount() {
    this.getMessages((allMessages) => {
      this.state.allMessages = allMessages;
      for(let i = 0; i < allMessages.length; i++) {
        this.getFormattedTimeStamp(allMessages[i].createdAt, (formattedDate) => {
          this.state.allMessages[i].info = `Post created ${formattedDate}`;
        });
      }
      this.setState({allMessages});
    });
    this.getMembers((members) => {
      let allMembers = members;
      for(let i=0; i< members.length; i++) {
        allMembers[i].name = `${members[i].firstName} ${members[i].lastName}`
        if(allMembers[i].email === this.state.creatorEmail){
          allMembers[i].role = "creator";
        };
      }
      console.log(allMembers);
      this.setState({allMembers});
    });
  }
  /**
   * 
   * @param {String} time The default time format
   * @param {Function} callback A callback that takes the formatted time stamp
   */
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
  /**
   * 
   * @param {String} messageBody The content of the message to be posted
   * @param {Boolean} isPost A boolean to indicate if the message is a comment or a post
   */

  render() {
    return(
      <div>
        <Nav members={this.state.allMembers}/>
        <Body postMessage= {this.postMessage} messages= {this.state.allMessages} members={this.state.allMembers}/>
      </div>
    );
  }
}

// Navigation Component
class Nav extends React.Component {
  render() {
    return(
      <div className="navbar-fixed">
        <nav className="pink darken-4">
          <div className="nav-wrapper">
            <a href="#" id="brand" className="brand-logo">PostIt</a>
            <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
            <ul className="right hide-on-med-and-down">
              <li>
                {/* Dropdown Trigger */}
                <ul>
                  <li>
                    <a className="dropdown-button tooltipped" data-position="bottom" data-delay={1000} data-tooltip="View notifications" href="#" data-activates="dropdown1">
                      <i className="material-icons red-text tootipped">notifications_active</i>
                    </a>
                  </li>
                </ul>
                {/* Dropdown Structure */}
                <ul id="dropdown1" className="dropdowns dropdown-content">
                  <li className><a href="#" className="brown-text text-darken-4">NextBigThing<span className="badge new pink">4</span></a></li>
                  <li className><a href="#" className="brown-text text-darken-4">DisruptiveTech<span className="badge new pink">4</span></a></li>
                  <li className="divider" />
                </ul>
              </li>
              <li><a className="waves-effect white-text waves-light">About PostIt</a></li>
              <li><a className="waves-effect waves-light black btn">Sign out</a></li>
            </ul>
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
              <li><a href="#"><i className="large material-icons teal-text">people_outline</i>Group Members</a></li>
              <div className="row searchbox valign-wrapper">
                <div className="col s9">
                  <input type="search" className="black-text" />
                </div>
                <div className="col s3">
                  <span><i className="material-icons black-text">search</i></span>
                </div>
              </div>
              <ul className="members-list-side-nav">
                <li><a href="#"><i className="material-icons teal-text">person</i>Obi Nna</a></li>
                <li><a href="#"><i className="material-icons teal-text">person</i>John Doe</a></li>
                <li><a href="#"><i className="material-icons teal-text">person</i>Jane Amaka</a></li>
                <li><a href="#"><i className="material-icons teal-text">person</i>Obi Nna</a></li>
                <li><a href="#"><i className="material-icons teal-text">person</i>John Doe</a></li>
                <li><a href="#"><i className="material-icons teal-text">person</i>Jane Amaka</a></li>
                <li><a href="#"><i className="material-icons teal-text">person</i>Obi Nna</a></li>
                <li><a href="#"><i className="material-icons teal-text">person</i>John Doe</a></li>
                <li><a href="#"><i className="material-icons teal-text">person</i>Jane Amaka</a></li>
                <li><a href="#"><i className="material-icons teal-text">person</i>Obi Nna</a></li>
                <li><a href="#"><i className="material-icons teal-text">person</i>John Doe</a></li>
                <li><a href="#"><i className="material-icons teal-text">person</i>Jane Amaka</a></li>
              </ul>
              <hr />
              <li><a href="#"><i className="large material-icons black-text">info</i>About PostIt</a></li>
              <li><a href="#"><i className="large material-icons red-text">info</i>Sign Out</a></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

// Page Body Component
class Body extends React.Component {
  render() {
    return(
      <div id="body">
      <div>
        <div className="row">
          <div className="col s12 m10 offset-m1 l9 messageboard">
            <div className="group-info center row">
              <h5 className="col s12 m8 l8 offset-m2 offset-l2">Project NexBigThing</h5>
            </div>
            <ul className="messages row">
              <li className="message card col s11">
                <small className="sender-name">Ade Balogun</small>
                <div className="message-body white-text">I will not be able to make it to the meeting</div>
                <div className="message-info"><small>Post created 12:06:2017, 11:34am</small></div>
              </li>
              <li className="message card col s11">
                <small className="sender-name">John Smith</small>
                <div className="message-body white-text">We will try to make up for your absence. Take care.</div>
                <div className="message-info"><small>Post created 12:06:2017, 11:50am</small></div>
              </li>
              <li className="message card col s11">
                <small className="sender-name">Joy Okafor</small>
                <div className="message-body white-text">Can we get someone to fill his place?</div>
                <div className="message-info"><small>Post created 12:06:2017, 12:00pm</small></div>
              </li>
              <li className="adminmessage card col s11 offset-s1">
                <small className="sender-name">John Keneddy</small>
                <div className="message-body white-text">Can we get someone to fill his place?</div>
                <div className="message-info"><small>Post created 12:06:2017, 12:00pm</small></div>
              </li>
              <li className="message card col s11">
                <small className="sender-name">Ade Balogun</small>
                <div className="message-body white-text">I will not be able to make it to the meeting</div>
                <div className="message-info"><small>Post created 12:06:2017, 11:34am</small></div>
              </li>
              <li className="message card col s11">
                <small className="sender-name">John Smith</small>
                <div className="message-body white-text">We will try to make up for your absence. Take care.</div>
                <div className="message-info"><small>Post created 12:06:2017, 11:50am</small></div>
              </li>
              <li className="message card col s11">
                <small className="sender-name">Joy Okafor</small>
                <div className="message-body white-text">Can we get someone to fill his place?</div>
                <div className="message-info"><small>Post created 12:06:2017, 12:00pm</small></div>
              </li>
              <li className="adminmessage card col s11 offset-s1">
                <small className="sender-name">John Keneddy</small>
                <div className="message-body white-text">Can we get someone to fill his place?</div>
                <div className="message-info"><small>Post created 12:06:2017, 12:00pm</small></div>
              </li>
              <li className="adminmessage card col s11 offset-s1">
                <small className="sender-name">John Keneddy</small>
                <div className="message-body white-text">Can we get someone to fill his place?</div>
                <div className="message-info"><small>Post created 12:06:2017, 12:00pm</small></div>
              </li>
              <li className="message card col s11">
                <small className="sender-name">Ade Balogun</small>
                <div className="message-body white-text">I will not be able to make it to the meeting</div>
                <div className="message-info"><small>Post created 12:06:2017, 11:34am</small></div>
              </li>
              <li className="message card col s11">
                <small className="sender-name">John Smith</small>
                <div className="message-body white-text">We will try to make up for your absence. Take care.</div>
                <div className="message-info"><small>Post created 12:06:2017, 11:50am</small></div>
              </li>
              <li className="message card col s11">
                <small className="sender-name">Joy Okafor</small>
                <div className="message-body white-text">Can we get someone to fill his place?</div>
                <div className="message-info"><small>Post created 12:06:2017, 12:00pm</small></div>
              </li>
              <li className="adminmessage card col s11 offset-s1">
                <small className="sender-name">John Keneddy</small>
                <div className="message-body white-text">Can we get someone to fill his place?</div>
                <div className="message-info"><small>Post created 12:06:2017, 12:00pm</small></div>
              </li>
            </ul>
          </div>
          {/*Side bar, visible only on large screens*/}
          <div className="members-list-container m4 l3 hide-on-med-and-down">
            <div className="row searchbox valign-wrapper">
              <div className="col s9">
                <input type="search" className="black-text" />
              </div>
              <div className="col s3">
                <span><i className="material-icons black-text">search</i></span>
              </div>
            </div>
            <div>Project NextBigThing <span className="badge">24</span></div>
            <hr />
            <span>Members List</span>
              <ul className="collection members-list">
                <li className="collection-item">Ade Balogun<a className="secondary-content"><i className="material-icons">person</i></a></li>
                <li className="collection-item">John Smith<a className="secondary-content"><i className="material-icons">person</i></a></li>
                <li className="collection-item">Joy Okafor<a className="secondary-content"><i className="material-icons">person</i></a></li>
                <li className="collection-item">John Kennedy Balogun<a className="secondary-content"><i className="material-icons red-text">person</i></a></li>
                <li className="collection-item">Ade Balogun<a className="secondary-content"><i className="material-icons">person</i></a></li>
                <li className="collection-item">John Smith<a className="secondary-content"><i className="material-icons">person</i></a></li>
                <li className="collection-item">Joy Okafor<a className="secondary-content"><i className="material-icons">person</i></a></li>
                <li className="collection-item">John Kennedy<a className="secondary-content"><i className="material-icons red-text">person</i></a></li>
            </ul>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

// Page Footer Component
class Footer extends React.Component {
  render() {
      return (
      <footer className="page-footer lime darken-4">
        <div className="container">Built by Victor Idongesit</div>
        <div className="footer-copyright">    © Andela, 2017</div>
      </footer>
    );
  }
}

// Side Nav Component
class TeamListSideNav extends React.Component {
  render() {
    if(!this.props.members) {
      return (
        <ul id="mobile-demo" className="side-nav">
          <li><a href="#"><i className="large material-icons teal-text">people_outline</i>Group Members</a></li>
          <li><div className="divider" /></li>
          <li><em>Loading...</em></li>
        </ul>
      );
    }
    return (
      <ul id="mobile-demo" className="side-nav">
        <li><a href="#"><i className="large material-icons teal-text">people_outline</i>Group Members</a></li>
        <li><div className="divider" /></li>
        {
          this.props.members.map((member, index) =>
            <TeamMember key={index} data={member} />
          )
        }
      </ul>
    );
  }
}

// Team List, Visible on Large Screens
class TeamListLargeScreen extends React.Component {
  render() {
    if(!this.props.members) {
      return (
        <ul id="mobile-demo" className="side-nav">
          <li><a href="#"><i className="large material-icons teal-text">people_outline</i>Group Members</a></li>
          <li><div className="divider" /></li>
          {/*Show 'Loading', until the members list is updated*/}
          <li><em>Loading...</em></li>
        </ul>
      );
    }
    return (
      <div id="members-list" className="m4 l3 hide-on-med-and-down">
        <ul className="collection with-header">
          <li className="collection-header">Members<a className="secondary-content"><i className="material-icons">people_outline</i></a></li>
          {
            this.props.members.map((member, index) => 
              <TeamMemberLargeScreens key={index} data={member}/>
            )
          }
        </ul>
      </div>
    );
  }
}

// Team Member Component
class TeamMember extends React.Component {
  render(){
    if(this.props.data.role === "creator") {
      return (
        <li><a href="#"><i className="material-icons red-text">person</i>{this.props.data.name}</a></li>
      );
    } else {
      return (
        <li><a href="#"><i className="material-icons teal-text">person</i>{this.props.data.name}</a></li>
      )
    }
  }
}

// Team Member Component, for Team List on Large Screens
class TeamMemberLargeScreens extends React.Component {
  render(){
    if(this.props.data.role === "creator") {
      return (
        <li className="collection-item">{this.props.data.name}<a className="secondary-content"><i className="material-icons red-text">person</i></a></li>
      );
    } else {
      return (
        <li className="collection-item">{this.props.data.name}<a className="secondary-content"><i className="material-icons">person</i></a></li>
      )
    }
  }
}

// Messages Component
class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: this.props.messages,
    }
  };

  render(){
  const noMessages = this.props.messages.length === 0;
    return (
      <ul>
        {noMessages ? (
          <h3 className="center">No Messages</h3>
        ) : (
        <div className="messages row">
          {
            this.props.messages.map((message, index) => 
              <Message key={index} data={message}/>
            )
          }
        </div>
        )}
      </ul>
    );
  }
}

// Message Component
class Message extends React.Component {
  render() {
    if(this.props.data.isComment) {
      return (
        <li className="message card col s11">
          <small className="sender-name">{this.props.data.sentBy}</small>
          <div className="message-body white-text">{this.props.data.body}</div>
          <div className="message-info"><small>{this.props.data.info}</small></div>
        </li>
      );
    } else {
      return (
        <li className="adminmessage card col s11 offset-s1">
          <small className="sender-name">{this.props.data.sentBy}</small>
          <div className="message-body white-text">{this.props.data.body}</div>
          <div className="message-info"><small>{this.props.data.info}</small></div>
        </li>
      )
    }
  }
}

// InputBox Component
class InputBox extends React.Component {
  constructor(props) {
    super(props);
    this.sendMessage = this.sendMessage.bind(this);
  }
  sendMessage(event) {
    const message = this.refs["messageBody"].value;
    const isPost = this.refs["checked"].checked;
    this.props.postMessage(message, isPost);
    // Clear input box
    this.refs["messageBody"].value="";
  };
  render() {
    return(
      <div className="message-input-box row">
        <div className="col s2 switch">
          <label><input ref="checked"  type="checkbox"/><span  className="lever"></span></label>
        </div>
        <div className="col s8">
          <input className="white-text" ref="messageBody" type="text" name="mymessage" />
        </div>
        <div className="col s2">
          <button onClick={this.sendMessage} className="btn"><i className="material-icons">send</i></button>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
  groups: state.groups,
  dataError: state.dataError,
  userDetails: state.userDetails,
  allPostItUsers: state.allPostItUsers,
  allPostItGroups: state.allPostItGroups,
  dataLoading: state.dataLoading
  };
}

export default connect(mapStateToProps)(PostMessage);