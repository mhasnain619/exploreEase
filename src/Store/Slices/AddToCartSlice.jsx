import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cart: [],
    isLoading: false,
    isError: false
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const itemExist = state.cart.find(item => item.id === action.payload.id)
            if (itemExist) {
                itemExist.quantity += 1
            } else {
                state.cart.push({ ...action.payload, quantity: 1 })
            }
        },
        removeItem(state, action) {
            state.cart = state.cart.filter(item => item.id !== action.payload.id)
        }
    }
})
export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;