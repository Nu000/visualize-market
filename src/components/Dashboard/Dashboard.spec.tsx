import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { renderWithProviders } from '../../util/test-utils';
import Dashboard from './Dashboard';

describe('Dashboard Tests', () => {
  beforeEach(() => {
    renderWithProviders(
      <Dashboard />,
    );
  });
  test('renders progress', () => {
    const btn = screen.getByTestId('circular-progress');
    expect(btn).toBeInTheDocument();
  });
});
