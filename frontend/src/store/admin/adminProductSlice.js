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
      formData
    );
    return result?.data;
  },
);

export const updateProduct = createAsyncThunk(
  "/products/updateProduct",
  async ({id,formData}) => {
    const result = await axiosInstance.put(
     `/api/admin/products/editProduct/${id}`,
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
  async (id) => {
    const result = await axiosInstance.delete(
     `/api/admin/products/deleteProduct/${id}`,
    );
    return result.data;
  },
);

//  Frontend dispatch →
// createAsyncThunk →
// Redux sends pending →
// API call via axios →
// success → fulfilled →
// data → reducer →
// store updated →
// UI updates
// 🔥 Important: Why push works (Immer magic)

// Redux Toolkit uses Immer, so this is safe:

// state.productList.push(...)

// 👉 Internally it’s still immutable ✅

const adminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {
    setProductList: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAdminProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllAdminProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
        console.log(action.payload,"action.payload in")
      })
      .addCase(getAllAdminProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList= [];
      });
  },
});


export default adminProductsSlice.reducer;