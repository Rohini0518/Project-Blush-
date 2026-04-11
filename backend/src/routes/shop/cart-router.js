import express from "express";
import  { addToCart, fetchCartItems, updateCartIteQuantity, deleteCartItem } from "../../routes/shop/cart-controller.js"



const router= express.Router();

router.post('/add',addToCart);
router.get('/get',fetchCartItems);
router.put('/update-cart',updateCartIteQuantity);
router.delete('/:userId/:productId',fetchCartItems);

export default router;