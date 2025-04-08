import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchData = createAsyncThunk('product/fetch', async () => {
    try {
        const response = await axios.get('https://fakestoreapi.com/products')
        // console.log(response.data);
        return response.data
    } catch (error) {
        console.log(error);

    }
})
const initialState = {
    allProducts: [],
    isLoading: false,
    isError: false,
}

const productSlice = createSlice({
    name: 'products',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchData.pending, (state, action) => {
            state.allProducts = []
            state.isLoading = true
            state.isError = false
        })
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.allProducts = action.payload
            state.isLoading = false
            state.isError = false
        })
        builder.addCase(fetchData.rejected, (state, action) => {
            state.allProducts = []
            state.isLoading = false
            state.isError = true
        })
    }
})


export default productSlice.reducer