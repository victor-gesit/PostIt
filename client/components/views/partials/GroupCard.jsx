/* eslint-env browser */
import React from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../../components/views/partials/Spinner.jsx';
/**
 * A component that displays a card for each group a user belongs to
 */
export default class GroupCard extends React.Component {
  /**
   * Render method of React component
   * @returns {Object} Returns the DOM object to be rendered
   */
  render() {
    if (this.props.loading) {
      return (
        <div className="preloader-background">
        <Spinner/>
        </div>
      );
    }
    const groupDetails = this.props.groupDetails;
    return (
      <div className="col s12 m6 l4">
        <div className="card">
          <div className="card-image waves-effect waves-block waves-light">
            <img className="activator tooltipped"
              data-position="top" data-delay={1000}
              data-tooltip="Click for group info" src="images/fire2.png" />
          </div>
          <div className="card-content">
            <div>
              <Link to={`/postmessage/${groupDetails.id}`} id={groupDetails.id}
                className="card-title grey-text groupLink text-darken-4">
                  {groupDetails.title}
                <span className="badge new pink" id={groupDetails.id}></span>
              </Link>
              <p className="blue-text">Created by {groupDetails.createdBy}</p>
            </div>
          </div>
          <div className="card-reveal">
            <div>
              <span className="card-title purple-text text-darken-4">
                {groupDetails.title}
                <i className="material-icons right">close</i>
              </span>
              <hr />
            </div>
            <div className="group-info">
              <p className="black-text">{groupDetails.description}</p>
              <hr />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
