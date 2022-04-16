import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import '../../js/materialize';
import NotFoundDefault, { NotFound } from '../../components/views/NotFound.jsx';
import { notFoundMock as mock } from '../mockData';


jest.mock('react-router-dom');
describe('<NotFound/>', () => {
  it('renders the component', () => {
    const wrapper = mount(
        <NotFound {...mock.props} />
    );
  });
  it('renders the component', () => {
    const dispatch = sinon.spy();
    const subscribe = sinon.spy();
    const wrapper = mount(
      <NotFoundDefault {...mock.props}
        store={{ getState: () => mock.props,
          dispatch,
          subscribe }}
      />
    );
  });
});
