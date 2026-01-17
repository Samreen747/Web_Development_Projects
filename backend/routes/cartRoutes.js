const express = require("express");
const { addToCart, getCart, updateCart } = require("../controllers/cartController");
const auth = require("../middleware/authmiddleware");
const router = express.Router();

router.post("/add", auth, addToCart);
router.get("/", auth, getCart);
router.post("/update", auth, updateCart);

module.exports = router;
