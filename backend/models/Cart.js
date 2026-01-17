const mongoose = require("mongoose");//importing mongoose libraray

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },//ref links cart to user
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      quantity: Number
    }
  ]
});

module.exports = mongoose.model("Cart", cartSchema);
