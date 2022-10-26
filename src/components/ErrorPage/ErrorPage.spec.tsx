import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ErrorPage from './ErrorPage';

describe('Header Tests', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <ErrorPage />
      </BrowserRouter>,
    );
  });
  test('renders Error', () => {
    const title = screen.getByText('Page Not Found!');
    expect(title).toBeInTheDocument();
  });
});
