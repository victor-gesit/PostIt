import React from 'react';
/**
 * React component to display a modal for deleting a member
 */
export class Spinner extends React.Component {
  /**
   * Render method of React component
   * @returns {Object} Returns the DOM object to be rendered
   */
  render() {
    return (
        <div className="preloader-wrapper loader big active valign-wrapper">
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
    );
  }
}

export default Spinner;
