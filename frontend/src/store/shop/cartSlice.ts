import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosInstance";

interface CartItem {
  productId: string;
  quantity: number;
  title?: string;
  image?: string;
  price?: number;
}
interface CartState {
  cartItems: CartItem[];
  isLoading: boolean;
  error: string | null;
}

const initialState:CartState = {
  cartItems: [],
  isLoading: false,
  error: null,
};

interface CartPayload {
  userId: string;
  productId: string;
  quantity: number;
}

interface CartResponse {
  success: boolean;
  data: {
    items: CartItem[];
  };
}

interface DeleteCartPayload {
  userId:string;
  productId:string;
}

///createAsyncThunk<
    // Returned,
    // ThunkArg
// >(
    // type,
    // payloadCreator
// )
// Ask yourself:

// A (1st generic) → What does return give back? ✅
// B (2nd generic) → What argument do I pass to dispatch()? ✅
export const addToCart = createAsyncThunk<CartResponse,CartPayload>(
  "cart/addToCart",
  async ({ userId, productId, quantity }) => {
    const response = await axiosInstance.post("/api/shop/cart/add", {
      userId,
      productId,
      quantity,
    });
    return response?.data;
  },
);

// fetchCartItems:

// Current :   createAsyncThunk(

// Question:What does it return?  ans) response.data

// which is CartResponse

// Question:What argument does it receive? ans)userId (which is :::string)

// So write:::createAsyncThunk<  CartResponse, string>(

export const fetchCartItems = createAsyncThunk<CartResponse,string>(
  "cart/fetchCart",
  async (userId) => {
    const response = await axiosInstance.get(`/api/shop/cart/get/${userId}`);
    console.log(response.data, "cart-responsedata");
    return response?.data;
  },
);

export const updateCartItem = createAsyncThunk<CartResponse,CartPayload>(
  "/cart/updateCartItem",
  async ({ userId, productId, quantity }) => {
    const response = await axiosInstance.put("/api/shop/cart/update-cart", {
      userId,
      productId,
      quantity,
    });
    return response?.data;
  },
);
export const deleteCartItem = createAsyncThunk<CartResponse,DeleteCartPayload>(
  "cart/deleteCart",
  async ({ userId, productId }) => {
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
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data.items;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        console.log(action.payload.data.items, "playloadcartitems");
        state.isLoading = false;
        state.cartItems = action.payload.data.items;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(updateCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data.items;
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data.items;
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      });
  },
});

export default shoppingCartSlice.reducer;
