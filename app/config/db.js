const mongoose = require("mongoose");
const config = require("config");
// const seeding = require("../seed");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("Database connected ....");
    // seeding();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
