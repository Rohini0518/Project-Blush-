import {Router} from "express";
import  { addToCart, fetchCartItems, updateCartItemQuantity, deleteCartItem } from "../../controllers/shop/cart-controller.js"



const cartrouter= Router();

cartrouter.post('/add',addToCart);
cartrouter.get('/get/:userId',fetchCartItems);
cartrouter.put('/update-cart',updateCartItemQuantity);
cartrouter.delete('/:userId/:productId',deleteCartItem);

export default cartrouter;