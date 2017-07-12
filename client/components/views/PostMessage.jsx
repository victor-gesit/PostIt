import React from 'react';

export default class PostMessage extends React.Component {
  constructor(props) {
    super(props);
    this.getMessages = this.getMessages.bind(this);
    this.getMembers = this.getMembers.bind(this);
    this.getFormattedTimeStamp = this.getFormattedTimeStamp.bind(this);
    this.postMessage = this.postMessage.bind(this);
    this.state = {
        allMessages : null,
        allMembers: null,
        emptyMessages: [],
        creatorEmail: "victor4l@yahoo.com",
        messages: [{
          isComment: true,
          sentBy: "Ade Balogun",
          body: "I will not be able to make it to the meeting.",
          info: "Post created 12:06:2017, 11:34am"
        },
        {
          isComment: true,
          sentBy: "John Smith",
          body: "We will try to make up for your absence. Take care.",
          info: "Post created 12:06:2017, 11:50am"
        },
        {
          isComment: true,
          sentBy: "Joy Okafor",
          body: "Can we get someone to fill his place?",
          info: "Post created 12:06:2017, 11:55am"
        },
        {
          isComment: false,
          sentBy: "John Keneddy",
          body: "I will add a new member to take his place.",
          info: "Post created 12:06:2017, 12:00pm"
        }],
        members: [ {name: "Ade Balogun", role: "member"},
         {name: "John Smith", role: "member"},
         {name: "Joy Okafor", role: "member"},
         {name: "John Kennedy", role: "creator"} ]
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
  postMessage(messageBody, isPost) {
    const url = `https://postit-api-victor.herokuapp.com/api/group/542d52a8-45ee-4ea8-bdd1-9baf3b8588ee/message`
    var details = {
        sender: 'Client Side',
        isComment: !isPost,
        message: messageBody
    };
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody
    }).then((res) => res.json())
    .then((data) => {
      // Append message info to the message
      this.getFormattedTimeStamp(data.createdAt, (formattedDate) => {
        data.info = `Post created ${formattedDate}`;
        let previousMessages = this.state.allMessages;
        previousMessages.push(data);
        this.setState({ allMessages: previousMessages });
      });
    });
  }
  // Load all messages from a group
  getMessages(callback) {
    const url = `https://postit-api-victor.herokuapp.com/api/group/542d52a8-45ee-4ea8-bdd1-9baf3b8588ee/messages`;
    fetch(url, {
      method: 'GET'
    }).then((res) => res.json())
    .then((data) => {
      callback(data)
    });
  }
  // Load all the members of a group
  getMembers(callback) {
    const url = `https://postit-api-victor.herokuapp.com/api/group/542d52a8-45ee-4ea8-bdd1-9baf3b8588ee/members`;
    fetch(url, {
      method: 'GET'
    }).then((res) => res.json())
    .then((data) => callback(data));
  }
  render() {
    if(!this.state.allMessages) {
      // Run a spinner, until messages are loaded
      return (
        <div>
        <Nav members= {this.state.members}/>
          <div id="body">
            <div id="main">
              <div className="preloader-background">
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
            </div>
          <Footer/>
          </div>
        </div>
      )
    }
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
          <div className="col s12 m8 offset-m1 l9 messageboard">
            <div className="group-info">
              <h5 className="center">Project NexBigThing</h5>
            </div>
            <Messages messages={this.props.messages}/>
            {/* Message input box */}
            <InputBox postMessage={this.props.postMessage}/>
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