const Cart = require("../models/Cart");

exports.addToCart = async (req, res) => {
  try {
    const { productId, name, price, quantity = 1 } = req.body;
    const userId = req.user;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = await Cart.create({ userId, items: [{ productId, name, price, quantity }] });
      return res.json({ msg: "Item added", cart });
    }

    const idx = cart.items.findIndex(i => i.productId === productId);
    if (idx >= 0) {
      cart.items[idx].quantity += quantity;
    } else {
      cart.items.push({ productId, name, price, quantity });
    }
    await cart.save();
    res.json({ msg: "Item added", cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.getCart = async (req, res) => {
  try {
    const userId = req.user;
    const cart = await Cart.findOne({ userId });
    res.json(cart || { items: [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// update quantity: body { productId, op: "inc"|"dec" }
exports.updateCart = async (req, res) => {
  try {
    const { productId, op } = req.body;
    const userId = req.user;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ msg: "Cart not found" });

    const idx = cart.items.findIndex(i => i.productId === productId);
    if (idx < 0) return res.status(404).json({ msg: "Product not in cart" });

    if (op === "inc") cart.items[idx].quantity += 1;
    else if (op === "dec") cart.items[idx].quantity -= 1;

    if (cart.items[idx].quantity <= 0) {
      cart.items.splice(idx, 1);
    }

    await cart.save();
    res.json({ msg: "Cart updated", cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
