import {createSlice} from '@reduxjs/toolkit';

const productsSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        fetchProducts:(state, action) => {
            state.push(...action.payload);
        }
    }
});

export const { fetchProducts } = productsSlice.actions;
export default productsSlice.reducer;
