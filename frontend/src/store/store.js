import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import adminProductsSlice from "./admin/adminProductSlice";
import shopProductsReducer from "./shop/shopProductsSlice"; 
const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsSlice,
    shopProducts:shopProductsReducer,
  },
});

export default store;
