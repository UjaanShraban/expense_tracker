const db = require('../config/db');

// GET all data for a specific user
exports.getAllHistory = (req, res) => {
    const userId = req.params.user_id;
    const query = "SELECT * FROM history WHERE user_id = ?";
    db.query(query, [userId], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
};

// GET data by ID
exports.getHistoryById = (req, res) => {
    const id = req.params.id;
    const userId = req.params.user_id;
    const query = "SELECT * FROM history WHERE id = ? AND user_id = ?";
    db.query(query, [id, userId], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
};

// ADD new data
exports.addHistory = (req, res) => {
    const insert = "INSERT INTO history (description, amount, type, date, user_id) VALUES (?, ?, ?, ?, ?)";
    const values = [
        req.body.description,
        req.body.amount,
        req.body.type,
        req.body.date,
        req.body.userId
    ];

    db.query(insert, values, (err, result) => {
        if (err) return res.json({ message: "Database error", error: err });
        return res.json({ message: "Expense added successfully" });
    });
}

// DELETE data
exports.deleteHistory = (req, res) => {
    const id = req.params.id;
    const userId = req.body.userId;
    const deleteQuery = "DELETE FROM history WHERE id = ? AND user_id = ?";
    db.query(deleteQuery, [id, userId], (err, result) => {
        if (err) return res.json({ message: "Database error", error: err });
        return res.json({ message: "Expense deleted successfully" });
    });
};

// UPDATE data
exports.updateHistory = (req, res) => {
    const id = req.params.id;
    const { description, amount, type, date, userId } = req.body;
    const formattedDate = new Date(date).toISOString().slice(0, 10);

    const updateQuery = "UPDATE history SET `description` = ?, `amount` = ?, `type` = ?, `date` = ? WHERE id = ? AND user_id = ?";
    const values = [description, amount, type, formattedDate, id, userId];

    db.query(updateQuery, values, (err, result) => {
        if (err) return res.json({ message: "Database error", error: err });
        if (result.affectedRows === 0) {
            return res.json({ message: "No matching record found for update" });
        }
        return res.json({ message: "Expense updated successfully" });
    });
};

exports.sortHistory = (req, res) => {
    const { sortBy, order, userId } = req.body;

    const SortItem = ['description', 'amount', 'type', 'date'];
    if (!SortItem.includes(sortBy)) {
        return res.json({ message: "Invalid sort field" });
    }

    const sortQuery = "SELECT * FROM history WHERE user_id = ? ORDER BY ${sortBy} ${order}";

    db.query(sortQuery, [userId], (err, result) => {
        if (err) {
            console.error("Error fetching sorted data:", err);
            return res.json({ message: "Database error", error: err });
        }
        res.json(result);
    });
};

// SEARCH data for specific user
exports.searchHistory = (req, res) => {
    const { searchTerm, userId } = req.body;

    const searchQuery = "SELECT * FROM history WHERE user_id = ? AND (description LIKE ? OR type LIKE ?)";
    const values = [userId, `%${searchTerm}%`, `%${searchTerm}%`];

    db.query(searchQuery, values, (err, result) => {
        if (err) {
            console.error("Error fetching search data:", err);
            return res.json({ message: "Database error" });
        }
        res.json(result);
    });
};