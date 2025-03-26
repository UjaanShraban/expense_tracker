import React, { useState } from 'react';
import axios from 'axios';
import '../css/search_sort.css';
const Search = ({ setExpenses }) => {
    const [searchTerm, setSearchTerm] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5555/history/search', { searchTerm });
            console.log("Response", res.data);
            setExpenses(res.data);
        } catch (err) {
            console.error("Error fetching search data:", err);
        }
    };

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Search by description or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
            <button onClick={handleSearch} className="search-btn">Search</button>
        </div>
    );
};

export default Search;
