import React from 'react';
import { mount, shallow } from 'enzyme';
import { StaticRouter } from 'react-router';
import { NotFound } from '../../components/views/NotFound.jsx';
import { notFoundMock as mock } from '../mockData';
import PrivateRouteDefault, { PrivateRoute } from '../../components/views/PrivateRoute.jsx';

jest.mock('react-router-dom');

describe('<NotFound/>', () => {
  it('renders a component when user is signed in', () => {
    const Component = PrivateRoute({ Component: NotFound,
      appInfo: { authState: { signedIn: true } } });
    const wrapper = mount(
        Component
      );
  });
  it('renders a component when user is signed out', () => {
    const Component = PrivateRoute({ Component: NotFound,
      appInfo: { authState: { signedIn: false } } });
    const wrapper = shallow(
        Component
      );
  });
});
