import React from 'react';
import { shallow } from 'enzyme';
// import configureStore from 'redux-mock-store';
import { Index } from '../../components/views/Index.jsx';
import Footer from '../../components/views/partials/Footer.jsx';
import SignInForm from '../../components/views/partials/SignInForm.jsx';

// const mockStore = configureStore();

describe('<Index/>', () => {
  const wrapper = shallow(<Index />);
  it('renders a <Footer/> component', () => {
    expect(wrapper.find(Footer).length).toEqual(1);
  });
  it('renders a <SignInForm /> component', () => {
    expect(wrapper.find(SignInForm).length).toEqual(1);
  });
});
