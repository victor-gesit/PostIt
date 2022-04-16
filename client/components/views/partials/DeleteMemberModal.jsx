import React from 'react';
/**
 * React component to display a modal for deleting a member
 */
export default class DeleteMemberModal extends React.Component {
  /**
   * Render method of React component
   * @returns {Object} Returns the DOM object to be rendered
   */
  render() {
    return (
      <div id="deleteMemberModal" className="modal grey">
        <div className="modal-content">
          <h5 className="orange-text">Delete Member?</h5>
          <p className="white-text">
            This group member will be removed from this group.</p>
        </div>
        <div className="modal-footer">
          <button onClick={this.props.deleteMember}
            id="deleteMemberButton"
            className="modal-action modal-close waves-effect waves-green btn-flat green-text">
            Delete</button>
          <button
            className="modal-action modal-close waves-effect waves-green btn-flat green-text">
            Cancel</button>
        </div>
      </div>
    );
  }
}
