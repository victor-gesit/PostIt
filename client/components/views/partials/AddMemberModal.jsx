/* eslint-env browser */
import React from 'react';
import _ from 'lodash';
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
    this.addMember = this.addMember.bind(this);
    this.addNewMembers = this.addNewMembers.bind(this);
    this.loadMore = this.loadMore.bind(this);
  }
  /**
   * This functions is called before the component
   * is rendered to load the members on PostIt
   * @returns {undefined} This function returns nothing
   */
  componentWillMount() {
    const token = localStorage.getItem('token');
    this.props.store.getPostItMembers(token);
  }
  /**
   * Method to load more users from the DB, to be added to a newly created group
   * @returns {undefined} This method returns nothing
   */
  loadMore() {
    // Load all registered members
    const token = localStorage.getItem('token');
    const allLoaded = this.props.store.postItInfo.members.meta.allLoaded;
    this.props.store.getPostItMembers(token, allLoaded);
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
   * A method to add new members to a group
   * @returns {undefined} This function returns nothing
   */
  addNewMembers() {
    const groupId = this.props.store.match.params.groupId;
    const token = localStorage.getItem('token');
    const emails = this.selectedMembers;
    if (emails.length > 0) {
      this.props.store.addUser(emails, groupId, token);
    }
  }
  /**
   * Render method of React component
   * @returns {Object} Returns the DOM object to be rendered
   */
  render() {
    const groupId = this.props.store.match.params.groupId;
    const group = this.props.store.groups.userGroups[groupId] || {};
    const groupMembers = group.members;
    const postItMembers = this.props.store.postItInfo.members.postItMembers;
    const membersCount = this.props.store.postItInfo.members.meta.count;
    const allLoaded = this.props.store.postItInfo.members.meta.allLoaded;
    const filteredMembers = Object.keys(postItMembers).filter(userId =>
      !_.has(groupMembers, userId)
    );
    return (
      <div id="addMemberModal" className="modal grey">
        <div className="modal-content">
            <div>
              <form>
                <h3 className="center">Add members</h3>
                <div className="registeredMembersList">
                  {
                    filteredMembers.length > 0 ? (
                      <div>
                    <ul className="collection">
                      {
                      filteredMembers.map((userId, index) =>
                        <RegisteredMember
                          addMember={this.addMember} key={index} id={userId}
                          userInfo={postItMembers[userId]}/>)
                      }
                    </ul>
                      {
                        allLoaded < membersCount ? (
                          <div className="center">
                          <button className="btn"
                            id="loadMoreButton"
                            onClick={ () => this.loadMore()}>...Load More
                          </button>
                          </div>
                        ) : (
                          <div/>
                        )
                      }
                    </div>
                    ) : (
                      <h4 className="center grey-text">No members to add</h4>
                    )
                  }
                </div>
              </form>
            </div>
        </div>
        <div className="modal-footer">
          <button onClick={this.addNewMembers}
            id="addMembersButton"
            className="modal-action modal-close waves-effectwaves-green btn-flat green-text">
              Add</button>
          <button
            className="modal-action modal-close waves-effect waves-green btn-flat green-text">
              Cancel</button>
        </div>
      </div>
    );
  }
}


/**
 *  Component to contain a member loaded from the database
 */
export class RegisteredMember extends React.Component {
  /**
   * @param {Object} props Properties passed from parent component
   */
  constructor(props) {
    super(props);
    this.selected = false;
    this.addOrRemove = this.addOrRemove.bind(this);
  }
  /**
   * Method to add or remove members from a group
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
          className="userCheckbox"
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
