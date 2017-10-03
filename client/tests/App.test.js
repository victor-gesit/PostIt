import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import { App } from '../components/App.jsx';

describe('<App/>', () => {
  const props = {
    leaveGroup: sinon.spy()
  };
  it('calls the leaveGroup method on button click', () => {
    const wrapper = shallow(<App {...props} />);
  });
});
