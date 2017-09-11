/* eslint-env browser */
import React from 'react';
import jwtDecode from 'jwt-decode';
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
      let decode;
      try {
        decode = jwtDecode(token);
      } catch (err) {
        this.props.store.signOut();
      }
      const userId = decode.id;
      const socket = this.props.socket;
      // socket.emit('open group', { groupId: newGroupId, userId });
      socket.emit('open group', { groupId: newGroupId, userId });
      socket.emit('close group', { groupId: oldGroupId, userId });
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
    const token = localStorage.getItem('token');
    let decode;
    try {
      decode = jwtDecode(token);
    } catch (err) {
      this.props.store.history.push('/');
    }
    const userId = decode.id;
    let messages;
    // Check that group data is loaded
    if (groupLoaded) {
      console.log('ID', groupId, 'MESSAGES', messages);
      messages = this.props.store.groups.userGroups[groupId].messages;
    }
    console.log(groupId, messages);
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
                    <Message userId={userId} key={index} messageDetails={messages[messageId]}/>)
                }
              </div>
            )
          ) : (
          <div className="preloader-wrapper loader big active">
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
        </ul>
        <div ref={(bodyRef) => { this.bodyRef = bodyRef; }}></div>
      </div>
    );
  }
}

/**
 * React component to display each message
 */
class Message extends React.Component {
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
    switch (priority) {
      case 'normal':
        // Comments also have normal priority, but don't send notificatins
        return (
          isComment ? (
            <li className={className}>
              <small className="sender-name">{messageDetails.sentBy}
                <a className="secondary-content grey-text">
                  <i className="material-icons">lens</i></a></small>
              <div className="message-body white-text">{messageDetails.body}</div>
              <div className="message-info"><small>{messageDetails.createdAt}
                <a id={messageId} href="#messageInfoModal"className="secondary-content messageInfo white-text">
                <i className="material-icons green-text">{messageInfoIcon}</i></a>
                </small></div>
            </li>
          ) : (
            <li className={className}>
              <small className="sender-name">{messageDetails.sentBy}
                <a className="secondary-content green-text">
                <i className="material-icons">lens</i></a></small>
              <div className="message-body white-text">{messageDetails.body}</div>
              <div className="message-info"><small>{messageDetails.createdAt}
                  <a id={messageId} href="#messageInfoModal"
                    className="secondary-content messageInfo white-text">
                <i className="material-icons">{messageInfoIcon}</i></a>
                </small></div>
            </li>
          )
        );
      case 'urgent': return (
        <li className={className}>
          <small className="sender-name">{messageDetails.sentBy}
            <a className="secondary-content orange-text">
            <i className="material-icons">lens</i></a></small>
          <div className="message-body white-text">{messageDetails.body}</div>
          <div className="message-info"><small>{messageDetails.createdAt}
            <a id={messageId} href="#messageInfoModal"
              className="secondary-content messageInfo white-text">
            <i className="material-icons">{messageInfoIcon}</i></a>
            </small></div>
        </li>
      );
      case 'critical': return (
        <li className={className}>
          <small className="sender-name">{messageDetails.sentBy}
            <a className="secondary-content red-text">
            <i className="material-icons">lens</i></a></small>
          <div className="message-body white-text">{messageDetails.body}</div>
          <div className="message-info"><small>{messageDetails.createdAt}
            <a id={messageId} href="#messageInfoModal"
            className="secondary-content messageInfo white-text">
            <i className="material-icons">{messageInfoIcon}</i></a>
            </small></div>
        </li>
      );
      default: return (
        <li className={className}>
          <small className="sender-name">{messageDetails.sentBy}
            <a className="secondary-content grey-text">
            <i className="material-icons">lens</i></a></small>
          <div className="message-body white-text">{messageDetails.body}</div>
          <div className="message-info"><small>{messageDetails.createdAt}
            <a id={messageId} href="#messageInfoModal"
            className="secondary-content messageInfo white-text">
            <i className="material-icons">{messageInfoIcon}</i></a>
            </small></div>
        </li>
      );
    }
  }
}
