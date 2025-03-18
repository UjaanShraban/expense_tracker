import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home">
        <h1 className="home-title">Expense Tracker</h1>
        <p className="home-subtitle">
          Take control of your finances. Track your income and expenses with ease!
        </p>
        <Link to="/form" className="start">Get Started</Link>
      </div>

      <div className="welcome-box">
        <p className='manage'>Manage your expenses efficiently and stay on top of your financial goals.</p>
        <h2 className='welcome'>Welcome to Expense Tracker</h2>
      </div>
    </div>
  );
}

export default Home;
