import React from 'react';
import jwtDecode from 'jwt-decode';
/**
 * A React component that displays the groups a user belongs to, as a list
 */
export default class GroupList extends React.Component {
  /**
   * Render method of React component
   * @returns {Object} Returns the DOM object to be rendered
   */
  render() {
    const groupId = localStorage.getItem('groupId');
    const groupLoaded = this.props.store.groups.userGroups[groupId];
    const titleLoaded = this.props.store.allUserGroups.userGroups[groupId];
    const token = localStorage.getItem('token');
    const userDetails = jwtDecode(token);
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
            <input type="search" className="black-text" />
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
            <GroupMembers userEmail={userDetails.email} creatorEmail={creatorEmail}
              groupMembers={groupMembers}/>
          ) : (
          <div className="preloader-wrapper loader small active">
            <div className="spinner-layer spinner-green-only">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div><div className="gap-patch">
                <div className="circle"></div>
              </div><div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>
          </div>
          )
        }
      </div>
    );
  }
}

/**
 * A React component that displays all the membrs of a group
 */
class GroupMembers extends React.Component {
  /**
   * Render method of React component
   * @returns {Object} Returns the DOM object to be rendered
   */
  render() {
    const groupMembers = this.props.groupMembers;
    const creatorEmail = this.props.creatorEmail;
    const userEmail = this.props.userEmail;
    const userIsCreator = userEmail === creatorEmail;
    return (
      <ul className="collection members-list">
        {
          groupMembers ? (
            Object.keys(groupMembers).map((memberId, index) =>
              (
                <GroupMember userIsCreator={userIsCreator} key={index}
                  creatorEmail={creatorEmail} memberDetails={groupMembers[memberId]}/>
              )
            )
          ) : (
            <div className="progress center pink-text">
                <div className="indeterminate"></div>
            </div>
          )
        }

      </ul>
    );
  }
}
/**
 * React component that displays the details of each member of a group
 */
class GroupMember extends React.Component {
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
            <li className="collection-item">{memberDetails.firstName} {memberDetails.lastName}<br />
              <small className="grey-text">{memberDetails.email}</small>
              <a id={memberDetails.id} value={memberDetails.name}
                className="secondary-content modal-trigger pink-text text-darken-4">
              <i className="material-icons">person</i></a>
            </li>
          ) : (
            <li className="collection-item">{memberDetails.firstName} {memberDetails.lastName}<br />
              <small className="grey-text">{memberDetails.email}</small>
              {
                userIsCreator ? (
              <a href='#deleteMemberModal' id={memberDetails.id} value={memberDetails.name}
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
