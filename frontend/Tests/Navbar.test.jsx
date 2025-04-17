import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';

describe('Navbar Component', () => {
  test('renders all navigation links with correct text and href', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const homeLink = screen.getByRole('link', { name: /home/i });
    const formLink = screen.getByRole('link', { name: /add expense/i });
    const historyLink = screen.getByRole('link', { name: /history/i });

    expect(homeLink).toBeInTheDocument();
    expect(homeLink.getAttribute('href')).toBe('/');

    expect(formLink).toBeInTheDocument();
    expect(formLink.getAttribute('href')).toBe('/form');

    expect(historyLink).toBeInTheDocument();
    expect(historyLink.getAttribute('href')).toBe('/history');
  });
});
