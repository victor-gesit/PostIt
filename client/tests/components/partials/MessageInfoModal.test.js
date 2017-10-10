import React from 'react';
import { mount } from 'enzyme';
import MessageInfoModal from '../../../components/views/partials/MessageInfoModal.jsx';
import { messageInfoModalMock as mock } from '../../mockData';

describe('<GroupDeleteModal/>', () => {
  it('calls the deleteGroup method on button click', () => {
    const wrapper = mount(<MessageInfoModal {...mock.props} />);
  });
});
