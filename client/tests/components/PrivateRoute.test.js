import React from 'react';
import { mount, shallow } from 'enzyme';
import { StaticRouter } from 'react-router';
import { NotFound } from '../../components/views/NotFound.jsx';
import { notFoundMock as mock } from '../mockData';
import { PrivateRoute } from '../../components/views/PrivateRoute.jsx';

describe('<NotFound/>', () => {
  it('renders a component when user is signed in', () => {
    const Component = PrivateRoute({ Component: NotFound,
      appInfo: { authState: { signedIn: true } } });
    const wrapper = shallow(
      <StaticRouter>
        <Component/>
      </StaticRouter>
      );
  });
  it('renders a component when user is signed out', () => {
    const Component = PrivateRoute({ Component: NotFound,
      appInfo: { authState: { signedIn: false } } });
    const wrapper = shallow(
      <StaticRouter>
        <Component/>
      </StaticRouter>
      );
  });
});
