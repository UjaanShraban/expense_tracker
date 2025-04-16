import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../components/Home";
import History from "../components/History";
import Form from "../components/Form";
import Navbar from "../components/Navbar";
import Login from "../components/Login";
import Signup from "../components/Signup";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("");

  return (
    <div>
      {isAuthenticated && <Navbar username={username} />}

      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/form"
          element={
            isAuthenticated ? (
              <Form userId={userId} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/history"
          element={
            isAuthenticated ? (
              <History userId={userId} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={
            <Login
              setIsAuthenticated={setIsAuthenticated}
              setUserId={setUserId}
              setUsername={setUsername}
            />
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;
