import React from 'react';
import { mount } from 'enzyme';
import { StaticRouter } from 'react-router';
import { NotFound } from '../../components/views/NotFound.jsx';
import { notFoundMock as mock } from '../mockData';

describe('<NotFound/>', () => {
  it('renders the component', () => {
    const wrapper = mount(
      <StaticRouter>
        <NotFound {...mock.props} />
      </StaticRouter>
    );
  });
});
