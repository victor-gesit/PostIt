import React from 'react';
import ReactPaginate from 'react-paginate';
import { getGroupsForUser, createGroup, deleteGroup } from '../../actions';
import { connect } from 'react-redux';
import 'jquery/dist/jquery';
import '../../js/materialize';

$(document).ready(() => {
  $('.button-collapse').sideNav();
}); 

class MessageBoard extends React.Component {
  render() {
    return(
      <div>
        <Body _that={this}/>
      </div>
    );
  }
}

class Nav extends React.Component {
  componentDidMount(){
    $(document).ready(() => {
      $('.button-collapse').sideNav();
    }); 
  }
  render() {
    return(
      <div className="navbar-fixed">
        <nav className="pink darken-4">
          <div className="nav-wrapper">
            <a href="#" id="brand" className="brand-logo left">PostIt</a>
            <a href="#" data-activates="mobile-demo" data-hover="true" className="button-collapse show-on-large"><i className="material-icons">menu</i></a>
            <ul className="right">
              <li>
                {/* Dropdown Trigger */}
                <ul>
                  <li>
                    <a className="dropdown-button" data-alignment="right" data-constrainwidth="false" data-beloworigin="true" data-hover="true" href="#" data-activates="dropdown0">
                      <i className="material-icons">notifications_active</i>
                    </a>
                  </li>
                </ul>
                {/* Dropdown Structure */}
                <ul id="dropdown0" className="dropdown-content">
                  <li><a href="#!" className="black-text">Family and Friends<span className="badge">1</span></a></li>
                  <li><a href="#!" className="black-text">DisruptI.T. Project<span className="new pink badge">1</span></a></li>
                </ul>
              </li>
              <li>
                {/* Dropdown Trigger */}
                <ul>
                  <li>
                    <a className="dropdown-button" data-alignment="right" data-constrainwidth="false" data-beloworigin="true" data-hover="true" href="#" data-activates="dropdown1">
                      <i className="material-icons">library_add</i>
                    </a>
                  </li>
                </ul>
                {/* Dropdown Structure */}
                <ul id="dropdown1" className="dropdowns dropdown-content">
                  <li><a href="#!" className="black-text"><i className="material-icons green-text">library_add</i>Create Group</a></li>
                </ul>
              </li>
              <li>
                {/* Dropdown Trigger */}
                <ul>
                  <li>
                    <a className="dropdown-button" data-beloworigin="true" data-hover="true" href="#" data-activates="dropdown3">
                      <i className="material-icons">person</i>
                    </a>
                  </li>
                </ul>
                {/* Dropdown Structure */}
                <ul id="dropdown3" className="dropdowns dropdown-content">
                  <li className="user-profile-container">
                    <ul className="collection">
                      <li className="collection-item avatar black-text">
                        <i className="material-icons purple circle">person</i>
                        <div className="title black-text">Philip Newmann</div>
                        <p>philip@newmann.com<br />08033322425</p>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <div className="row valign-wrapper">
                      <div className="col s12 center">
                        <button className="btn  black">Sign out</button>
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
            {/* Side Nav */}
            <ul id="mobile-demo" className="side-nav">
              <li>
                <div className="user-details">
                  <div className="background">
                    <img src="images/fire2.png" />
                  </div>
                </div>
                <ul className="collection">
                  <li className="collection-item avatar black-text">
                    <i className="material-icons purple circle">person</i>
                    <span className="title black-text">Philip Newmann</span>
                    <p>philip@newmann.com<br />08033322425</p>
                  </li>
                </ul>
              </li>
              <li><a href="#"><i className="large material-icons green-text">library_add</i>Create New Group</a></li>
              <hr />
              <li><a href="#"><i className="large material-icons black-text">texture</i>All Groups</a></li>
              <div className="row searchbox valign-wrapper">
                <div className="col s9">
                  <input type="search" placeholder="Find a group" className="white-text" />
                </div>
                <div className="col s3">
                  <span><i className="material-icons black-text">search</i></span>
                </div>
              </div>
              <ul className="list-side-nav">
                <li><a href="#"><i className="material-icons teal-text">people_outline</i>Invent NextBigThing</a></li>
                <li><a href="#"><i className="material-icons teal-text">people_outline</i>Just GetStuffDone</a></li>
                <li><a href="#"><i className="material-icons teal-text">people_outline</i>Let's MakesThingsWork</a></li>
                <li><a href="#"><i className="material-icons teal-text">people_outline</i>Make and DisruptIt</a></li>
                <li><a href="#"><i className="material-icons teal-text">people_outline</i>Invent NextBigThing</a></li>
                <li><a href="#"><i className="material-icons teal-text">people_outline</i>Just GetStuffDone</a></li>
                <li><a href="#"><i className="material-icons teal-text">people_outline</i>Let's MakesThingsWork</a></li>
                <li><a href="#"><i className="material-icons teal-text">people_outline</i>Make and DisruptIt</a></li>
                <li><a href="#"><i className="material-icons teal-text">people_outline</i>Invent NextBigThing</a></li>
                <li><a href="#"><i className="material-icons teal-text">people_outline</i>Just GetStuffDone</a></li>
                <li><a href="#"><i className="material-icons teal-text">people_outline</i>Let's MakesThingsWork</a></li>
                <li><a href="#"><i className="material-icons teal-text">people_outline</i>Make and DisruptIt</a></li>
              </ul>
              <hr />
              <li><a href="#"><i className="large material-icons black-text">info</i>About PostIt</a></li>
              <li><a href="#"><i className="large material-icons red-text">info</i>Sign Out</a></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

class SideNav extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let firstName = this.props.userDetails.firstName;
    let lastName = this.props.userDetails.lastName;
    let phone = this.props.userDetails.phone;
    let email = this.props.userDetails.email;
    return(
      <ul className="collection">
        <li className="collection-item avatar black-text">
          <i className="material-icons purple circle">person</i>
          <span className="title black-text">{firstName} {lastName}</span>
          <p>{email}<br />{phone}</p>
        </li>
      </ul>
    )
  }
}
class Body extends React.Component {
  constructor(props) {
    super(props);
    this.handlePageNumberClick = this.handlePageNumberClick.bind(this);
    this.state = {
      offset: 0,
      perPage: 6
    }
  }
  componentDidMount() {
    const userId = this.props._that.props.appInfo.userDetails.id;
    const token = this.props._that.props.appInfo.userDetails.token;
    let offset = 0;
    let limit = this.state.perPage;
    this.props._that.props.getGroupsForUser(userId, offset, limit, token);
  }
  handlePageNumberClick(data) {
    const userId = this.props._that.props.appInfo.userDetails.id;
    const token = this.props._that.props.appInfo.userDetails.token;

    let selected = data.selected;
    let offset =  Math.ceil(selected * this.state.perPage);
    let limit = this.state.perPage;
    this.setState({offset: offset}, () => {
      this.props._that.props.getGroupsForUser(userId, offset, limit, token);
    });
  }
  componentWillUpdate() {
  }
  render() {
    const story = ['obi', 'is', 'a', 'very', 'good', 'boy', 'but', 'and', 'he', 'has']
    let userGroups = this.props._that.props.groups.userGroups;
    let dataLoading = this.props._that.props.dataLoading;
    let totalNoOfGroups = this.props._that.props.groups.meta.count;
    let limit = this.state.perPage;
    let pageCount = Math.ceil(totalNoOfGroups/limit);
    let userDetails = this.props._that.props.appInfo.userDetails;
    return(
      <div id="body">
        <Nav userDetails={userDetails}/>
        <div id="main">
          <h3 className="board-title center black-text">Message Board</h3>

          {/* Groups */}
          <div className="row">
            {
              Object.keys(userGroups).map((groupId, index) => {
                return <Group key={index} id={groupId} loading={dataLoading} groupDetails={userGroups[groupId].info}/>
               }
              )
            }
          </div>  
          {/*End of Groups*/}
          
        </div>
        <ReactPaginate previousLabel={"<"}
                       nextLabel={">"}
                       breakLabel={<a href="">...</a>}
                       breakClassName={"break-me pink-text"}
                       pageCount={pageCount}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       onPageChange={this.handlePageNumberClick}
                       containerClassName={"pagination center"}
                       pageLinkClassName={"waves-effect"}
                       previousLinkClassName={"waves-effect"}
                       nextLinkClassName={"waves-effect"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active pink"} />
        <Footer/>
      </div>
    );
  }
}

class Footer extends React.Component {
  render() {
      return (
      <footer className="page-footer pink darken-4">
        <div className="shift-left white-text">Built by Victor Idongesit</div>
        <div className="footer-copyright shift-left">© Andela, 2017</div>
      </footer>
    );
  }
}

class Group extends React.Component {
  render() {
    if(this.props.loading) {
      return (
        <div className="preloader-background">
          <div className="preloader-wrapper big active valign-wrapper">
            <div className="spinner-layer spinner-white-only">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div>
              <div className="gap-patch">
                <div className="circle"></div>
              </div>
              <div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>
          </div>
        </div>
      )
    }
    let groupDetails = this.props.groupDetails;
    return (
      <div className="col s12 m6 l4">
        <div className="card">
          <div className="card-image waves-effect waves-block waves-light">
            <img className="activator tooltipped" data-position="top" data-delay={1000} data-tooltip="Click for group info" src="images/fire2.png" />
          </div>
          <div className="card-content">
            <div>
              <a href="#" className="card-title grey-text text-darken-4">{groupDetails.title}<span className="badge new pink">4</span></a>
              <p className="blue-text">Created by {groupDetails.createdBy}</p>
            </div>
          </div>
          <div className="card-reveal">
            <div>
              <span className="card-title purple-text text-darken-4">{groupDetails.title}<i className="material-icons right">close</i></span>
              <hr />
            </div>
            <div className="group-info">	
              <p className="black-text">{groupDetails.description}</p>
              <hr />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    apiError: state.apiError,
    dataLoading: state.dataLoading,
    groups: state.groups,
    appInfo: {
      userDetails: state.appInfo.userDetails,
      authState: state.appInfo.authState
    }
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getGroupsForUser: (userId, offset, limit, token) => dispatch(getGroupsForUser(userId, offset, limit, token)),
    resetErrorLog: () => dispatch(resetErrorLog())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MessageBoard);