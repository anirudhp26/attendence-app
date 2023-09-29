import { createSlice } from '@reduxjs/toolkit';

const defaultState = {
    token: null,
    user: null,
    cart: [],
};

export const authSlice = createSlice({
    name: "auth",
    defaultState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },

        setLogout: (state) => {
            state.user = null;
            state.token = null;
            state.cart = [];
        },
    }
});

export const { setLogin, setLogout, setCart } = authSlice.actions;

export default authSlice.reducer;
