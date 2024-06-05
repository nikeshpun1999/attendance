const mongoose = require('mongoose');

const config = require('../config');

const dbUrl = config.dbUrlMongoDB;


async function connectToDatabase() {
  try {
      await mongoose.connect(dbUrl);
      console.log('Connected to MongoDB');
  } catch (err) {
      console.error('Failed to connect to MongoDB', err);
      process.exit(1); // Exit the process with failure
  }
}

connectToDatabase();
// mongoose.connect(
//   dbUrl,
//   { useNewUrlParser: true, useUnifiedTopology: true }, // To avoid deprecated options
//   async (err) => {
//     if (err) console.log('Error', err);
//     else console.log('Mongodb connected');
//   }
// );

module.exports = mongoose;
