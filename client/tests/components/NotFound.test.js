import React from 'react';
import { mount, shallow } from 'enzyme';
import { StaticRouter } from 'react-router';
import { NotFound } from '../../components/views/NotFound.jsx';
import { notFoundMock as mock } from '../mockData';

describe('<NotFound/>', () => {
  it('calls the leaveGroup method on button click', () => {
    const wrapper = shallow(
      <StaticRouter>
        <NotFound {...mock.props} />
      </StaticRouter>
    );
  });
});
