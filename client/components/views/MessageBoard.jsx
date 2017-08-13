import React from 'react';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import 'jquery/dist/jquery';
import { getGroupsForUser, getMessages, verifyToken,
  loadMessages, resetRedirect, getAllGroupsForUser
} from '../../actions';
import NavBar from './partials/NavBar.jsx';
import Footer from './partials/Footer.jsx';
import GroupCard from './partials/GroupCard.jsx';
import '../../js/materialize';

/**
 * React component that displays content of the Message Board page
 */
class MessageBoard extends React.Component {
  /**
   * Render method of React component
   * @returns {Object} Returns the DOM object to be rendered
   */
  render() {
    return (
      <div>
        <Body store={this.props}/>
      </div>
    );
  }
}

/**
 * React component that contains the page body
 */
class Body extends React.Component {
  /**
   * Constructor initializes component parameters
   * @param {Object} props Properties passed from parent component
   */
  constructor(props) {
    super(props);
    this.handlePageNumberClick = this.handlePageNumberClick.bind(this);
    this.state = {
      offset: 0,
      perPage: 6
    };
  }
  /**
   * Component method called after a component renders
   * @returns {undefined} This method returns nothing
   */
  componentDidMount() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const offset = 0;
    const limit = this.state.perPage;
    this.props.store.getGroupsForUser(userId, offset, limit, token);
    this.props.store.getAllGroupsForUser(userId, token);
  }
  /**
   * @param {Object} event Event fired when the pagination is clicked
   * @returns {undefined} This method returns nothing
   */
  handlePageNumberClick(event) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    const selected = event.selected;
    const offset = Math.ceil(selected * this.state.perPage);
    const limit = this.state.perPage;
    this.setState({ offset }, () => {
      this.props.store.getGroupsForUser(userId, offset, limit, token);
    });
  }
  /**
   * Render method of React component
   * @returns {Object} Returns the DOM object to be rendered
   */
  render() {
    const userGroups = this.props.store.groups.userGroups;
    const dataLoading = this.props.store.dataLoading;
    const totalNoOfGroups = this.props.store.groups.meta.count;
    const limit = this.state.perPage;
    const pageCount = Math.ceil(totalNoOfGroups / limit);
    const userDetails = this.props.store.appInfo.userDetails;
    const allUserGroups = this.props.store.allUserGroups.userGroups;
    return (
      <div id="body">
        <NavBar store={this.props.store} allUserGroups={allUserGroups} userDetails={userDetails}/>
        <div id="main">
          <h3 className="board-title center black-text">Message Board</h3>

          {/* Groups */}
          {
            dataLoading ? (
            <div className="preloader-wrapper loader large active">
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
            ) : (
              <div>
                { !dataLoading && totalNoOfGroups === 0 ? (
                  <div className="row center">
                    <h4 className="grey-text">You don't belong to any group</h4>
                    <a href="/creategroup" className="btn">Create One</a>
                  </div>
                  ) : (
                  <div className="row">
                    {
                      Object.keys(userGroups).map((groupId, index) =>
                        <GroupCard store={this.props.store}
                        key={index} id={groupId} loading={dataLoading}
                        groupDetails={userGroups[groupId].info}/>
                      )
                    }
                  </div>
                  )
                }
              </div>
            )
          }
          {/* End of Groups */}
        </div>
        <ReactPaginate previousLabel={'<'}
                       nextLabel={'>'}
                       breakLabel={<a href=''>...</a>}
                       breakClassName={'break-me pink-text'}
                       pageCount={pageCount}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       onPageChange={this.handlePageNumberClick}
                       containerClassName={'pagination center'}
                       pageLinkClassName={'waves-effect'}
                       previousLinkClassName={'waves-effect'}
                       nextLinkClassName={'waves-effect'}
                       subContainerClassName={'pages pagination'}
                       activeClassName={'active pink'} />
        <Footer/>
      </div>
    );
  }
}

const mapStateToProps = state =>
  ({
    apiError: state.apiError,
    dataLoading: state.dataLoading,
    groups: state.groups,
    allUserGroups: state.allUserGroups,
    appInfo: {
      userDetails: state.appInfo.userDetails,
      authState: state.appInfo.authState,
      loadedMessages: state.appInfo.loadedMessages
    }
  });

const mapDispatchToProps = dispatch =>
  ({
    getGroupsForUser: (userId, offset, limit, token) =>
      dispatch(getGroupsForUser(userId, offset, limit, token)),
    loadMessages: groupId => dispatch(loadMessages(groupId)),
    resetRedirect: () => dispatch(resetRedirect()),
    getMessages: (groupId, token) => dispatch(getMessages(groupId, token)),
    getAllGroupsForUser: (userId, token) =>
      dispatch(getAllGroupsForUser(userId, token)),
    verifyToken: token => dispatch(verifyToken(token))
  });
export default connect(mapStateToProps, mapDispatchToProps)(MessageBoard);
