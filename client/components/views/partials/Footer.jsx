import React from 'react';

/**
 * You do not need to have this as a class component.
 */
export default class Footer extends React.Component {
  /**
   * Render method of React component
   * @returns {Object} Returns the DOM object to be rendered
   */
  render() {
    return (
      <footer className="page-footer pink darken-4">
        <div className="shift-left ">
          <span className="footer-copyright">
            Built by Victor Idongesit © Andela, 2017</span>
        </div>
      </footer>
    );
  }
}
