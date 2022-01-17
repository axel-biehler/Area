const mongoose = require('mongoose');

const clientOptions = {
  useNewUrlParser: true,
  dbName: 'dashboard',
};

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, clientOptions);
    console.log('connected to database.');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  connectToDatabase,
};
