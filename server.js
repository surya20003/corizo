const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/favicon.ico', (req, res) => res.status(204).end());

// Get all employees
app.get('/api/employees', (req, res) => {
    const sql = 'SELECT * FROM employees ORDER BY created_at DESC';
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ data: rows });
    });
});

// Get single employee
app.get('/api/employees/:id', (req, res) => {
    const sql = 'SELECT * FROM employees WHERE id = ?';
    db.get(sql, [req.params.id], (err, row) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.json({ data: row });
    });
});

// Create new employee
app.post('/api/employees', (req, res) => {
    const { name, email, position, department } = req.body;
    if (!name || !email || !position || !department) {
        return res.status(400).json({ error: 'Please provide all required fields' });
    }
    const sql = 'INSERT INTO employees (name, email, position, department) VALUES (?, ?, ?, ?)';
    const params = [name, email, position, department];
    db.run(sql, params, function (err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.status(201).json({
            message: 'Employee created successfully',
            data: { id: this.lastID, name, email, position, department }
        });
    });
});

// Update employee
app.put('/api/employees/:id', (req, res) => {
    const { name, email, position, department } = req.body;
    const sql = `UPDATE employees SET 
                 name = COALESCE(?, name), 
                 email = COALESCE(?, email), 
                 position = COALESCE(?, position), 
                 department = COALESCE(?, department) 
                 WHERE id = ?`;
    const params = [name, email, position, department, req.params.id];
    db.run(sql, params, function (err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.json({ message: 'Employee updated successfully', changes: this.changes });
    });
});

// Delete employee
app.delete('/api/employees/:id', (req, res) => {
    const sql = 'DELETE FROM employees WHERE id = ?';
    db.run(sql, req.params.id, function (err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.json({ message: 'Employee deleted successfully', changes: this.changes });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
