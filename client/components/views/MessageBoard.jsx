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
              <li><a href="#"><i className="large material-icons black-text">info</i>About PostIt</a></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

class Body extends React.Component {
  render() {
    return(
      <div id="body">
        <div id="main">
          <h3 className="board-title center black-text">Message Board</h3>
          {/* Groups */}
          <div className="row">
            {/* A sample Group */}
            <div className="col s12 m6 l4">
              <div className="card">
                <div className="card-image waves-effect waves-block waves-light">
                  <img className="activator tooltipped" data-position="top" data-delay={1000} data-tooltip="Click for group info" src="images/fire2.png" />
                </div>
                <div className="card-content">
                  <div>
                    <a href="#" className="card-title grey-text text-darken-4">NextBigThing<span className="badge new pink">4</span></a>
                    <p className="blue-text">Created by Johnson Thomas</p>
                  </div>
                </div>
                <div className="card-reveal">
                  <div>
                    <span className="card-title purple-text text-darken-4">Project NextBigThing<i className="material-icons right">close</i></span>
                    <hr />
                  </div>
                  <div className="group-info">	
                    <p className="black-text">This is a group where we discuss a KickAss project, and what the project basically does is... Kick Ass!! his is a group where we discuss a KickAss project, and what the project basically does is... Kick Ass!!his is a group where we discuss a KickAss project, and what the project basically does is... Kick Ass!!</p>
                    <hr />
                  </div>
                </div>
              </div>
            </div>
            {/* Another Sample Group */}
            <div className="col s12 m6 l4">
              <div className="card">
                <div className="card-image waves-effect waves-block waves-light">
                  <img className="activator tooltipped" data-position="top" data-delay={1000} data-tooltip="Click for group info" src="images/fire2.png" />
                </div>
                <div className="card-content">
                  <div>
                    <a href="#" className="card-title grey-text text-darken-4">DisruptiveTech<span className="badge new pink">3</span></a>
                    <p className="blue-text">Created by Jane Doe</p>
                  </div>
                </div>
                <div className="card-reveal">
                  <div>
                    <span className="card-title purple-text text-darken-4">Project DisruptiveIt<i className="material-icons right">close</i></span>
                    <hr />
                  </div>
                  <div className="group-info">	
                    <p className="black-text">This is a group where we discuss a KickAss project, and what the project basically does is... Kick Ass!! his is a group where we discuss a KickAss project, and what the project basically does is... Kick Ass!!his is a group where we discuss a KickAss project, and what the project basically does is... Kick Ass!!</p>
                    <hr />
                  </div>
                </div>	
              </div>
            </div>
            {/* A Third Sample Group */}
            <div className="col s12 m6 l4">
              <div className="card">
                <div className="card-image waves-effect waves-block waves-light">
                  <img className="activator tooltipped" data-position="top" data-delay={1000} data-tooltip="Click for group info" src="images/fire2.png" />
                </div>
                <div className="card-content">
                  <div>
                    <a href="#" className="card-title grey-text text-darken-4">MakeItHappen</a>
                    <p className="blue-text">Created by John Roe</p>
                  </div>
                </div>
                <div className="card-reveal">
                  <div>
                    <span className="card-title purple-text text-darken-4">Project MakeItHappen<i className="material-icons right">close</i></span>
                    <hr />
                  </div>
                  <div className="group-info">	
                    <p className="black-text">This is a group where we discuss a KickAss project, and what the project basically does is... Kick Ass!! his is a group where we discuss a KickAss project, and what the project basically does is... Kick Ass!!his is a group where we discuss a KickAss project, and what the project basically does is... Kick Ass!!</p>
                    <hr />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*End of Groups*/}
        </div>
        <Pagination/>
      </div>
    );
  }
}

class Footer extends React.Component {
  render() {
      return (
      <footer className="page-footer pink darken-4">
        <div className="shift-left white-text">Built by Victor Idongesit</div>
        <div className="footer-copyright shift-left">    © Andela, 2017</div>
      </footer>
    );
  }
}

class Pagination extends React.Component {
  render() {
    return (
      <ul className="pagination center">
        <li className="disabled"><a href="#!"><i className="material-icons">chevron_left</i></a></li>
        <li className="active pink"><a href="#!">1</a></li>
        <li className="waves-effect"><a href="#!">2</a></li>
        <li className="waves-effect"><a href="#!">3</a></li>
        <li className="waves-effect"><a href="#!">4</a></li>
        <li className="waves-effect"><a href="#!">5</a></li>
        <li className="waves-effect"><a href="#!"><i className="material-icons">chevron_right</i></a></li>
      </ul>
    )
  }
}


export default MessageBoard;