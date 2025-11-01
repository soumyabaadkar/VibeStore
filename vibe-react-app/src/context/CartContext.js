import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/cart");
      const data = await res.json();
      setCart(data);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  const addToCart = async (product) => {
    try {
      const res = await fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (res.ok) {
        fetchCart();
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const removeFromCart = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/cart/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchCart();
      }
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, (item.quantity || 1) - 1) }
          : item
      )
    );
  };

  const checkout = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/checkout", {
        method: "POST",
      });
      if (res.ok) {
        setCart([]);
        alert("Checkout successful!");
      }
    } catch (err) {
      console.error("Checkout failed:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
