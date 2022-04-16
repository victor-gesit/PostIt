/* eslint-env browser */
import React from 'react';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import 'jquery/dist/jquery';
import { getGroupsForUser, getMessages, getGroupMembers, verifyToken,
  loadMessages, resetRedirect,
  resetLoadingState, getAllGroupsForUser, signOut
} from '../../actions';
import Navbar from './partials/NavBar.jsx';
import Footer from './partials/Footer.jsx';
import Spinner from './partials/Spinner.jsx';
import GroupCard from './partials/GroupCard.jsx';

/**
 * React component that displays content of the Message Board page
 */
export class MessageBoard extends React.Component {
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
    this.props.resetLoadingState();
    this.props.resetRedirect();
    // Initialize navbar
    $('.button-collapse').sideNav({
      closeOnClick: true,
      draggable: true
    });
    $('#sidenav-overlay').trigger('click');
    const token = localStorage.getItem('token');
    const offset = 0;
    const limit = this.state.perPage;
    this.props.getGroupsForUser(token, offset, limit);
  }
  /**
   * @param {Object} event Event fired when the pagination is clicked
   * @returns {undefined} This method returns nothing
   */
  handlePageNumberClick(event) {
    const token = localStorage.getItem('token');

    const selected = event.selected;
    const offset = Math.ceil(selected * this.state.perPage);
    const limit = this.state.perPage;
    this.setState({ offset }, () => {
      this.props.getGroupsForUser(token, offset, limit);
    });
  }
  /**
   * Render method of React component
   * @returns {Object} Returns the DOM object to be rendered
   */
  render() {
    const userGroups = this.props.groups.userGroups;
    const dataLoading = this.props.dataLoading;
    const totalNoOfGroups = this.props.groups.meta.count;
    const limit = this.state.perPage;
    const pageCount = Math.ceil(totalNoOfGroups / limit);
    const userDetails = this.props.appInfo.userDetails;
    const allUserGroups = this.props.allUserGroups.userGroups;
    return (
      <div id="body">
        <Navbar
          store={this.props}
          allUserGroups={allUserGroups}
          userDetails={userDetails}/>
        <div id="main">
          {/* Groups */}
          {
            dataLoading ? (
              <div className="preloader-wrapper loader large active">
                <Spinner/>
              </div>
            ) : (
              <div>
                { !dataLoading && totalNoOfGroups === 0 ? (
                  <div className="row center">
                    <h4 className="grey-text">
                      You don't belong to any group</h4>
                    <a href="/#/creategroup" className="btn">Create One</a>
                  </div>
                  ) : (
                  <div className="row">
                    <h3 className="board-title center black-text">
                      Message Board</h3>
                    {
                      Object.keys(userGroups).map((groupId, index) =>
                        <GroupCard
                          store={this.props}
                          key={index} id={groupId}
                          loading={dataLoading}
                          groupDetails={userGroups[groupId].info}
                        />
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
    getGroupsForUser: (token, offset, limit) =>
      dispatch(getGroupsForUser(token, offset, limit)),
    loadMessages: groupId => dispatch(loadMessages(groupId)),
    resetRedirect: () => dispatch(resetRedirect()),
    getMessages: (groupId, token) =>
      dispatch(getMessages(groupId, token)),
    getGroupMembers: (groupId, token) =>
      dispatch(getGroupMembers(groupId, token)),
    getAllGroupsForUser: (token, offset) =>
      dispatch(getAllGroupsForUser(token, offset)),
    resetLoadingState: () => dispatch(resetLoadingState()),
    verifyToken: token => dispatch(verifyToken(token)),
    signOut: () => dispatch(signOut())
  });
export default connect(mapStateToProps, mapDispatchToProps)(MessageBoard);
