import express from "express";
import  { addToCart, fetchCartItems, updateCartItemQuantity, deleteCartItem } from "../../routes/shop/cart-controller.js"



const router= express.Router();

router.post('/add',addToCart);
router.get('/get',fetchCartItems);
router.put('/update-cart',updateCartItemQuantity);
router.delete('/:userId/:productId',fetchCartItems);

export default router;