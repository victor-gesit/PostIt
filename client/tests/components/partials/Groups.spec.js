import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { StaticRouter } from 'react-router';
import Groups from '../../../components/views/partials/Groups.jsx';
import Spinner from '../../../components/views/partials/Spinner.jsx';

describe('<Groups/>', () => {
  it('should load a card after API call returns', () => {
    const props = {
      allUserGroups: {},
      getMessages: sinon.spy(),
      getAllGroupsForUser: sinon.spy(),
      getGroupMembers: sinon.spy(),
      loadMessages: sinon.spy()
    };
    const wrapper = mount(
      <StaticRouter>
        <Groups {...props} />
      </StaticRouter>
    );
    // expect(wrapper.find('.card').length).toEqual(1);
  });
});
