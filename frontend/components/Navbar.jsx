import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <ul className="navbar">
        <Link to="/">Home</Link>
        <Link to="/form">Add Expense</Link>
        <Link to="/history">History</Link>
      </ul>
    </div>
  )
}

export default Navbar