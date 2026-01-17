const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  category: String,
  sku: String //stock keeping unit => unique code  eg:cafe-001
});

module.exports = mongoose.model("Product", productSchema);
