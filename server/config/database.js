const mongoose = require("mongoose");
const { DATABASE_URI } = require("./env");

const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (err) {
    console.error(err);
  }
};
module.exports = connectDB;
