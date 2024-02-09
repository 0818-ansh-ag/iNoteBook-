const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://users:user123@cluster0.otwu7bv.mongodb.net/inotebook";
const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("MongoDB is connected successfully");
  });
};

module.exports = connectToMongo;
