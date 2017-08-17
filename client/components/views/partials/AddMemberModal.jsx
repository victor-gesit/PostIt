/* eslint-env browser */
import React from 'react';
import jwtDecode from 'jwt-decode';
/**
 * A Component that displays a modal for adding a member
 */
export default class AddMemberModal extends React.Component {
  /**
   * Constructor initializes component parameters
   * @param {Object} props Properties passed from parent component
   */
  constructor(props) {
    super(props);
    this.selectedMembers = [];
    this.registeredMembers = {};
    this.addMember = this.addMember.bind(this);
    this.addNewMembers = this.addNewMembers.bind(this);
  }
  /**
   * @returns {undefined} This function returns nothing
   */
  componentWillMount() {
    const token = localStorage.getItem('token');
    this.props.store.getPostItMembers(token);
  }
  /**
   * @returns {undefined} This function returns nothing
   */
  componentWillUpdate() {
    this.registeredMembers = this.props.store.postItInfo.members.postItMembers;
  }
  /**
   * Method to add members to the group
   * @param {Boolean} selected indicates that a user is selected to be added
   * @param {String} memberEmail is the email of the user to be added
   * @returns {undefined} This function returns nothing
   */
  addMember(selected, memberEmail) {
    if (selected) {
      // Add member
      this.selectedMembers.push(memberEmail);
    } else {
      // Remove member if added earlier
      const index = this.selectedMembers.indexOf(memberEmail);
      this.selectedMembers.splice(index, 1);
    }
  }
  /**
   * A function to add new members to a group
   * @returns {undefined} This function returns nothing
   */
  addNewMembers() {
    const groupId = this.props.store.match.params.groupId;
    const token = localStorage.getItem('token');
    const decode = jwtDecode(token);
    const adderId = decode.id;
    const emails = this.selectedMembers;
    if (emails.length > 0) {
      this.props.store.addUser(emails, groupId, adderId, token);
    }
  }
  /**
   * Render method of React component
   * @returns {Object} Returns the DOM object to be rendered
   */
  render() {
    return (
      <div id="addMemberModal" className="modal grey">
        <div className="modal-content">
            <div>
              <form>
                <h3 className="center">Add members</h3>
                <div className="registeredMembersList">
                  <ul className="collection">
                    {
                    Object.keys(this.registeredMembers).map((userId, index) =>
                      <RegisteredMember addMember={this.addMember} key={index} id={userId}
                        userInfo={this.registeredMembers[userId]}/>)
                    }
                  </ul>
                </div>
              </form>
            </div>
        </div>
        <div className="modal-footer">
          <button onClick={this.addNewMembers}
            className="modal-action modal-close waves-effectwaves-green btn-flat green-text">
              Add</button>
          <button className="modal-action modal-close waves-effect waves-green btn-flat green-text">
              Cancel</button>
        </div>
      </div>
    );
  }
}


/**
 *  Component to contain a member loaded from the database
 */
class RegisteredMember extends React.Component {
  /**
   * @param {Object} props Properties passed from parent component
   */
  constructor(props) {
    super(props);
    this.selected = false;
    this.addOrRemove = this.addOrRemove.bind(this);
  }
  /**
   * @param {String} email email of the member to be added to the group
   * @returns {undefined} This method returns nothing
   */
  addOrRemove(email) {
    this.selected = !this.selected;
    this.props.addMember(this.selected, email);
  }
  /**
   * Render method of React component
   * @returns {undefined} This function returns nothing
   */
  render() {
    const userInfo = this.props.userInfo;
    return (
      <li className="collection-item">
        <input id={this.props.userInfo.email}
          type="checkbox"
          onClick={() => this.addOrRemove(this.props.userInfo.email)}
          ref={this.props.userInfo.email} />
        <label className="brown-text" htmlFor={this.props.userInfo.email}>
          {userInfo.firstName} {userInfo.lastName}
          <small className="red-text"> { this.props.userInfo.email }</small>
        </label>
      </li>
    );
  }
}
