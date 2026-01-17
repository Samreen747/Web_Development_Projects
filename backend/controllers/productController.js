const Product = require("../models/Product");

// return all products (optional)
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
