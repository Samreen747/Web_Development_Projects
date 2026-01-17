//Loads user's cart, updates quantities, calculates total
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../AuthContext";
import "../styles/cart.css";

export default function CartPage() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);      //state: ->items: array of cart products
  const [loading, setLoading] = useState(true);//->loading->to show loading cart until data is fetched

  // Load Cart (useCallback so React doesn't warn)
/*fetchcart:
Loads cart from backend
usecallback is used so React doesn't recreate the function on every render
handles 401 user session expired->logout+go to login*/
  const fetchCart = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/cart");
      setItems(res.data.items || []);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        alert("Session expired. Login again.");
        logout();
        navigate("/login");
      } else {
        alert("Failed to load cart");
      }
    } finally {
      setLoading(false);
    }
  }, [logout, navigate]);

  // Update Quantity-updateQty:
  //It sends the update request to backend & reloads the cart using fetchcart
  const updateQty = async (productId, op) => { 
    try {
      await api.post("/api/cart/update", { productId, op });
      await fetchCart();
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        alert("Session expired. Login again.");
        logout();
        navigate("/login");
      } else {
        alert("Failed to update cart");
      }
    }
    console.log("cart page loaded");
  };
//useeffect:
//Runs when page loads
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/cart" } });
      return;
    }
    fetchCart();
  }, [isAuthenticated, navigate, fetchCart]);

  if (!isAuthenticated) return null;
  if (loading) return <p>Loading cart...</p>;
//final calculation is done
  const subtotal = items.reduce((sum, it) => sum + it.price * it.quantity, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  return (
    <main className="cart-container">
      <h2>Your Cart</h2>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>

            <tbody>
              {items.map((it) => (
                <tr key={it.productId}>
                  <td>{it.name}</td>
                  <td>₹{it.price}</td>

                  <td>
                    <button className="dec" onClick={() => updateQty(it.productId, "dec")}>
                      −
                    </button>
                    <span className="qty">{it.quantity}</span>
                    <button className="inc" onClick={() => updateQty(it.productId, "inc")}>
                      +
                    </button>
                  </td>

                  <td>₹{it.price * it.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-summary">
            <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
            <p>Tax (5%): ₹{tax.toFixed(2)}</p>
            <p className="total">
              Total: <strong>₹{total.toFixed(2)}</strong>
            </p>

            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </>
      )}
    </main>
  );
}
