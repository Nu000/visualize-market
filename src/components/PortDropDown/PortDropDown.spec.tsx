import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../util/test-utils';
import PortDropDown from './PortDropDown';
import { ports } from '../../util/mock-data';

describe('PortDropDown Tests', () => {
  beforeEach(() => {
    renderWithProviders(
      <PortDropDown ports={ports} name="origin" updatePorts={jest.fn()} />,
    );
  });
  test('renders DropDown', () => {
    const element = screen.getByTestId('origin-select');
    expect(element).toBeInTheDocument();
  });
  test('select default port', () => {
    const element = screen.getByDisplayValue('Shanghai(CNSGH)');
    expect(element).toBeInTheDocument();
  });
});
