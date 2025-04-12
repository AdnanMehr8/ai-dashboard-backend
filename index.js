const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');
dotenv.config();

// Connect to MongoDB
require('./configure/db-config');

// Create Express app
const app = express();

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://ai-dashboard-taupe.vercel.app');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-auth-token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

// Body parser middleware
app.use(express.json());

// API routes
app.use('/api', userRoutes);
app.use('/api', messageRoutes);

// Health check endpoint
// app.get('/api/health', (req, res) => {
//   const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
//   res.json({ 
//     status: 'ok', 
//     database: dbStatus,
//     timestamp: new Date().toISOString()
//   });
// });

// Local development server
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export for Vercel serverless
module.exports = app;