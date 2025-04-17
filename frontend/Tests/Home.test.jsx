import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../components/Home';

describe('Home Component', () => {
  test('title, subtitle, and welcome message', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    
    expect(screen.getByText(/take control of your finances/i)).toBeInTheDocument();
    expect(screen.getByText(/manage your expenses efficiently/i)).toBeInTheDocument();
    expect(screen.getByText(/welcome to expense tracker/i)).toBeInTheDocument();
  });

  test('"Get Started" link', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const link = screen.getByRole('link', { name: /get started/i });
    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe('/form');
  });
});
