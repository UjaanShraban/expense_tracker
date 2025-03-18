import axios from 'axios';
import React, { useState } from 'react';

const Form = () => {
  //variable to store data
  const [data, setData] = useState({
    description: "",
    amount: "",
    type: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) || "" : value, //change amount to number
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting data:", data);
    setData({ description: "", amount: "", type: "", date: "" });
    try {
      const response = await axios.post("http://localhost:5555/history", data); //send data to server
      console.log("Server response:", response.data);
      alert("Expense added successfully!");
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  return (
    <>
    <div className="form-container">
    <h1 className='form-heading'>Add New Expense/Income</h1>
      <div className="form-box">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="description">Description:</label>
            <input
              id="description"
              type="text"
              name="description"
              value={data.description}
              onChange={handleChange}
              placeholder="Enter description"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="amount">Amount:</label>
            <input
              id="amount"
              type="number"
              name="amount"
              value={data.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="category">Category:</label>
            <select
              id="category"
              name="type"
              value={data.type}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select Type</option>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="date">Date:</label>
            <input
              id="date"
              type="date"
              name="date"
              value={data.date}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Add Data
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Form;
