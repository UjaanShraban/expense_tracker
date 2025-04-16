import React from "react";
import { Link } from "react-router-dom";
import "../css/navbar.css";

const Navbar = ({ username }) => {

  console.log("navbar username:",username);
  return (
    <div>
      <ul className="username-display">👨🏼‍🦰 {username}</ul>
      <ul className="navbar">
        <Link to="/">Home</Link>
        <Link to="/form">Add Expense</Link>
        <Link to="/history">History</Link>
      </ul>
    </div>
  );
};

export default Navbar;
