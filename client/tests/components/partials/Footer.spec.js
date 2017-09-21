import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import Footer from '../../../components/views/partials/Footer.jsx';

describe('<Footer/>', () => {
  const props = {
    deleteMember: sinon.spy()
  };
  it('renders the copyright text', () => {
    const wrapper = mount(<Footer {...props} />);
    const copyrightWrapper = wrapper.find('.footer-copyright').first();
    expect(copyrightWrapper.props().children).toEqual('Built by Victor Idongesit © Andela, 2017');
  });
});
