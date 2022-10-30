import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { setupServer } from 'msw/node';
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
    const element = screen.getByText('Origin');
    expect(element).toBeInTheDocument();
  });
  test('select default port', () => {
    const element = screen.getByText('Shanghai(CNSGH)');
    expect(element).toBeInTheDocument();
  });
});
