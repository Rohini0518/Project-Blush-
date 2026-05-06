import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosInstance";


const initialState={
    cartItems:[],
    isLoading: false,
    
}

export const addToCart=createAsyncThunk('cart/addToCart',async (userId,productId,qunatity )=>{

    const response=await axiosInstance.post()

})

const shoppingCartSlice=createSlice({
    name:'shoppingCart',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{

    }
})