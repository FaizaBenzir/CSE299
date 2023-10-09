// Import any necessary modules, models, or dependencies as needed
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

// Function to add a product to the cart
export const addToCartController = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    // Fetch the product by its ID from the database
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Create or update the user's cart
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({ user: req.user._id, cartItems: [] });
    }

    // Check if the product is already in the cart
    const existingCartItem = cart.cartItems.find((item) => {
      return item.product.toString() === productId;
    });

    if (existingCartItem) {
      // If the product exists in the cart, update its quantity
      existingCartItem.quantity += parseInt(quantity, 10);
    } else {
      // If the product is not in the cart, add it
      cart.cartItems.push({ product: productId, quantity });
    }

    // Save the cart to the database
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to remove a product from the cart
export const removeFromCartController = async (req, res) => {
  try {
    const { productId } = req.params;

    // Fetch the user's cart
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Remove the product from the cart
    cart.cartItems = cart.cartItems.filter(
      (item) => item.product.toString() !== productId
    );

    // Save the updated cart
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to clear the entire cart
export const clearCartController = async (req, res) => {
  try {
    // Find and delete the user's cart
    await Cart.findOneAndDelete({ user: req.user._id });

    res.status(204).end();
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to get the user's current cart
export const getCartController = async (req, res) => {
  try {
    // Fetch the user's cart
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "cartItems.product"
    );

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error getting cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
