import express from "express";
import  { addToCart, fetchCartItems, updateCartItemQuantity, deleteCartItem } from "../../routes/shop/cart-controller.js"



const cartrouter= express.Router();

cartrouter.post('/add',addToCart);
cartrouter.get('/get',fetchCartItems);
cartrouter.put('/update-cart',updateCartItemQuantity);
cartrouter.delete('/:userId/:productId',fetchCartItems);

export default cartrouter;