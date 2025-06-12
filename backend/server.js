const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

// Use routes
app.use('/api/items', require('./routes/itemRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));

// Set port and start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 