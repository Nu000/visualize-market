import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../util/test-utils';
import Chart from './Chart';
import { rates } from '../../util/mock-data';

describe('Chart Tests', () => {
  beforeEach(() => {
    renderWithProviders(
      <Chart rates={rates} marketPosition='mean'/>,
    );
  });
  test('renders chart', () => {
    const btn = screen.getByTestId('chart');
    expect(btn).toBeInTheDocument();
  });
});
