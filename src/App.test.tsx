import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import App from './App';
import store from './state/store';

describe('App Tests', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
  });
  test('renders App', () => {
    const name = screen.getByText('Test App');
    expect(name).toBeInTheDocument();
  });
});
