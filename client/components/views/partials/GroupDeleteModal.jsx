import React from 'react';

/**
 * A component that loads a modal for deleting a member from a group
 */
export default class GroupDeleteModal extends React.Component {
  /**
   * Render method of React component
   * @returns {Object} Returns the DOM object to be rendered
   */
  render() {
    return (
      <div id="groupDeleteModal" className="modal grey">
        <div className="modal-content">
          <h5 className="orange-text">Delete Group?</h5>
          <p className="white-text">This group will be deleted.</p>
        </div>
        <div className="modal-footer">
          <a href="#!" onClick={this.props.deleteGroup}
            className="modal-action modal-close waves-effect waves-green \
            btn-flat green-text">Delete</a>
          <a className="modal-action modal-close waves-effect waves-green \
            btn-flat green-text">Cancel</a>
        </div>
      </div>
    );
  }
}
