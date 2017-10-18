import React from 'react';
import { mount, shallow } from 'enzyme';
import nock from 'nock';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { App } from '../components/App.jsx';
import { authMiddleware } from '../middlewares';
import reducers from '../reducers';

jest.mock('react-router-dom');
jest.mock('react-google-login');
jest.mock('react-notification-system');
jest.mock('superagent');
const store = createStore(reducers, {}, applyMiddleware(authMiddleware));

describe('<App/>', () => {
  it('loads the full application successfully', () => {
    const wrapper = mount(
      <Provider
        store={ store }
      >
        <App />
      </Provider>
    );
    store.dispatch({
      type: 'VERIFY_TOKEN',
      token: 'abracadabra'
    });
  });
});
