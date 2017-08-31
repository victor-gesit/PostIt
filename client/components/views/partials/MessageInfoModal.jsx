import React from 'react';

export default class MessageInfoModal extends React.Component {
  /**
   * Render method of React component
   * @returns {Object} Returns the DOM object to be rendered
   */
  render() {
    const seenBy = this.props.messageInfo.seenBy;
    const dummy = [
      {
        name: 'Victor Idongesit',
        email: 'victor.idongesit@andela.com'
      },
      {
        name: 'John Doe',
        email: 'john.doe@andela.com'
      },
      {
        name: 'Jane Doe',
        email: 'jane.doe@andela.com'
      },
      {
        name: 'Johnny Doe',
        email: 'johnny.doe@andela.com'
      }
    ];
    return (
      <div id="messageInfoModal" className="modal grey">
        <div className="modal-content">
          <h5 className="orange-text">Read By</h5>
          <ul className="collection">
            {
              seenBy.map((user, index) => {
                return (
                  <li key={index} className="collection-item">
                    <div>
                    {user.firstName} {user.lastName}<br/>
                    <small className="red-text"> { user.email}</small>
                    <a className="secondary-content"><i className="material-icons">done_all</i></a>
                    </div>
                  </li>
                );
              })
            }
          </ul>
        </div>
        <div className="modal-footer">
          <button className="modal-action modal-close waves-effect waves-green btn-flat green-text">
            Close</button>
        </div>
      </div>
    );
  }
}
