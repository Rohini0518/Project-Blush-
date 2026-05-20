import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import adminProductsSlice from "./admin/adminProductSlice";
import shopProductsSlice from "./shop/shopProductsSlice";
import shoppingCartSlice from "./shop/cartSlice";
import shopAddressSlice from "./shop/addressSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsSlice,
    shopProducts: shopProductsSlice,
    shoppingCart: shoppingCartSlice,
    shopAddress: shopAddressSlice,
  },
});

export default store;
