import React from 'react';

class MessageBoard extends React.Component {
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
          <a href="#" id="brand" className="brand-logo">PostIt</a>
          <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
          <ul className="right hide-on-med-and-down">
            <li><a className="waves-effect waves-light btn">About PostIt</a>{/*</li*/}
            </li><li><a className="waves-effect waves-light btn">Sign out</a>{/*</li*/}
            </li></ul>
          <ul id="mobile-demo" className="side-nav">
            <li><a href="#">About PostIt</a></li>
          </ul>
        </div>
      </nav>
    );
  }
}

class Body extends React.Component {
  render() {
    return(
      <div id="body">
      <div id="main">
        <h3 className="board-title center white-text">Message Board</h3>
        <div className="row">
          <div className="collection col s12 m8 l8 offset-m2 offset-l2">
            <a href="#" className="collection-item">
              <span className="secondary-content right new badge">4</span>
              Project NextBigThing
              <small className="grey-text">Created by Jane Doe</small>
            </a>
            <a href="#" className="collection-item">
              <span className="secondary-content right new badge">4</span>
              Project NextBigThing
              <small className="grey-text">Created by John Smith</small>
            </a>
            <a href="#" className="collection-item">
              <span className="secondary-content right new badge">4</span>
              Project DisruptiveTech
              <small className="grey-text">Created by Joy Okafor</small>
            </a>
            <a href="#" className="collection-item">
              <span className="secondary-content right new badge">4</span>
              Project MakeItHappen
              <small className="grey-text">Created by Abel Kennedy</small>
            </a>
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



export default MessageBoard;