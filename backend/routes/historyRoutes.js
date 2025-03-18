const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController');

// Routes
router.get('/', (req, res) => res.json("Backend of expense tracker")); // Homepage
router.get('/history', historyController.getAllHistory); // GET all records
router.get('/history/:id', historyController.getHistoryById); // GET record by ID
router.post('/history', historyController.addHistory); // Add new record
router.delete('/history/:id', historyController.deleteHistory); // DELETE record
router.put('/history/:id', historyController.updateHistory); // UPDATE record
router.post('/history/sort', historyController.sortHistory); //SORT data
router.post('/history/search', historyController.searchHistory); //SEARCH data

module.exports = router;