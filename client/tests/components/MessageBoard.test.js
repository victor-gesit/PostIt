import React from 'react';
import { shallow, mount } from 'enzyme';
import { StaticRouter } from 'react-router';
import { MessageBoard } from '../../components/views/MessageBoard.jsx';
import Footer from '../../components/views/partials/Footer.jsx';
import Navbar from '../../components/views/partials/NavBar.jsx';
import { messageBoardMock as mock } from '../mockData';

describe('<MessageBoard />', () => {
  const wrapper = shallow(<MessageBoard
    appInfo={mock.appInfo}
    groups={mock.groups}
    allUserGroups={mock.allUserGroups}
    />);
  it('renders the component successfully', () => {
    const mountedWrapper = mount(
      <StaticRouter>
        <MessageBoard
          { ...mock }
          getGroupsForUser = { () => {} }
        />
      </StaticRouter>
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
});
