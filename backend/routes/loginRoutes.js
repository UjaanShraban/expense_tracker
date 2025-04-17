const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// Routes
router.get('/login', loginController.getAllUsers); // GET all users
router.get('/signup', loginController.getAllUsers); // GET all users
router.post('/signup', loginController.signup);
router.post('/login', loginController.login);

module.exports = router;