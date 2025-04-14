import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Sort from '../components/Sort';
import axios from 'axios';
import { vi } from 'vitest';

// Mock axios
vi.mock('axios');

describe('Sort Component', () => {
  const mockSetExpenses = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders Sort button', () => {
    render(<Sort setExpenses={mockSetExpenses} />);
    expect(screen.getByRole('button', { name: /sort/i })).toBeInTheDocument();
  });

  test('toggles filter options on button click', () => {
    render(<Sort setExpenses={mockSetExpenses} />);
    const button = screen.getByRole('button', { name: /sort/i });

    fireEvent.click(button);
    expect(screen.getByText(/apply/i)).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.queryByText(/apply/i)).not.toBeInTheDocument();
  });

  test('handles sorting of selected options', async () => {
    const mockResponse = {
      data: [
        { id: 1, description: 'food', amount: 200, type: 'expense', date: '2024-04-10' },
      ],
    };
    axios.post.mockResolvedValueOnce(mockResponse);

    render(<Sort setExpenses={mockSetExpenses} />);
    fireEvent.click(screen.getByRole('button', { name: /sort/i }));

    fireEvent.change(screen.getAllByRole('combobox')[0], {
      target: { value: 'amount' },
    });
    fireEvent.change(screen.getAllByRole('combobox')[1], {
      target: { value: 'desc' },
    });

    fireEvent.click(screen.getByRole('button', { name: /apply/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:5555/history/sort',
        {
          sortBy: 'amount',
          order: 'desc',
        }
      );
      expect(mockSetExpenses).toHaveBeenCalledWith(mockResponse.data);
    });
  });

  test('handles errors', async () => {
    console.error = vi.fn(); 
    axios.post.mockRejectedValueOnce(new Error('Server error'));

    render(<Sort setExpenses={mockSetExpenses} />);
    fireEvent.click(screen.getByRole('button', { name: /sort/i }));

    fireEvent.change(screen.getAllByRole('combobox')[0], {
      target: { value: 'date' },
    });

    fireEvent.click(screen.getByRole('button', { name: /apply/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:5555/history/sort',
        expect.any(Object)
      );
      expect(mockSetExpenses).not.toHaveBeenCalled();
    });
  });
});
