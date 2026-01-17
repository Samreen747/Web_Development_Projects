/*Displays menu items, handles add/update cart, category filtering
Takes id,name,price,category,image*/
// src/pages/MenuPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api"; // your API instance
import { useAuth } from "../AuthContext";
import "../styles/menu.css";

// All menu items with image URLs
const allItems = [
  // Coffee
  { id: "espresso", name: "Espresso", price: 120, category: "coffee", img: "https://i.pinimg.com/736x/0d/bf/90/0dbf908c72ba1627ddb2aa871189fd0c.jpg" },
  { id: "latte", name: "Latte", price: 140, category: "coffee", img: "https://i.pinimg.com/736x/50/f1/7c/50f17c380525acf16c5ad8df185b1554.jpg" },
  { id: "americano", name: "Americano", price: 140, category: "coffee", img: "https://i.pinimg.com/736x/7c/ff/92/7cff9259605cabc4cc2a9e9ee37018ea.jpg" },
  { id: "cappuccino", name: "Cappuccino", price: 130, category: "coffee", img: "https://i.pinimg.com/1200x/25/c7/ca/25c7ca984b455051ecac4eb68b5de488.jpg" },
  { id: "mocha", name: "Mocha", price: 150, category: "coffee", img: "https://i.pinimg.com/736x/66/bd/32/66bd320679db4217c5c20785a961d1bc.jpg" },
  { id: "Macchiato", name: "Macchiato", price:180 , category: "coffee", img: "https://i.pinimg.com/1200x/f1/4e/70/f14e7007806beed9f34ff9cf733e5e52.jpg" },
  { id: "Affogato", name: "Affogato", price:200 , category: "coffee", img: "https://i.pinimg.com/736x/d2/18/df/d218dfac300b8796228d0cf6c2f89833.jpg"  },
  { id: "Cold Brew", name: "Cold Brew", price:100 , category: "coffee", img: "https://i.pinimg.com/1200x/a0/8b/61/a08b618b6bbe45c5f3ae62ffdaff1d7d.jpg" },
  { id: "Frappuccino", name: "Frappuccino", price: 150, category: "coffee", img: "https://i.pinimg.com/736x/a1/f2/3b/a1f23bbc63595a9722814519a8b5bc05.jpg" },
  { id: "Matcha", name: "Matcha", price:200 , category: "coffee", img: "https://i.pinimg.com/736x/99/17/2b/99172bbaab773545a2230bcd034809c4.jpg" },
  { id: "Raspberry Blast", name: "Raspberry Blast", price:150 , category: "coffee", img: "https://i.pinimg.com/1200x/9f/1e/54/9f1e54abcb5b7ec976cfc8230f818091.jpg" },
  { id: "Lime Mint Mojito", name: "Lime Mint Mojito", price:100 , category: "coffee", img: "https://i.pinimg.com/736x/85/19/f7/8519f7b853619c0df9bcfddb4f62c2de.jpg" },
  

  // Snacks
  { id: "fries", name: "Fries", price: 120, category: "snacks", img: "https://i.pinimg.com/1200x/85/47/fb/8547fb79424b8a28f4b53b8cba922a97.jpg" },
  { id: "wedges", name: "Wedges", price: 120, category: "snacks", img: "https://i.pinimg.com/1200x/91/25/10/9125104ec83eef8a287feacc9ba7e9cc.jpg" },
  { id: "sandwich", name: "Sandwich", price: 150, category: "snacks", img: "https://i.pinimg.com/1200x/a4/5f/84/a45f84e1b049f0270d792ae449b3ffe6.jpg" },
  { id: "Garlic Bread", name: "Garlic Bread", price: 150, category: "snacks", img: "https://i.pinimg.com/1200x/58/5b/b7/585bb77bcceae48e050e6184395334bf.jpg" },
  { id: "Loaded nachos", name: "Loaded nachos", price:150 , category: "snacks", img: "https://i.pinimg.com/736x/94/3f/85/943f85694e2cfd9171ca95d118c07422.jpg" },
  { id: "Garlic cream cheese bun", name: "Garlic cream cheese bun", price:180 , category: "snacks", img: "https://i.pinimg.com/1200x/93/2d/23/932d23c4a98b678f32db5dd8e919702e.jpg"},
  { id: "Onion rings", name: "Onion rings", price:150 , category: "snacks", img: "https://i.pinimg.com/1200x/e8/fe/bf/e8febf720617dc63c7a370aa72db4ff4.jpg" },
  { id: "Salad", name: "Salad", price:150 , category: "snacks", img: "https://i.pinimg.com/1200x/c6/50/da/c650da00562f5263c23369911fb2bff8.jpg" },

  // Desserts
  { id: "tiramisu", name: "Tiramisu", price: 150, category: "desserts", img: "https://i.pinimg.com/736x/c9/a7/95/c9a79568930662f430283ff91ccd2ae7.jpg" },
  { id: "cheesecake", name: "Cheesecake", price: 200, category: "desserts", img: "https://i.pinimg.com/1200x/de/a0/1a/dea01a87b4e0389b06ea43a19e6af30c.jpg" },
  { id: "Blueberry Pie", name: "Blueberry Pie", price: 149, category: "desserts", img: "https://i.pinimg.com/736x/46/53/d3/4653d304c28e302885d9e4310324b2aa.jpg" },
  { id: "Crossiant", name: "Crossiant", price: 149, category: "desserts", img: "https://i.pinimg.com/1200x/cf/9b/af/cf9bafa8f904bb4c2aacf06cebf46331.jpg" },
  { id: "Macaron", name: "Macaron", price: 199, category: "desserts", img: "https://i.pinimg.com/736x/e8/4c/39/e84c39a70df9e3a2cdb85e5c16288dac.jpg" },
  { id: "Cinnamon rolls", name: "Cinnamon rolls", price: 249, category: "desserts", img: "https://i.pinimg.com/1200x/53/f9/7b/53f97be812da8db577ff2e73f1aa4827.jpg" },
  { id: "Chocolate cake", name: "Chocolate cake", price: 299, category: "desserts", img: "https://i.pinimg.com/1200x/33/24/ea/3324ea27478420f7a7431489424c8f9a.jpg" },
  { id: "Fruit tart", name: "Fruit tart", price: 299, category: "desserts", img: "https://i.pinimg.com/1200x/57/ac/d9/57acd92415ae301b6a28fa49e2e0b2b3.jpg"  }
  
];

