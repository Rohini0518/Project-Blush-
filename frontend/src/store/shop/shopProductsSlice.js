import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosInstance";

const initialState = {
  isLoading: false,
  shopProductList: [],
  productDetails:null
};

export const getAllShopProducts = createAsyncThunk(
  "/shopproducts/getShopProducts",
  async ({filterParams,sortParams}) => {
    const query=new URLSearchParams({...filterParams,sortBy:sortParams});

    const result = await axiosInstance.get(`/api/shop/products/get?${query}`);
    console.log("shopProducts result.data",result?.data)
    return result?.data;
  },
);

export const getProductDetails=createAsyncThunk("/shopproducts/getProductDetails",
  async (productId, { rejectWithValue })=>{
          console.log("product id slice")

  try {
      const res = await axiosInstance.get(`/api/shop/products/getproduct/${productId}`);
      console.log(res?.data,"product id details")
      return res?.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
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
      })
         .addCase(getProductDetails.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getProductDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productDetails = action.payload.data; 
    })
    .addCase(getProductDetails.rejected, (state) => {
      state.isLoading = false;
      state.productDetails = null;
    });
  },
});

export default shopProductsSlice.reducer