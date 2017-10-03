import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import MessageInfoModal from '../../../components/views/partials/MessageInfoModal.jsx';

describe('<GroupDeleteModal/>', () => {
  const props = {
    messageInfo: {
      seenBy: [
        {
          firstName: 'John',
          lastName: 'Doe',
          email: 'johndoe@andela.com'
        }
      ]
    }
  };
  it('calls the deleteGroup method on button click', () => {
    const wrapper = mount(<MessageInfoModal {...props} />);
  });
});
