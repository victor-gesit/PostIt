import React from 'react';
import { mount } from 'enzyme';
import { StaticRouter } from 'react-router';
import { NavBar } from '../../../components/views/partials/NavBar.jsx';
import { navBarMock as mock } from '../../mockData';

describe('<NavBar/>', () => {
  it('calls the leaveGroup method on button click', () => {
    const wrapper = mount(
      <StaticRouter>
        <NavBar {...mock.props} />
      </StaticRouter>
    );
  });
});
