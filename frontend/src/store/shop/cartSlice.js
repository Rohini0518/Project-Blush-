import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosInstance";

const initialState = {
  cartItems: [],
  isLoading: false,
     error:null
};

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
    console.log(response.data,"cart-responsedata")
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
  async ({userId, productId}) => {
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
        state.cartItems=action.payload.data.items;
    }).addCase(addToCart.rejected,(state,action)=>{
        state.isLoading=false;
        state.error=action.error.message;
    }).addCase(fetchCartItems.pending,(state)=>{
        state.isLoading=true;
    }).addCase(fetchCartItems.fulfilled,(state,action)=>{
      console.log(action.payload.data.items,"playloadcartitems")
        state.isLoading=false;
        state.cartItems=action.payload.data.items;
    }).addCase(fetchCartItems.rejected,(state,action)=>{
        state.isLoading=false;
        state.error=action.error.message;
    }).addCase(updateCartItem.pending,(state)=>{
        state.isLoading=true;
    }).addCase(updateCartItem.fulfilled,(state,action)=>{
        state.isLoading=false;
        state.cartItems=action.payload.data.items;
    }).addCase(updateCartItem.rejected,(state,action)=>{
        state.isLoading=false;
        state.error=action.error.message;
    }).addCase(deleteCartItem.pending,(state)=>{
        state.isLoading=true;
    }).addCase(deleteCartItem.fulfilled,(state,action)=>{
        state.isLoading=false;
        state.cartItems=action.payload.data.items;
    }).addCase(deleteCartItem.rejected,(state,action)=>{
        state.isLoading=false;
        state.error=action.error.message;
    })
  },
});

export default shoppingCartSlice.reducer;
