import React from 'react';
import { mount } from 'enzyme';
import { StaticRouter } from 'react-router';
import GroupCard from '../../../components/views/partials/GroupCard.jsx';
import Spinner from '../../../components/views/partials/Spinner.jsx';

describe('<GroupCard/>', () => {
  it('should load a spinner when API call sets loading to true', () => {
    const props = {
      loading: true,
      groupDetails: {}
    };
    const wrapper = mount(
      <StaticRouter>
        <GroupCard {...props} />
      </StaticRouter>
    );
    expect(wrapper.find(Spinner).length).toEqual(1);
  });
  it('should load a card after when API call returns', () => {
    const props = {
      loading: false,
      groupDetails: {}
    };
    const wrapper = mount(
      <StaticRouter>
        <GroupCard {...props} />
      </StaticRouter>
    );
    expect(wrapper.find('.card').length).toEqual(1);
  });
});
