import React, { useState } from 'react';
import axios from 'axios';
import '../css/search_sort.css';
const Sort = ({ setExpenses }) => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [order, setOrder] = useState('asc');

  const handleSort = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5555/history/sort', {
        sortBy,
        order
      });
        console.log("Sorted data:",res.data)
      setExpenses(res.data);
    } catch (err) {
      console.error("Error fetching sorted data:", err);
    }
  };

  return (
    <div className="sort">
      <button className="filter-button" onClick={() => setIsFilterVisible(!isFilterVisible)}>
        Sort
      </button>

      {isFilterVisible && (
        <form onSubmit={handleSort} className="filter-options">
          <select 
            name="sortBy" 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="description">Description</option>
            <option value="amount">Amount</option>
            <option value="type">Type</option>
            <option value="date">Date</option>
          </select>

          <select 
            name="order" 
            value={order} 
            onChange={(e) => setOrder(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>

          <button type="submit">Apply</button>
        </form>
      )}
    </div>
  );
};

export default Sort;
