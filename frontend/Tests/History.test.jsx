import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import History from '../components/History';
import axios from 'axios';
import { vi } from 'vitest';

vi.mock('axios');

describe('History component', () => {
  const mockExpenses = [
    {
      id: 1,
      description: 'Groceries',
      amount: 100,
      type: 'expense',
      date: '2024-04-01',
    },
    {
      id: 2,
      description: 'Salary',
      amount: 1000,
      type: 'income',
      date: '2024-04-05',
    },
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockExpenses });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders history items', async () => {
    render(
      <BrowserRouter>
        <History />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Groceries/i)).toBeInTheDocument();
      expect(screen.getByText(/Salary/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/History/i)).toBeInTheDocument();
    expect(screen.getAllByText('Remove')).toHaveLength(2);
  });

  test('deletes an item after confirmation', async () => {
    axios.delete.mockResolvedValue({}); 
    window.confirm = vi.fn(() => true);

    render(
      <BrowserRouter>
        <History />
      </BrowserRouter>
    );

    await waitFor(() => screen.getByText('Groceries'));

    const groceriesRow = screen.getByText('Groceries').closest('tr');
    const removeButton = within(groceriesRow).getByText('Remove');

    fireEvent.click(removeButton);

    expect(window.confirm).toHaveBeenCalled();
    expect(axios.delete).toHaveBeenCalledWith('http://localhost:5555/history/1');
  });

  test('does not delete when confirmation is canceled', async () => {
    window.confirm = vi.fn(() => false); 

    render(
      <BrowserRouter>
        <History />
      </BrowserRouter>
    );

    await waitFor(() => screen.getByText('Groceries'));

    const groceriesRow = screen.getByText('Groceries').closest('tr');
    const removeButton = within(groceriesRow).getByText('Remove');

    fireEvent.click(removeButton);

    expect(window.confirm).toHaveBeenCalled();
    expect(axios.delete).not.toHaveBeenCalled();
  });
});
