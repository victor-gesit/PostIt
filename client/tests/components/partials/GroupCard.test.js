import React from 'react';
import { mount } from 'enzyme';
import { StaticRouter } from 'react-router';
import GroupCard from '../../../components/views/partials/GroupCard.jsx';
import Spinner from '../../../components/views/partials/Spinner.jsx';
import { groupCardMock as mock } from '../../mockData';

describe('<GroupCard/>', () => {
  it('should load a spinner when API call sets loading to true', () => {
    const wrapper = mount(
      <StaticRouter>
        <GroupCard {...mock.loading} />
      </StaticRouter>
    );
    expect(wrapper.find(Spinner).length).toEqual(1);
  });
  it('should load a card after when API call returns', () => {
    const wrapper = mount(
      <StaticRouter>
        <GroupCard {...mock.notLoading} />
      </StaticRouter>
    );
    expect(wrapper.find('.card').length).toEqual(1);
  });
});
