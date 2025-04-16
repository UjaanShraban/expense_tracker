import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../css/auth.css';

const Login = ({ setIsAuthenticated, setUserId, setUsername }) => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5555/login', formData);

            if (res.data.success) {
                alert("Login successful!");

                setUserId(res.data.id);
                console.log(res.data);
                setUsername(res.data.username);
                // console.log(res.data.username);
                setIsAuthenticated(true);

                navigate('/');
            } else {
                alert("Invalid email or password.");
            }
        } catch (err) {
            console.error("Error logging in:", err);
            alert("Error logging in.");
        }
    };

    return (
        <div className="auth-container">
            <h1 className='heading'>Login</h1>
            <form onSubmit={handleSubmit}>
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

                <button type="submit">Login</button>
            </form>

            <p>
                Don't have an account? <Link to="/signup">Signup here!</Link>
            </p>
        </div>
    );
};

export default Login;
