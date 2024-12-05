const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const authRoute = require('./route/auth');

const app = express();
require('./config/db');

// Logging Middleware
app.use(morgan('dev'));

// Other Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    console.log('Request Body:', req.body);
    next();
});

// Test route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to CRM Sales Pipelines API' });
});

app.use('/api/admin', authRoute);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(`[${new Date().toISOString()}] Error:`, err);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Set port and start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
