import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosInstance";

const initialState = {
  isLoading: false,
  shopProductList: [],
};

export const getAllShopProducts = createAsyncThunk(
  "/shopproducts/getShopProducts",
  async () => {
    const result = await axiosInstance.get("/api/shop/products");
    return result?.data;
  },
);
const shopProductsSlice = createSlice({
  name: "shopProducts",
  initialState,
  reducers: {
    setShopProductList: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllShopProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllShopProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.shopProductList = action?.payload.data;
      })
      .addCase(getAllShopProducts.rejected, (state) => {
        state.isLoading = false;
        state.shopProductList = [];
      });
  },
});

export default shopProductsSlice.reducer