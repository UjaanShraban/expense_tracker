const db = require('../config/db');

// GET all data
exports.getAllHistory = (req, res) => {
    const query = "SELECT * FROM history";
    db.query(query, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
};

// GET data by ID
exports.getHistoryById = (req, res) => {
    const { id } = req.params;
    const query = "SELECT * FROM history WHERE id = ?";
    db.query(query, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
};

// ADD new data
exports.addHistory = (req, res) => {
    const insert = "INSERT INTO history (`description`, `amount`, `type`, `date`) VALUES (?,?,?,?)";
    const values = [
        req.body.description, 
        req.body.amount, 
        req.body.type, 
        req.body.date
        ];

    db.query(insert, values, (err, result) => {
        if (err) return res.json({ message: "Database error", error: err });
        return res.json({ message: "Expense added successfully" });
    });
};

// DELETE data
exports.deleteHistory = (req, res) => {
    const { id } = req.params;
    const deleteQuery = "DELETE FROM history WHERE id = ?";

    db.query(deleteQuery, [id], (err, result) => {
        if (err) return res.json({ message: "Database error", error: err });
        return res.json({ message: "Expense deleted successfully" });
    });
};

// UPDATE data
exports.updateHistory = (req, res) => {
    const { id } = req.params;
    const { description, amount, type, date } = req.body;

    const formattedDate = new Date(date).toISOString().slice(0, 10).replace('T', ' ');

    const updateQuery = "UPDATE history SET `description` = ?, `amount` = ?, `type` = ?, `date` = ? WHERE id = ?";
    const values = [description, amount, type, formattedDate, id];

    db.query(updateQuery, values, (err, result) => {
        if (err) return res.json({ message: "Database error", error: err });
        if (result.affectedRows === 0) {
            return res.json({ message: "No matching record found for update" });
        }
        return res.json({ message: "Expense updated successfully" });
    });
};

//SORT data
exports.sortHistory = (req, res) => {
    const { sortBy, order } = req.body;

    const SortItem = ['description', 'amount', 'type', 'date'];
    if (!SortItem.includes(sortBy)) {
        return res.json({ message: "Invalid sort field" });
    }

    const sortQuery = `SELECT * FROM history ORDER BY ${sortBy} ${order}`;

    db.query(sortQuery, (err, result) => {
        if (err) {
            console.error("Error fetching sorted data:", err);
            return res.json({ message: "Database error", error: err });
        }
        console.log("sorted data:",result)
        res.json(result);
    });
};

//SEARCH data
exports.searchHistory = (req, res) => {
    const searchTerm = req.body.searchTerm; 
    console.log("searchTerm:",searchTerm);
    const searchQuery = `SELECT * FROM history WHERE (description LIKE ? OR type LIKE ?)`;

    const values = [`%${searchTerm}%`, `%${searchTerm}%`];

    db.query(searchQuery, values, (err, result) => {
        if (err) {
            console.error("Error fetching search data:", err);
            return res.json({ message: "Database error" });
        }
        res.json(result);
    });
};
