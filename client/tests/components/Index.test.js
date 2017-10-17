import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import '../../js/materialize';
import { Index } from '../../components/views/Index.jsx';
import Footer from '../../components/views/partials/Footer.jsx';
import AuthNav from '../../components/views/partials/AuthNav.jsx';
import SigninForm from '../../components/views/partials/SignInForm.jsx';

jest.mock('react-google-login');
jest.mock('react-router-dom');

describe('<Index/>', () => {
  const wrapper = shallow(<Index />);
  it('renders a the component successfully', () => {
    const props = {
      resetLoadingState: sinon.spy(),
      appInfo: {
        userDetails: {}
      }
    };
    const store = {
      getState: () => props,
      dispatch: sinon.spy,
      subscribe: sinon.spy
    };
    const defaultWrapper = mount(
        <Index
          { ...props }
          store={store}
        />
    );
    defaultWrapper.instance();
  });
  it('renders a <Footer/> component', () => {
    expect(wrapper.find(Footer).length).toEqual(1);
  });
  it('renders a <SignInForm /> component', () => {
    expect(wrapper.find(SigninForm).length).toEqual(1);
  });
  it('renders a <AuthNav /> component', () => {
    expect(wrapper.find(AuthNav).length).toEqual(1);
  });
});
