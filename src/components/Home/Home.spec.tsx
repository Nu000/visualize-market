import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { renderWithProviders } from '../../util/test-utils';
import Home from './Home';

describe('Home Tests', () => {
  beforeEach(() => {
    renderWithProviders(
      <Home />,
    );
  });
  test('renders Home Page', () => {
    const btn = screen.getByText('Home');
    expect(btn).toBeInTheDocument();
  });
});
