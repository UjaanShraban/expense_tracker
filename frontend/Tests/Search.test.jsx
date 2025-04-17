import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Search from '../components/Search';
import axios from 'axios';
import { vi } from 'vitest';

// Mock axios
vi.mock('axios');

describe('Search Component', () => {
  const mockSetExpenses = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders input and button', () => {
    render(<Search setExpenses={mockSetExpenses} />);
    expect(screen.getByPlaceholderText(/search by description or type/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  test('updates search term input', () => {
    render(<Search setExpenses={mockSetExpenses} />);
    const input = screen.getByPlaceholderText(/search by description or type/i);
    fireEvent.change(input, { target: { value: 'food' } });
    expect(input.value).toBe('food');
  });

  test('sends post request with search term and updates expenses', async () => {
    const mockResponse = {
      data: [
        { id: 1, description: 'food', amount: 50, type: 'expense', date: '2024-04-10' },
      ],
    };
    axios.post.mockResolvedValueOnce(mockResponse);

    render(<Search setExpenses={mockSetExpenses} />);
    
    const input = screen.getByPlaceholderText(/search by description or type/i);
    fireEvent.change(input, { target: { value: 'food' } });

    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:5555/history/search',
        { searchTerm: 'food' }
      );
      expect(mockSetExpenses).toHaveBeenCalledWith(mockResponse.data);
    });
  });

  test('handles API errors', async () => {
    console.error = vi.fn(); 

    axios.post.mockRejectedValueOnce(new Error('Network error'));

    render(<Search setExpenses={mockSetExpenses} />);
    
    const input = screen.getByPlaceholderText(/search by description or type/i);
    fireEvent.change(input, { target: { value: 'rent' } });

    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:5555/history/search',
        { searchTerm: 'rent' }
      );
      expect(mockSetExpenses).not.toHaveBeenCalled();
    });
  });
});
