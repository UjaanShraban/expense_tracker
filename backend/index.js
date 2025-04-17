// app.js
const express = require('express');
const cors = require('cors');
const historyRoutes = require('./routes/historyRoutes'); 
const loginRoutes = require('./routes/loginRoutes')

// App instance
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', historyRoutes);
app.use('/', loginRoutes);

module.exports = app;