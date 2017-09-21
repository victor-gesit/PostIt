import React from 'react';

/**
 * A component that loads a modal for deleting a member from a group
 */
export default class LeaveGroupModal extends React.Component {
  /**
   * Render method of React component
   * @returns {Object} Returns the DOM object to be rendered
   */
  render() {
    return (
      <div id="leaveGroupModal" className="modal grey">
        <div className="modal-content">
          <h5 className="orange-text">Leave Group?</h5>
          <p className="white-text">You will be removed from this group</p>
        </div>
        <div className="modal-footer">
          <button onClick={this.props.leaveGroup}
            id="leaveGroupButton"
            className="modal-action modal-close waves-effect waves-green btn-flat green-text">
              Leave</button>
          <button className="modal-action modal-close waves-effect waves-green btn-flat green-text">
              Cancel</button>
        </div>
      </div>
    );
  }
}
