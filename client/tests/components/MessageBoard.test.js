import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import '../../js/materialize';
import MessageBoardDefault, { MessageBoard } from '../../components/views/MessageBoard.jsx';
import Footer from '../../components/views/partials/Footer.jsx';
import Navbar from '../../components/views/partials/NavBar.jsx';
import Spinner from '../../components/views/partials/Spinner.jsx';
import GroupCard from '../../components/views/partials/GroupCard.jsx';
import { messageBoardMock as mock } from '../mockData';

jest.mock('react-router-dom');

describe('<MessageBoard />', () => {
  const wrapper = shallow(<MessageBoard
    appInfo={mock.appInfo}
    groups={mock.groups}
    allUserGroups={mock.allUserGroups}
    />);
  it('renders the component successfully', () => {
    const dispatch = sinon.spy();
    const subscribe = sinon.spy();
    const mountedWrapper = mount(
        <MessageBoardDefault
          { ...mock }
          store={{ getState: () => mock,
            dispatch,
            subscribe }}
          getGroupsForUser = { () => {} }
        />
    );
  });
  it('calls the method to load the next page when a page number is clicked', () => {
    const wrapper = shallow(<MessageBoard
        { ...mock }
      />);
    wrapper.instance().handlePageNumberClick({ event: { selected: 2 } });
    expect(mock.getGroupsForUser.calledOnce).toEqual(true);
  });
  it('renders a <Footer /> component', () => {
    expect(wrapper.find(Footer).length).toEqual(1);
  });
  it('renders a <SignInForm /> component', () => {
    expect(wrapper.find(Navbar).length).toEqual(1);
  });
  it('rendersf a <NavBar /> component', () => {
    expect(wrapper.find(Navbar).length).toEqual(1);
  });
  it('renders a <Spinner /> component when data is loading', () => {
    const wrapper2 = shallow(<MessageBoard
      dataLoading={true}
      appInfo={mock.appInfo}
      groups={mock.groups}
      allUserGroups={mock.allUserGroups}
      />);
    expect(wrapper2.find(Spinner).length).toEqual(1);
  });
  it('renders a <GroupCard /> component, if a user belongs to a group', () => {
    const wrapper2 = shallow(<MessageBoard
      { ...mock.propsWithGroups }
      />);
    expect(wrapper2.find(GroupCard).length).toEqual(1);
  });
});
