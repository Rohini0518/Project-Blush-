import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartItem, addToCart } from "../store/shop/cartSlice";

export function useCart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.shoppingCart.cartItems);
  const { user } = useSelector((state) => state.auth);
  const userId = user?.id;

  const increase = useCallback(
    async (productId, qty) => {
      if (!userId || !productId) return;
      try {
        await dispatch(
          updateCartItem({ userId, productId, quantity: qty + 1 }),
        ).unwrap();
      } catch (error) {
        console.error("Failed to increase quantity:", error);
      }
    },
    [userId],
  );

  const decrease = useCallback(
    async (productId, qty) => {
      if (!userId || !productId) return;
      try {
        if (qty === 1) {
          await dispatch(deleteCartItem({ userId, productId }));
        } else {
          await dispatch(
            updateCartItem({ userId, productId, quantity: qty - 1 }),
          ).unwrap();
        }
      } catch (error) {
        console.error("Failed to decrease quantity:", error);
      }
    },
    [dispatch, userId],
  );
  const addCartItem = useCallback(
    async (productId, quantity = 1) => {
      if (!userId || !productId) return;
      try {
        await dispatch(addToCart({ userId, productId, quantity })).unwrap();
      } catch (error) {
        console.error("Failed to add to cart:", error);
      }
    },
    [dispatch, userId],
  );

  return { increase, decrease, addCartItem, cartItems };
}
