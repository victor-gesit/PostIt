/* eslint-env browser */
import React from 'react';
import Spinner from '../../../components/views/partials/Spinner.jsx';
/**
 * A React component that displays the groups a user belongs to, as a list
 */
export default class GroupList extends React.Component {
  /**
   * Constructor initializes component parameters
   * @param {Object} props Properties passed from parent component
   */
  constructor(props) {
    super(props);
    this.searchGroup = this.searchGroup.bind(this);
  }
  /**
   * Method called to search for members of a group
   * @returns {undefined} This method returns nothing
   */
  searchGroup() {
    const searchQuery = this.searchTerm.value;
    const groupId = this.props.store.match.params.groupId;
    const token = localStorage.getItem('token');
    this.props.store.searchGroup(token, groupId, searchQuery);
  }
  /**
   * Render method of React component
   * @returns {Object} Returns the DOM object to be rendered
   */
  render() {
    const groupId = this.props.store.match.params.groupId;
    const groupLoaded = this.props.store.groups.userGroups[groupId];
    const titleLoaded = this.props.store.allUserGroups.userGroups[groupId];
    const userDetails = this.props.store.appInfo.userDetails;
    let groupCount = '...';
    let groupTitle = '...';
    let groupMembers;
    let creatorEmail;
    // Get group title if loading is complete
    if (titleLoaded) {
      groupTitle = titleLoaded.info.title;
      creatorEmail = titleLoaded.info.creatorEmail;
    }
    // Load the group members if group has loaded
    if (groupLoaded) {
      groupMembers = this.props.store.groups.userGroups[groupId].members;
      if (groupMembers) {
        groupCount = Object.keys(groupMembers).length;
      }
    }
    return (
      <div id="memberList" className="members-list-container m4 l3">
        <div className="row searchbox valign-wrapper">
          <div className="col s9">
            <input placeholder="Search group"
              id="searchGroupInput"
              onKeyUp={this.searchGroup}
              ref={(searchTerm) => { this.searchTerm = searchTerm; }}
              type="search" className="black-text" />
          </div>
          <div className="col s3">
            <span><i className="material-icons black-text">search</i></span>
          </div>
        </div>
        {
          groupLoaded ? (
            <div>{groupTitle} <span className="badge">{groupCount}</span></div>
          ) : (
            <div>{groupTitle} <span className="badge"></span></div>
          )
        }
        <hr />
        <p><span>Members List<a href="#addMemberModal"
          className="secondary-content modal-trigger green-text">
          <i className="material-icons">person_add</i></a></span>
        </p>
        {
          groupLoaded ?
          (
            <GroupMembers userEmail={userDetails.email}
              creatorEmail={creatorEmail}
              groupMembers={groupMembers}/>
          ) : (
            <Spinner/>
          )
        }
      </div>
    );
  }
}

/**
 * A React component that displays all the membrs of a group
 */
export class GroupMembers extends React.Component {
  /**
   * Render method of React component
   * @returns {Object} Returns the DOM object to be rendered
   */
  render() {
    const groupMembers = this.props.groupMembers;
    const creatorEmail = this.props.creatorEmail;
    const userEmail = this.props.userEmail;
    const userIsCreator = userEmail === creatorEmail;
    let membersList = [];

    if (groupMembers) {
      membersList = Object.keys(groupMembers).map(memberId =>
        groupMembers[memberId]
      );
    }
    return (
      <ul className="collection members-list">
        {
          membersList.length > 0 ? (
            membersList.map((member, index) =>
              (
              <GroupMember userIsCreator={userIsCreator} key={index}
                creatorEmail={creatorEmail} memberDetails={member}/>
              )
            )
          ) : (
            <li className="center red-text">
              No member with that name
            </li>
          )
        }

      </ul>
    );
  }
}
/**
 * React component that displays the details of each member of a group
 */
export class GroupMember extends React.Component {
  /**
   * Render method of React component
   * @returns {Object} Returns the DOM object to be rendered
   */
  render() {
    const memberDetails = this.props.memberDetails;
    const creatorEmail = this.props.creatorEmail;
    const userIsCreator = this.props.userIsCreator;
    let styleClassName = 'secondary-content modal-trigger green-text text-darken-4',
      icon = 'person';
    if (userIsCreator) {
      styleClassName = 'secondary-content modal-trigger red-text';
      icon = 'clear';
    }
    return (
          memberDetails.email === creatorEmail ?
          (
            <li className="collection-item">
              {memberDetails.firstName} {memberDetails.lastName}<br />
              <small className="grey-text">{memberDetails.email}</small>
              <a id={memberDetails.id} value={memberDetails.name}
                className="secondary-content modal-trigger pink-text text-darken-4">
              <i className="material-icons">person</i></a>
            </li>
          ) : (
            <li className="collection-item">
              {memberDetails.firstName} {memberDetails.lastName}<br />
              <small className="grey-text">{memberDetails.email}</small>
              {
                userIsCreator ? (
              <a href='#deleteMemberModal' id={memberDetails.id}
              value={memberDetails.name}
                className={styleClassName}>
              <i className="material-icons">{icon}</i></a>
                ) : (
              <a id={memberDetails.id} value={memberDetails.name}
                className={styleClassName}>
              <i className="material-icons">{icon}</i></a>
                )
              }
            </li>
          )
    );
  }
}
