import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../css/auth.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5555/signup', formData);

            if (res.data.success) {
                alert("Signup successful! Please login.");
                navigate('/login');
            } else {
                alert("Signup failed. Try again.");
            }
        } catch (err) {
            console.error("Error signing up:", err);
            alert("Error signing up.");
        }
    };

    return (
        <div className="auth-container">
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />

                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Signup</button>
            </form>

            <p>
                Already have an account? <Link to="/login">Login here!</Link>
            </p>
        </div>
    );
};

export default Signup;
