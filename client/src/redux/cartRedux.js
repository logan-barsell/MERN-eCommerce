import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
        quantity: 0,
        total: 0
    },
    reducers: {
        addProduct:(state, action) => {
            const cartId = state.products.length;
            state.quantity += 1;
            state.products.push({cartId, ...action.payload});
            state.total += action.payload.price * action.payload.quantity;
        },
        removeProduct:(state, action) => {
            state.quantity -= 1;
            state.products = state.products.filter(product => product.cartId !== action.payload.cartId);
            state.total -= action.payload.price * action.payload.quantity;
        },
        changeProductQuantity:(state, action) => {
            const index = state.products.findIndex(product => product.cartId === action.payload.id);
            const product = state.products[index];
            const baseTotal = state.total - (product.quantity * product.price);
            state.products[index].quantity = action.payload.quantity;
            state.total = baseTotal + (action.payload.quantity * product.price);
        }
    },
});

export const {addProduct, removeProduct, changeProductQuantity} = cartSlice.actions;
export default cartSlice.reducer;