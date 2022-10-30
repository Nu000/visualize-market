import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { renderWithProviders } from '../../util/test-utils';
import Home from './Dashboard';

describe('Dashboard Tests', () => {
  beforeEach(() => {
    renderWithProviders(
      <Home />,
    );
  });
  test('renders Dashboard', () => {
    const btn = screen.getByText('Market Price');
    expect(btn).toBeInTheDocument();
  });
});
