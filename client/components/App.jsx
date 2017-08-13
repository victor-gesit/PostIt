import React, { Component } from 'react';
import Main from './Main.jsx';

/**
 * Parent component for the routes
 */
class App extends React.Component {
  /**
   * Render method of React component
   * @returns {Object} Returns the DOM object to be rendered
   */
  render() {
    return (
      <div>
        <Main/>
      </div>
    );
  }
}
export default App;
