import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SortFilter from "./Sort";
import Search from "./Search";
import '../css/history.css';
const History = () => {
  const [expenses, setExpenses] = useState([]); 

  const [editData, setEditData] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5555/history"); 
        setExpenses(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!id) return;
    if(!window.confirm("Are you sure to DELETE transaction?")) return;
    try {
      await axios.delete(`http://localhost:5555/history/${id}`);
      alert("Expense deleted successfully!");
      setExpenses(expenses.filter((expense) => expense.id !== id));
    } catch (err) {
      console.log(err);
      alert("Expense delete failed!");
    }
  };
  
  const handleUpdate = (expense) => {
    if(!window.confirm("Are you sure to UPDATE transaction?")) return;
    setEditData(expense);
    setIsModalOpen(true); 
  };
  
  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditData(null);
  };
  
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    console.log("Updating data", editData);
    try {
      await axios.put(`http://localhost:5555/history/${editData.id}`, editData);
      alert("Expense updated successfully!");
      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) =>
          expense.id === editData.id ? { ...expense, ...editData } : expense
        )
      );      
    handleModalClose(); 
  } catch (err) {
    console.log(err);
    alert("Update failed!");
  }
};

  return (
    <div className="history_container">
      <h1 className="history">History</h1>
      <div>
        <div className="sort_search">
        <SortFilter setExpenses={setExpenses} />
        <Search setExpenses={setExpenses}/>
        </div>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.description}</td>
                <td>{expense.amount}</td>
                <td>{expense.type.toUpperCase()}</td>
                <td>{expense.date.slice(0, 10)}</td>
                <td>
                  <button className="update" onClick={() => handleUpdate(expense)}>Update</button>
                  <button className="delete" onClick={() => handleDelete(expense.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className="balance">Remaining Balance: Rs. {expenses.reduce((total, expense) =>
          expense.type.toLowerCase() === "income"
            ? total + Number(expense.amount)
            : total - Number(expense.amount), 0)}
        </h3>

        <button className="new">
          <Link to="/form">Add New Transaction</Link>
        </button>
      </div>

      {/* Modal for Editing */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Expense</h2>
            <form onSubmit={handleEditSubmit}>
              <label>Description</label>
              <input
                type="text"
                value={editData.description}
                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
              />

              <label>Amount</label>
              <input
                type="number"
                value={editData.amount}
                onChange={(e) => setEditData({ ...editData, amount: e.target.value })}
              />

              <label>Category</label>
              <select
                value={editData.type}
                onChange={(e) => setEditData({ ...editData, type: e.target.value })}
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>

              <label>Date</label>
              <input
                type="date"
                value={editData.date}
                onChange={(e) => setEditData({ ...editData, date: e.target.value })}
              />

              <button type="submit" className="save-btn">Save</button>
              <button type="button" className="close-btn" onClick={handleModalClose}>Close</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