export default function MenuPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [qtyMap, setQtyMap] = useState({}); // { productId: qty }
  const [activeTab, setActiveTab] = useState("coffee");
  const [message, setMessage] = useState("");

  // Fetch cart items if logged in
  useEffect(() => {
    async function load() {
      if (!isAuthenticated) return;
      try {
        const res = await api.get("/api/cart");
        const items = (res.data && res.data.items) || [];
        const map = {};
        items.forEach((it) => {
          map[it.productId] = it.quantity;
        });
        setQtyMap(map);
      } catch (err) {
        console.error("Failed to load cart", err);
      }
    }
    load();
  }, [isAuthenticated]);
  /*load cart on login
add item:
if user is logged in
if not logged in then its saves item in localstorage redirecting them to login 
and after login item is restored automatically*/

  const addToCartWhenLoggedIn = async (item) => {
    try {
      await api.post("/api/cart/add", {
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
      });
      setQtyMap((m) => ({ ...m, [item.id]: (m[item.id] || 0) + 1 }));//qtyMap state://
      setMessage(`${item.name} added to cart!`);// tracks quantity of each item currently in users cart
      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      console.error("Add failed", err);
      setMessage("Failed to add item");
      setTimeout(() => setMessage(""), 2000);//update quantity:
                                            //UI is updated locally too using setQtyMap
    }
  };

  const handleAddClick = (item) => {
    if (!isAuthenticated) {
      localStorage.setItem(
        "pendingCartItem",
        JSON.stringify({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
        })
      );
      navigate("/login", { state: { from: "/menu" } });
      return;
    }
    addToCartWhenLoggedIn(item);
  };

  const updateQty = async (productId, op) => {
    if (!isAuthenticated) {
      alert("Please login first");
      navigate("/login", { state: { from: "/menu" } });
      return;
    }
    try {
      await api.post("/api/cart/update", { productId, op });
      setQtyMap((m) => {
        const current = m[productId] || 0;
        let next = current;
        if (op === "inc") next = current + 1;
        else if (op === "dec") next = Math.max(0, current - 1);
        const newMap = { ...m };
        if (next <= 0) delete newMap[productId];
        else newMap[productId] = next;
        return newMap;
      });
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update cart");
    }
  };

  const itemsForTab = allItems.filter((it) => it.category === activeTab);

  return (
    <div className="menu-page">
      <h2>Menu</h2>

      <div className="tabs">
        <button className={activeTab === "coffee" ? "active" : ""} onClick={() => setActiveTab("coffee")}>Coffee</button>
        <button className={activeTab === "snacks" ? "active" : ""} onClick={() => setActiveTab("snacks")}>Snacks</button>
        <button className={activeTab === "desserts" ? "active" : ""} onClick={() => setActiveTab("desserts")}>Desserts</button>
      </div>

      {message && <div className="menu-message">{message}</div>}

      <div className="menu-grid">
        {itemsForTab.map((item) => {
          const qty = qtyMap[item.id] || 0;
          return (
            <div key={item.id} className="menu-card">
              <img src={item.img} alt={item.name} className="menu-img" />
              <div>
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
              </div>
              <div className="menu-actions">
                {qty > 0 ? (
                  <div className="counter-box">
                    <button className="dec" onClick={() => updateQty(item.id, "dec")}>−</button>
                    <span className="qty">{qty}</span>
                    <button className="inc" onClick={() => updateQty(item.id, "inc")}>+</button>
                  </div>
                ) : (
                  <button className="add-to-cart" onClick={() => handleAddClick(item)}>Add to Cart</button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <button id="go-to-cart" onClick={() => navigate("/cart")} className="go-cart-btn">
        Go to Cart
      </button>
    </div>
  );
}
