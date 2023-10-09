import express from "express";
import {
  addToCartController,
  removeFromCartController,
  clearCartController,
  getCartController,
} from "../controllers/cartController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js"; 

const router = express.Router();

// Add a product to the cart
router.post("/add-to-cart/:productId", requireSignIn, addToCartController);

// Remove a product from the cart
router.delete("/remove-from-cart/:productId", requireSignIn, removeFromCartController);

// Clear the entire cart
router.delete("/clear-cart", requireSignIn, clearCartController);

// Get the current cart
router.get("/get-cart", requireSignIn, getCartController);

export default router;
