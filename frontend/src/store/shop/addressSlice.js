import { axiosInstance } from "@/api/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  addressList: [],
  error: null, 
};

export const addNewAddress = createAsyncThunk(
  "/addresses/addNewAddress",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/api/shop/address/add",
        formData
      );
      return response?.data;
    } catch (error) {
      console.error("Add Address Error:", error.response?.data || error.message);
      return rejectWithValue({
        message: error.response?.data?.message || error.message || "Failed to add address",
        status: error.response?.status,
        data: error.response?.data,
      });
    }
  }
);

export const fetchAllAddresses = createAsyncThunk(
  "/addresses/fetchAllAddresses",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/api/shop/address/get/${userId}`
      );
      return response?.data;
    } catch (error) {
      console.error("Fetch Addresses Error:", error.response?.data || error.message);
      return rejectWithValue({
        message: error.response?.data?.message || error.message || "Failed to fetch addresses",
        status: error.response?.status,
        data: error.response?.data,
      });
    }
  }
);

export const editAddress = createAsyncThunk(
  "/addresses/editAddress",
  async ({ userId, addressId, formData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/api/shop/address/update/${userId}/${addressId}`,
        formData
      );
      return response?.data;
    } catch (error) {
      console.error("Edit Address Error:", error.response?.data || error.message);
      return rejectWithValue({
        message: error.response?.data?.message || error.message || "Failed to edit address",
        status: error.response?.status,
        data: error.response?.data,
      });
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "/addresses/deleteAddress",
  async ({ userId, addressId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/api/shop/address/delete/${userId}/${addressId}`
      );
      return response?.data;
    } catch (error) {
      console.error("Delete Address Error:", error.response?.data || error.message);
      return rejectWithValue({
        message: error.response?.data?.message || error.message || "Failed to delete address",
        status: error.response?.status,
        data: error.response?.data,
      });
    }
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewAddress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addNewAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; 
        console.log("Add Address Failed:", action.payload);
      })
      
      .addCase(fetchAllAddresses.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
        state.error = null;
      })
      .addCase(fetchAllAddresses.rejected, (state, action) => {
        state.isLoading = false;
        state.addressList = [];
        state.error = action.payload; 
        console.log("Fetch Addresses Failed:", action.payload);
      })
      
      .addCase(editAddress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(editAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; 
        console.log("Edit Address Failed:", action.payload);
      })
      
      .addCase(deleteAddress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; 
        console.log("Delete Address Failed:", action.payload);
      });
  },
});

export const { clearError } = addressSlice.actions;
export default addressSlice.reducer;