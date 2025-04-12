const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { 
   serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
   socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
   family: 4 // Use IPv4, skip trying IPv6
},
  )
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

  module.exports = mongoose;