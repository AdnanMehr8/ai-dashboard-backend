const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { 
   serverSelectionTimeoutMS: 5000, 
   socketTimeoutMS: 45000, 
   family: 4 
},
  )
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

  module.exports = mongoose;