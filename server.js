const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// In-memory database (replace with MongoDB or other DB for production)
const users = [];
const products = [];
const settings = { theme: 'light', notifications: true };
const analytics = { visits: 0 };

// Routes
app.get('/api/users', (req, res) => {
    res.json(users);
});

app.post('/api/users', (req, res) => {
    const { username } = req.body;
    users.push({ username });
    res.json({ message: 'User added successfully', users });
});

app.delete('/api/users/:username', (req, res) => {
    const { username } = req.params;
    const index = users.findIndex(user => user.username === username);
    if (index !== -1) {
        users.splice(index, 1);
        res.json({ message: 'User removed successfully', users });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.post('/api/products', (req, res) => {
    const { name, price } = req.body;
    products.push({ name, price });
    res.json({ message: 'Product added successfully', products });
});

app.put('/api/products/:name', (req, res) => {
    const { name } = req.params;
    const { price } = req.body;
    const product = products.find(product => product.name === name);
    if (product) {
        product.price = price;
        res.json({ message: 'Product updated successfully', products });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

app.delete('/api/products/:name', (req, res) => {
    const { name } = req.params;
    const index = products.findIndex(product => product.name === name);
    if (index !== -1) {
        products.splice(index, 1);
        res.json({ message: 'Product removed successfully', products });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

app.get('/api/settings', (req, res) => {
    res.json(settings);
});

app.put('/api/settings', (req, res) => {
    const { theme, notifications } = req.body;
    settings.theme = theme || settings.theme;
    settings.notifications = notifications !== undefined ? notifications : settings.notifications;
    res.json({ message: 'Settings updated successfully', settings });
});

app.get('/api/analytics', (req, res) => {
    analytics.visits += 1;
    res.json({ message: 'Analytics data fetched successfully', analytics });
});

app.post('/api/analytics/reset', (req, res) => {
    analytics.visits = 0;
    res.json({ message: 'Analytics data reset successfully', analytics });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
