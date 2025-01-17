import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    
    const savedCart = localStorage.getItem("cart");
    setCartItems(savedCart ? JSON.parse(savedCart) : []);
  }, []);


  const handleRemoveFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); 
    toast.success("Item removed from cart!");
  };


  const handleBuyNow = () => {
    if (cartItems.length === 0) {
      toast.warn("Your cart is empty! Add items before buying.");
    } else {
      toast.success("Proceeding to checkout!");
      navigate("/checkout"); 
    }
  };

  const handleGoHome = () => {
    navigate("/"); 
  };

  return (
    <div className="content-container">
      <h1 className="content-title">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="empty">Your cart is empty!</p>
      ) : (
        <div className="product-list">
          {cartItems.map((item) => (
            <div className="product-card" key={item.id}>
              <img src={item.image} alt={item.title} className="product-image" />
              <h2 className="product-name">{item.title}</h2>
              <p className="product-price">${item.price.toFixed(2)}</p>
              
              <div className="cart-item-buttons">
  <button
    className="add-to-cart-btn"
    onClick={() => handleRemoveFromCart(item.id)}
  >
   Remove
  </button>
  <button className="buy-now-btn" onClick={handleBuyNow}>
    Buy Now
  </button>
</div>

            </div>
          ))}
        </div>
      )}

      <div className="cart-actions">
        <button className="go-home-btn" onClick={handleGoHome}>
          Home
        </button>
      </div>
    </div>
  );
};

export default Cart;
