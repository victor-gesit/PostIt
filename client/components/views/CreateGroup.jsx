import React from 'react';

export default class CreateGroup extends React.Component {
  render() {
    return(
      <div>
        <Nav/>
        <Body/>
        <Footer/>
      </div>
    );
  }
}


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

class Body extends React.Component {
  render() {
    return(
<div>
        <div className="tab">
          <button className="tablinks" id="defaultTab" onclick={switchTab(event, 'info')}>Group info</button>
          <button className="tablinks" id="add-members" onclick={switchTab(event, 'members')}>Add members</button>
        </div>
        <div id="info" className="tabcontent">
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
                <button className="btn" onclick="document.getElementById('add-members').click()">Next &gt;&gt;</button>
              </div>
            </div>
          </div>
        </div>
        <div id="members" className="tabcontent">
          <div className="row">
            <div className="col s10 m8 l6">
              <form>
                <ul className="collection with-header">
                  <li className="collection-header"><h4>Add members</h4></li>
                  <li className="collection-item">
                    <input id="cb1" type="checkbox" name="IDforAdeBalogun" />
                    <label htmlFor="cb1">Ade Balogun <small> adebalogun@yahoo.com</small></label>
                  </li>
                  <li className="collection-item">
                    <input id="cb2" type="checkbox" name="IDforAdeBalogun" />
                    <label htmlFor="cb2">John Smith <small>johnsmith@yahoo.com</small></label>
                  </li>
                  <li className="collection-item">
                    <input id="cb3" type="checkbox" name="IDforAdeBalogun" />
                    <label htmlFor="cb3">Sani Danjuma <small>sanidanjuma@gmail.com</small></label>
                  </li>
                  <li className="collection-item">
                    <input id="cb4" type="checkbox" name="IDforAdeBalogun" />
                    <label htmlFor="cb4">Joy Okafor <small>joyokafor@yahoo.com</small></label>
                  </li>
                </ul>
              </form>
              <div>
                <button className="btn" onclick="document.getElementById('defaultTab').click()">&lt;&lt; Group info</button>
                <button className="btn">Create group</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


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


