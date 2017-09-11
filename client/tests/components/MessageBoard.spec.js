import React from 'react';
import { shallow } from 'enzyme';
import { MessageBoard } from '../../components/views/MessageBoard.jsx';
import Footer from '../../components/views/partials/Footer.jsx';
import NavBar from '../../components/views/partials/NavBar.jsx';

const appInfo = {
  userDetails: {
    firstName: null,
    lastName: null,
    id: null,
    token: null,
    email: null,
    phone: null
  },
  authState: { signedIn: false, message: null },
  loadedMessages: {
    groupId: null
  }
};
const groups = { meta: { count: 0 }, userGroups: {} };
const allUserGroups = { meta: { count: 0 }, userGroups: {} };
describe('<MessageBoard />', () => {
  const wrapper = shallow(<MessageBoard appInfo={appInfo} groups={groups}
    allUserGroups={allUserGroups} />);
  it('renders a <Footer /> component', () => {
    expect(wrapper.find(Footer).length).toEqual(1);
  });
  it('renders a <SignInForm /> component', () => {
    expect(wrapper.find(NavBar).length).toEqual(1);
  });
  it('rendersf a <NavBar /> component', () => {
    expect(wrapper.find(NavBar).length).toEqual(1);
  });
});
