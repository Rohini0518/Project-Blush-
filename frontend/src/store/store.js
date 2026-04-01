import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import adminProductsSlice from "./admin/adminProductSlice";
import shopProductsSlice from "./shop/shopProductsSlice"; 

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsSlice,
    shopProducts:shopProductsSlice,
  },
});

export default store;
