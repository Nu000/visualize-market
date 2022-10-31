import React from 'react';
import { screen, fireEvent, render } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { renderWithProviders } from '../../util/test-utils';
import MarketPosition from './MarketPosition';

describe('Market Position Tests', () => {
  const onChange = jest.fn();
  beforeEach(() => {
    renderWithProviders(
      <MarketPosition marketPosition="mean" updateMarketPosition={onChange} />,
    );
  });
  test('renders Market High', async () => {
    const element = screen.getByText('Market High');
    expect(element).toBeInTheDocument();
    const checkbox = screen.getByTestId('high-checkbox').querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox, {
      target: { checked: true },
    });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  test('renders Market Average', () => {
    const btn = screen.getByText('Market Average');
    expect(btn).toBeInTheDocument();
    const checkbox = screen.getByTestId('mean-checkbox').querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(checkbox).toBeChecked();
    fireEvent.click(checkbox, {
      target: { checked: false },
    });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  test('renders Market Low', () => {
    const btn = screen.getByText('Market Low');
    expect(btn).toBeInTheDocument();
    const checkbox = screen.getByTestId('low-checkbox').querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox, {
      target: { checked: false },
    });
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
