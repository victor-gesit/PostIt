/* eslint-env browser */
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * React component to hold the groups a user belongs to
 */
export default class Groups extends React.Component {
  /**
   * Constructor initializes component parameters
   * @param {Object} props Properties passed from parent component
   */
  constructor(props) {
    super(props);
    this.loadMore = this.loadMore.bind(this);
  }
  /**
   * Method to load more groups from the DB
   * @returns {undefined} This method returns nothing
   */
  loadMore() {
    // Load all registered members
    const token = localStorage.getItem('token');
    const allLoaded = this.props.store.allUserGroups.meta.allLoaded;
    this.props.store.getAllGroupsForUser(token, allLoaded);
  }
  /**
   * Render method of React component
   * @returns {undefined} This function returns nothing
   */
  render() {
    const groupState = this.props.store.allUserGroups;
    const allUserGroups = groupState.userGroups;
    const allLoaded = Object.keys(allUserGroups).length;
    const groupCount = groupState.meta.count;
    return (
      <ul className="list-side-nav">
        {
          Object.keys(allUserGroups).map((groupId, index) =>
            <UserGroup store={this.props.store} key={index}
              groupDetails={allUserGroups[groupId].info} />
          )
        }
        {
          allLoaded < groupCount ? (
            <div className="center">
            <button className="btn"
              id="loadMoreButton"
              onClick={ () => this.loadMore()}>...Load More</button>
            </div>
          ) : (
            <div/>
          )
        }
      </ul>
    );
  }
}

/**
 * React component that holds details of each group a user belongs to
 */
export class UserGroup extends React.Component {
  /**
   * Object constructor to initialize object properties and methods
   * @param {Object} props Component properties passed from parent component
   */
  constructor(props) {
    super(props);
    this.loadMessagesAndMembers = this.loadMessagesAndMembers.bind(this);
  }
  /**
   * Method called to prepare the store by getting the
   * members of a group and messages in the group
   * @param {Object} event fired when the link
   * to load details of a group is clicked
   * @returns {undefined} This method returns nothing
   */
  loadMessagesAndMembers(event) {
    const groupId = event.target.id;
    const token = localStorage.getItem('token');
    this.props.store.getMessages(groupId, token);

    // Load user groups
    this.props.store.getGroupsForUser(token);
    // Load all members of the group
    this.props.store.getGroupMembers(groupId, token);
    // Load messages into the conversation page
    this.props.store.loadMessages(groupId);
  }
  /**
   * Render method of React component
   * @returns {Object} Returns the DOM object to be rendered
   */
  render() {
    const groupDetails = this.props.groupDetails;
    return (
     <li><Link onClick={this.loadMessagesAndMembers}
      to={`/postmessage/${groupDetails.id}`} id={groupDetails.id} >
         <i className="material-icons teal-text">people_outline</i>
         {groupDetails.title}</Link></li>
    );
  }
}
