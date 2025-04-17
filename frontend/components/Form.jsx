import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/form.css";

const Form = ({ userId }) => {
    const [formData, setFormData] = useState({
        description: "",
        amount: "",
        type: "expense",
        date: ""
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:5555/history/${userId}`, {
                ...formData,
                userId
            });
            alert("Transaction added!");
            navigate("/history");
        } catch (err) {
            console.error(err);
            alert("Failed to add transaction.");
        }
    };

    return (
        <div className="form_container">
            <h1 className="form_title">Add Transaction</h1>
            <form onSubmit={handleSubmit}>
                <label>Description</label>
                <input type="text" name="description" value={formData.description} onChange={handleChange} required />

                <label>Amount</label>
                <input type="number" name="amount" value={formData.amount} onChange={handleChange} required />

                <label>Category</label>
                <select name="type" value={formData.type} onChange={handleChange}>
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                </select>

                <label>Date</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} required />

                <button type="submit" className="submit_btn">Add</button>
            </form>
        </div>
    );
};

export default Form;
