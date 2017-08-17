/* eslint-env browser */
import React from 'react';
import jwtDecode from 'jwt-decode';

/**
 * React component to display the message input div
 */
export default class MessageInputBox extends React.Component {
  /**
   * @param {Object} props Component properties passed from parent component
   */
  constructor(props) {
    super(props);
    this.priority = 'normal'; // Default priority
    this.isComment = 'true';
    this.setPriority = this.setPriority.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.state = {
      priority: 'normal'
    };
  }
  /**
   * Method called after a component is rendered, to attach event listeners to send message button
   * @return {undefined} This method returns nothing
   */
  componentDidMount() {
    // Set focus to 'send' button
    $('.message-box').keypress((event) => {
      if ((event.which && event.which === 13) || (event.keyCode && event.keyCode === 13)) {
        $('#member-list-button').click();
        return false;
      } else {
        return true;
      }
    });
  }
  /**
   * This method sets the priority of the message to be sent
   * @param {Object} event fired when setting message priority
   * @return {undefined} This method returns nothing
   */
  setPriority(event) {
    const priority = event.target.id;
    this.setState({ priority });
  }
  /**
   * This method sends a message to the group
   * @return {undefined} This method returns nothing
   */
  sendMessage() {
    const token = localStorage.getItem('token');
    const decode = jwtDecode(token);
    const senderId = decode.id;
    const groupId = localStorage.getItem('groupId');
    let priority = this.state.priority;
    let body;
    if (this.state.priority === 'comment') {
      priority = 'normal'; // A comment has normal priority
      body = this.commentBody.value;
      this.isComment = 'true';
      // Clear input bo
      this.commentBody.value = '';
    } else {
      body = this.postBody.value;
      this.isComment = 'false';
      // Clear input box
      this.postBody.value = '';
    }
    // Check for empty message body before sending
    if (body && body.trim()) {
      this.props.store.postMessage(senderId, groupId, body, priority, this.isComment, token);
    }
  }
  /**
   * Render method of React component
   * @returns {Object} Returns the DOM object to be rendered
   */
  render() {
    return (
      <div id="messageInputBox">
        <div id="messageInput">
          <div className="row">
            <div className="col center s12 m8 offset-m2 l8 offset-l2">
              <input name="priority" onClick={this.setPriority}
                ref={(normal) => { this.normal = normal; }} type="radio"
                id="normal" defaultChecked />
              <label htmlFor="normal">Normal</label>
              <input name="priority" onClick={this.setPriority}
                ref={(urgent) => { this.urgent = urgent; }} type="radio" id="urgent" />
              <label htmlFor="urgent">Urgent</label>
              <input name="priority" onClick={this.setPriority}
                ref={(critical) => { this.critical = critical; }} type="radio" id="critical" />
              <label htmlFor="critical">Critical</label>
              <input name="priority" onClick={this.setPriority}
                ref={(comment) => { this.comment = comment; }} type="radio" id="comment" />
              <label htmlFor="comment">Comment</label>
            </div>
            <div className="col s12 m8 offset-m2 l8 offset-l2">
              {/* Adjust the text input window to accept smaller text quantity for comments */}
              {
                this.state.priority === 'comment' ?
                (
                  <div className="message-box">
                    <div className="text-input-field">
                      <input className="black-text materialize-textarea"
                        ref={(commentBody) => { this.commentBody = commentBody; }}
                        type="text" name="mymessage" defaultValue={''} />
                    </div>
                    <div className="send-comment-button">
                      <button autoFocus id="member-list-button" onClick={this.sendMessage}
                        className="btn"><i className="material-icons">send</i></button>
                    </div>
                  </div>
                ) : (
                  <div className="message-box">
                    <div className="text-input-field">
                      <textarea className="black-text materialize-textarea"
                        ref={(postBody) => { this.postBody = postBody; }} type="text"
                        name="mymessage" defaultValue={''} />
                    </div>
                    <div className="send-button">
                      <button autoFocus id="member-list-button" onClick={this.sendMessage}
                      className="btn"><i className="material-icons">send</i></button>
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
