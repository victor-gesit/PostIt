import React from 'react';
import { shallow } from 'enzyme';
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
