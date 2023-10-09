import React, { useState, useContext, createContext, useEffect } from "react";
import axios from "axios"; // Import Axios for API requests

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Fetch the cart data from the server (MongoDB)
    const fetchCartData = async () => {
      try {
        const response = await axios.get("/api/v1/cart"); // Adjust the API endpoint
        setCart(response.data);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCartData();
  }, []);

  // Define functions for interacting with the cart on the server

  const addToCart = async (productId, quantity) => {
    try {
      // Make a POST request to add an item to the cart
      const response = await axios.post("/api/v1/cart/add", {
        productId,
        quantity,
      });
      setCart(response.data);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      // Make a DELETE request to remove an item from the cart
      const response = await axios.delete(`/api/v1/cart/remove/${productId}`);
      setCart(response.data);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const clearCart = async () => {
    try {
      // Make a DELETE request to clear the entire cart
      await axios.delete("/api/v1/cart/clear");
      setCart([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access cart data and functions
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
