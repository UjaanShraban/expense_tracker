import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../components/Home';
import History from '../components/History';
import Form from '../components/Form';
import Navbar from '../components/Navbar';
import Login from '../components/Login';
import Signup from '../components/Signup';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <div>
            {isAuthenticated && <Navbar />}

            <Routes>
                <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
                <Route path="/form" element={isAuthenticated ? <Form /> : <Navigate to="/login" />} />
                <Route path="/history" element={isAuthenticated ? <History /> : <Navigate to="/login" />} />
                <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </div>
    );
};

export default App;
