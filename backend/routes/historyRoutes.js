const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController');

// Homepage
router.get('/', (req, res) => res.json("Backend of expense tracker"));

// HISTORY routes
router.get('/history/:user_id', historyController.getAllHistory); // Get all for specific user
router.get('/history/:user_id/:id', historyController.getHistoryById); // Get by id + user
router.post('/history/:user_id', historyController.addHistory); // Requires user_id in body
router.delete('/history/:user_id/:id', historyController.deleteHistory); // Delete
router.put('/history/:user_id/:id', historyController.updateHistory); // Update
router.post('/history/:user_id/sort', historyController.sortHistory); // Requires user_id in body
router.post('/history/:user_id/search', historyController.searchHistory); // Requires user_id in body


module.exports = router;
