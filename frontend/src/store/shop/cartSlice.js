import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosInstance";

const initialState = {
  cartItems: [],
  isLoading: false,
};
// video@ 7:28
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({userId, productId, quantity}) => {
    const response = await axiosInstance.post("/api/shop/cart/add", {
      userId,
      productId,
      quantity,
    });
    return response?.data;
  },
);

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCart",
  async (userId) => {
    const response = await axiosInstance.get(`/api/shop/cart/get/${userId}`);
    return response?.data;
  },
);

export const updateCartItem = createAsyncThunk(
  "/cart/updateCartItem",
  async ({userId, productId, quantity}) => {
    const response = await axiosInstance.put("/api/shop/cart/update-cart", {
      userId,
      productId,
      quantity,
    });
    return response?.data;
  },
);
export const deleteCartItem = createAsyncThunk(
  "cart/deleteCart",
  async (userId, productId) => {
    const response = await axiosInstance.delete(
      `/api/shop/cart/delete/${userId}/${productId}`,
    );
    return response?.data;
  },
);

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addToCart.pending,(state)=>{
        state.isLoading=true;
    }).addCase(addToCart.fulfilled,(state,action)=>{
        state.isLoading=false;
        state.cartItems=action.payload.data;
    }).addCase(addToCart.rejected,(state)=>{
        state.isLoading=false;
        state.cartItems=[];
    }).addCase(fetchCartItems.pending,(state)=>{
        state.isLoading=true;
    }).addCase(fetchCartItems.fulfilled,(state,action)=>{
        state.isLoading=false;
        state.cartItems=action.payload.data;
    }).addCase(fetchCartItems.rejected,(state)=>{
        state.isLoading=false;
        state.cartItems=[];
    }).addCase(updateCartItem.pending,(state)=>{
        state.isLoading=true;
    }).addCase(updateCartItem.fulfilled,(state,action)=>{
        state.isLoading=false;
        state.cartItems=action.payload.data;
    }).addCase(updateCartItem.rejected,(state)=>{
        state.isLoading=false;
        state.cartItems=[];
    }).addCase(deleteCartItem.pending,(state)=>{
        state.isLoading=true;
    }).addCase(deleteCartItem.fulfilled,(state,action)=>{
        state.isLoading=false;
        state.cartItems=action.payload.data;
    }).addCase(deleteCartItem.rejected,(state)=>{
        state.isLoading=false;
        state.cartItems=[];
    })
  },
});

export default shoppingCartSlice.reducer;
