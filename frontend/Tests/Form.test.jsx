import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Form from '../components/Form';
import axios from 'axios';

// Mock axios
vi.mock('axios');

describe('Form Component', () => {
  beforeEach(() => {
    axios.post.mockClear();
  });

  test('renders all input fields and submit button', () => {
    render(<Form />);
    
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add data/i })).toBeInTheDocument();
  });

  test('allows user to type in form inputs', () => {
    render(<Form />);
    
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: 'Lunch', name: 'description' },
    });
    fireEvent.change(screen.getByLabelText(/amount/i), {
      target: { value: '50', name: 'amount' },
    });
    fireEvent.change(screen.getByLabelText(/category/i), {
      target: { value: 'expense', name: 'type' },
    });
    fireEvent.change(screen.getByLabelText(/date/i), {
      target: { value: '2024-04-01', name: 'date' },
    });

    expect(screen.getByLabelText(/description/i).value).toBe('Lunch');
    expect(screen.getByLabelText(/amount/i).value).toBe('50');
    expect(screen.getByLabelText(/category/i).value).toBe('expense');
    expect(screen.getByLabelText(/date/i).value).toBe('2024-04-01');
  });

  test('submits form and shows success alert', async () => {
    window.alert = vi.fn(); // mock alert
    axios.post.mockResolvedValue({ data: { message: 'Success' } });

    render(<Form />);

    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: 'Groceries', name: 'description' },
    });
    fireEvent.change(screen.getByLabelText(/amount/i), {
      target: { value: '100', name: 'amount' },
    });
    fireEvent.change(screen.getByLabelText(/category/i), {
      target: { value: 'expense', name: 'type' },
    });
    fireEvent.change(screen.getByLabelText(/date/i), {
      target: { value: '2024-04-02', name: 'date' },
    });

    fireEvent.click(screen.getByRole('button', { name: /add data/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:5555/history', {
        description: 'Groceries',
        amount: 100,
        type: 'expense',
        date: '2024-04-02',
      });
      expect(window.alert).toHaveBeenCalledWith('Expense added successfully!');
    });
  });

  test('handles axios post error', async () => {
    console.error = vi.fn(); // suppress console error
    axios.post.mockRejectedValue(new Error('Network error'));

    render(<Form />);

    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: 'Error Test', name: 'description' },
    });
    fireEvent.change(screen.getByLabelText(/amount/i), {
      target: { value: '123', name: 'amount' },
    });
    fireEvent.change(screen.getByLabelText(/category/i), {
      target: { value: 'income', name: 'type' },
    });
    fireEvent.change(screen.getByLabelText(/date/i), {
      target: { value: '2024-04-03', name: 'date' },
    });

    fireEvent.click(screen.getByRole('button', { name: /add data/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
      expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Error submitting form:'), expect.any(Error));
    });
  });
});
