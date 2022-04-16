import React from 'react';
/**
 * React componet that displays Navigation Bar
 */
export default class AuthNav extends React.Component {
  /**
   * Component method called after component has rendered to
   * initialize side nav
   * @returns {undefined} This method returns nothing
   */
  componentDidMount() {
    $('#sidenav-overlay').trigger('click');
    // Initialize the side nav
    if ($('.button-collapse').sideNav) {
      $('.button-collapse').sideNav({
        closeOnClick: true,
        draggable: true
      });
    }
  }
  /**
   * Render method of React component
   * @returns {Object} Returns the DOM object to be rendered
   */
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="pink darken-4" role="navigation">
          <div className="nav-wrapper">
            <a href="#" id="brand" className="brand-logo">PostIt</a>
            <a href="#" data-activates="mobile-demo"
              className="button-collapse"><i
                className="material-icons">menu</i></a>
            <ul className="right hide-on-med-and-down">
            </ul>
            <ul id="mobile-demo" className="side-nav">
              <li>
                <div className="user-details">
                  <div className="background">
                    <img src="images/fire2.png" />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
