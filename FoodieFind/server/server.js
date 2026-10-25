require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const recipeRoutes = require('./routes/recipeRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Health check and root route
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: '🍲 Welcome to FoodieFind REST API',
    endpoints: {
      recipes: '/api/recipes',
      seed: '/api/recipes/seed',
    },
  });
});

// Recipe Routes
app.use('/api/recipes', recipeRoutes);

// 404 Route Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Resource not found on path: ${req.originalUrl}`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err.stack || err);
  res.status(500).json({
    success: false,
    message: 'Internal server error occurred',
    error: process.env.NODE_ENV === 'production' ? null : err.message,
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`🚀 FoodieFind Server running on port ${PORT}`);
  console.log(`🔗 API URL: http://localhost:${PORT}/api/recipes`);
  console.log(`===============================================`);
});
