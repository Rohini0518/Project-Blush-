import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosInstance";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",
  async (formData) => {
    const result = await axiosInstance.post(
      "/api/admin/products/addProduct",
      formData,
    );

    return result?.data;
  },
);

export const updateNewProduct = createAsyncThunk(
  "/products/updateProduct",
  async (formData) => {
    const result = await axiosInstance.put(
      "/api/admin/products/editProduct/:id",
      formData,
    );
    return result?.data;
  },
);

export const getAllAdminProducts = createAsyncThunk(
  "/products/getProducts",
  async () => {
    const result = await axiosInstance.get("/api/admin/products/getProducts");
    return result.data;
  },
);

export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async () => {
    const result = await axiosInstance.delete(
      "/api/admin/product/delteProduct/:id",
    );
    return result.data;
  },
);

const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {
    setProductList: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewProduct.pending, (state) => {
        state.isLoading = true;
        state.productList = [];
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload;
      })
      .addCase(addNewProduct.rejected, (state) => {
        state.isLoading = false;
        state.productList= [];
      });
  },
});
