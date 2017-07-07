import React from 'react';
import 'jquery';



export default class CreateGroup extends React.Component {
  constructor(props) {
    super(props);
    this.getUsers = this.getUsers.bind(this);
    this.state = {
      allUsers: null,
      selectedMembers: [],
      // Method to add a member to the list of selected members
      addMember: (selected, memberEmail) => {
        if(selected) {
          // Add member
          this.state.selectedMembers.push(memberEmail);
        } else {
          // Remove member if added earlier
          const index = this.state.selectedMembers.indexOf(memberEmail);
          this.state.selectedMembers.splice(index, 1);
        }
      }
    }
  }
  componentDidMount() {
    this.getUsers((users) => {
      let allUsers = users;
      for(let i=0; i< users.length; i++) {
        allUsers[i].name = `${users[i].firstName} ${users[i].lastName}`
      }
      console.log(allUsers);
      this.setState({allUsers});
    });
  }
  getUsers(cb) {
    fetch('https://postit-api-victor.herokuapp.com/api/group/members', {
      method: 'GET'
    }).then((res) => res.json())
    .then((data) => cb(data))
  }
  render() {
    if(!this.state.allUsers) {
      return (
        <div>
          <Nav/>
        <div className="preloader-wrapper big active valign-wrapper">
          <div className="spinner-layer spinner-blue-only">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div><div className="gap-patch">
              <div className="circle"></div>
            </div><div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
        </div>
        </div>
      )
    }
    return(
      <div>
        <Nav/>
        <Body addMember={this.state.addMember} registeredMembers={this.state.allUsers}/>
        <Footer/>
      </div>
    );
  }
}

// Navigation Bar
class Nav extends React.Component {
  render() {
    return(
      <nav className="lime darken-4">
        <div className="nav-wrapper">
          <a href="#" id="brand" className="brand-logo lime darken-4">PostIt</a>
          <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
          <ul className="right hide-on-med-and-down">
            <li><a className="waves-effect waves-light btn">About PostIt</a>{/*</li*/}
            </li><li><a className="waves-effect waves-light btn">Sign out</a>{/*</li*/}
            </li></ul>
          <ul id="mobile-demo" className="side-nav">
            <li><a href="#" className="black-text">About PostIt</a></li>
          </ul>
        </div>
      </nav>
    );
  }
}

// Page Body
class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMembers : this.props.selectedMembers,
      switchTab: (button, tabName) => {
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
      },

    }
  }
  componentDidMount() {
    this.refs['defaultTab'].click();

  }
  render() {
    return(
      <div id="body">
      <div id="main">
        <div className="tab">
          <button className="tablinks" id="defaultTab" ref="defaultTab" onClick={() => this.state.switchTab("defaultTab", 'info')}>Group info</button>
          <button className="tablinks" id="add-members" ref="add-members" onClick={() => this.state.switchTab("add-members", 'members')}>Add members</button>
        </div>
        <div id="info" ref="info" className="tabcontent">
          <div className="row">
            <div className="col s10 m8 l6">
              <div className="group-details">
                <h4 className="center">Enter group details</h4>
                <form>
                  <div>
                    <input type="text" name="group-title" placeholder="Group Title" />
                  </div>
                  <div>
                    <textarea id="groupDescription" type="text" className="materialize-textarea" placeholder="Description" name="group-desc" defaultValue={""} />
                  </div>
                </form>
                <button className="btn" onClick={() => this.state.switchTab("add-members", 'members')}>Next &gt;&gt;</button>
              </div>
            </div>
          </div>
        </div>
        <div id="members" ref="members" className="tabcontent">
          <div className="row">
            <div className="col s10 m8 l6">
              <div>
                <ul className="collection with-header">
                  <li className="collection-header"><h4>Add members</h4></li>
                  {
                    this.props.registeredMembers.map((member, index) => 
                      <RegisteredMember addMember={this.props.addMember} key={index} data={member}/>
                    )
                  }
                </ul>
              </div>
              <div>
                <button className="btn" onClick={() => this.state.switchTab("defaultTab", 'info')}>&lt;&lt; Group info</button>
                <button className="btn">Create group</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

// Component to contain a member loaded from the database
class RegisteredMember extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      // Method to decide if a member is to be added or not
      set: (state, email) => {
        this.state.selected = !this.state.selected;
        this.props.addMember(this.state.selected, email);
      }
    }
  }
  render() {
    return (
      <li className="collection-item">
        <input id={this.props.data.email} 
        type="checkbox"
        onClick={() => this.state.set(event, this.props.data.email)}
        ref={this.props.data.email} />
        <label className="brown-text" htmlFor={ this.props.data.email }>{this.props.data.name} <small className="red-text">{this.props.data.email}</small></label>
      </li>
    )
  }
}
// Page Footer
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

