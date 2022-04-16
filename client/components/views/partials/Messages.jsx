/* eslint-env browser */
import React from 'react';
import Spinner from './Spinner.jsx';
/**
 * A React ccomponent that displays all the messages for a group
 */
export default class Messages extends React.Component {
  /**
   * Component method to emit socket event if a user opens a new group
   * @param {Obejct} nextProps New properties received when a component updates
   * @returns {undefined} This method returns nothing
   */
  componentWillReceiveProps(nextProps) {
    const newGroupId = nextProps.store.match.params.groupId;
    const oldGroupId = this.props.store.match.params.groupId;
    if (newGroupId !== oldGroupId) {
      const token = localStorage.getItem('token');
      const socket = this.props.socket;
      socket.emit('open group', { groupId: newGroupId, token });
      socket.emit('close group', { groupId: oldGroupId, token });
    }
  }
  /**
   * component method called when component properties change
   * @return {undefined} this method returns nothing
   */
  componentDidUpdate() {
    // Scroll page body to last message
    this.bodyRef.scrollIntoView({
      behavior: 'smooth'
    });
  }
  /**
   * Render method of React component
   * @returns {Object} Returns the DOM object to be rendered
   */
  render() {
    const groupId = this.props.store.match.params.groupId;
    const groupLoaded = this.props.store.groups.userGroups[groupId];
    const userId = this.props.store.appInfo.userDetails.id;
    let messages;
    // Check that group data is loaded
    if (groupLoaded) {
      messages = this.props.store.groups.userGroups[groupId].messages;
    }
    return (
      <div>
        <ul id="messages" className="messages row">
        {
          messages ? (
            Object.keys(messages).length === 0 ? (
              <div>
                <h3 className="grey-text center">No Messages</h3>
              </div>
            ) : (
              <div>
                {
                  Object.keys(messages).map((messageId, index) =>
                    <Message userId={userId}
                    key={index} messageDetails={messages[messageId]}/>)
                }
              </div>
            )
          ) : (
            <Spinner/>
          )
        }
        </ul>
        <div ref={(bodyRef) => { this.bodyRef = bodyRef; }}></div>
      </div>
    );
  }
}

/**
 * React component to display each message
 */
export class Message extends React.Component {
  /**
   * Render method of React component
   * @returns {Object} Returns the DOM object to be rendered
   */
  render() {
    const messageDetails = this.props.messageDetails;
    const userId = this.props.userId;
    const priority = messageDetails.priority;
    const isComment = messageDetails.isComment;
    const messageId = messageDetails.id;
    const messageInfoIcon = 'done';
    let className;
    if (userId === messageDetails.senderId) {
      className = 'ownmessage message card col s11 offset-s1';
    } else {
      className = 'message card col s11';
    }
    let iconClassName = 'secondary-content green-text';
    switch (priority) {
      case 'normal':
        if (isComment) { iconClassName = 'secondary-content grey-text'; }
        break;
      case 'urgent': iconClassName = 'secondary-content orange-text'; break;
      case 'critical': iconClassName = 'secondary-content red-text'; break;
      default: break;
    }
    return (
        <li className={className}>
          <small className="sender-name">{messageDetails.sentBy}
            <a className={iconClassName}>
              <i className="material-icons">lens</i></a></small>
          <div className="message-body white-text">{messageDetails.body}</div>
          <div className="message-info"><small>{messageDetails.createdAt}
            <a id={messageId} href="#messageInfoModal"
              className="secondary-content messageInfo white-text">
            <i className="material-icons green-text">{messageInfoIcon}</i></a>
            </small></div>
        </li>
    );
  }
}
