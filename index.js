const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');
dotenv.config();

// Connect to MongoDB
require('./configure/db-config');

const app = express();
const PORT = process.env.PORT || 5000;

// app.use(cors({
//   // origin: 'http://localhost:3000', 
//   origin: 'https://ai-dashboard-taupe.vercel.app', 

//   // credentials: true, 
// }));

// Simplified CORS setup
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://ai-dashboard-taupe.vercel.app');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', messageRoutes);

app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.json({ 
    status: 'ok', 
    database: dbStatus,
    timestamp: new Date().toISOString()
  });
});
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// if (process.env.NODE_ENV !== 'production') {
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// }

module.exports = app;