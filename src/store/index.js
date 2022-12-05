import { configureStore } from '@reduxjs/toolkit'; 
import authSlicer from './auth';
import cartItems from './cart';
import ui from './ui';

const store = configureStore({
    reducer: { cart : cartItems.reducer, ui : ui.reducer, auth : authSlicer.reducer}
})

export default store;