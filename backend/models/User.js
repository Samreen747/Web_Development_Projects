const mongoose = require("mongoose");
// A schema defines the structure of documents.
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },//unique :prevents duplicate email entries
  password: String //stores user's encrypted password
});

module.exports = mongoose.model("User", userSchema);
