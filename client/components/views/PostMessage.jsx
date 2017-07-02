import React from 'react';

export default class PostMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        messages: [{
          isComment: true,
          sender: "Ade Balogun",
          body: "I will not be able to make it to the meeting.",
          info: "Post created 12:06:2017, 11:34am"
        },
        {
          isComment: true,
          sender: "John Smith",
          body: "We will try to make up for your absence. Take care.",
          info: "Post created 12:06:2017, 11:50am"
        },
        {
          isComment: true,
          sender: "Joy Okafor",
          body: "Can we get someone to fill his place?",
          info: "Post created 12:06:2017, 11:55am"
        },
        {
          isComment: false,
          sender: "John Keneddy",
          body: "I will add a new member to take his place.",
          info: "Post created 12:06:2017, 12:00pm"
        }],
        members: [ {name: "Ade Balogun", role: "member"},
         {name: "John Smith", role: "member"},
         {name: "Joy Okafor", role: "member"},
         {name: "John Kennedy", role: "admin"} ]
    }
  }
  render() {
    return(
      <div>
        <Nav members={this.state.members}/>
        <Body messages= {this.state.messages} members={this.state.members}/>
      </div>
    );
  }
}

// Navigation Component
class Nav extends React.Component {
  render() {
    return(
      <nav className="lime darken-4">
        <div className="nav-wrapper">
          <a href="#" id="brand" className="brand-logo">PostIt</a>
          <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
          <ul className="right hide-on-med-and-down">
            <li><a className="waves-effect waves-light btn">About PostIt</a>{/*</li*/}
            </li><li><a className="waves-effect waves-light btn">Sign out</a>{/*</li*/}
            </li>
          </ul>
          <TeamListSideNav members={this.props.members}/>
        </div>
      </nav>
    );
  }
}

// Page Body Component
class Body extends React.Component {
  render() {
    return(
      <div id="body">
        <div id="main" className="row">
          <div className="col s12 m8 l9 messageboard">
            <div className="group-info">
              <h5 className="center">Project NexBigThing</h5>
            </div>
            <Messages messages={this.props.messages}/>
            {/* Message input box */}
            <InputBox/>
          </div>
          {/*Side bar, visible only on large screens*/}
          <TeamListLargeScreen members={this.props.members}/>
        </div>
        <Footer/>
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
    if(this.props.data.role === "admin") {
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
    if(this.props.data.role === "admin") {
      return (
        <li className="collection-item">John Kennedy<a className="secondary-content"><i className="material-icons red-text">person</i></a></li>
      );
    } else {
      return (
        <li className="collection-item">Ade Balogun<a className="secondary-content"><i className="material-icons">person</i></a></li>
      )
    }
  }
}

// Messages Component
class Messages extends React.Component {
  render(){
    return (
      <ul className="messages row">
        {
          this.props.messages.map((message, index) => 
            <Message key={index} data={message}/>
          )
        }
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
          <small className="sender-name">{this.props.data.sender}</small>
          <div className="message-body white-text">{this.props.data.body}</div>
          <div className="message-info"><small>{this.props.data.info}</small></div>
        </li>
      );
    } else {
      return (
        <li className="adminmessage card col s11 offset-s1">
          <small className="sender-name">{this.props.data.sender}</small>
          <div className="message-body white-text">{this.props.data.body}</div>
          <div className="message-info"><small>{this.props.data.info}</small></div>
        </li>
      )
    }
  }
}

// InputBox Component
class InputBox extends React.Component {
  render() {
    return(
      <div className="message-input-box row">
        <div className="col s9">
          <input className="white-text" type="text" name="mymessage" />
        </div>
        <div className="col s3">
          <button className="btn"><i className="material-icons">send</i></button>
        </div>
      </div>
    );
  }
}