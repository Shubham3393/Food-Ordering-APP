import { createSlice } from "@reduxjs/toolkit";

const initialUIState = {showCart : false, placeOrder :false, loadingOrder : false, orderPlaced : false};
const ui = createSlice({
    name : "ui",
    initialState : initialUIState,
    reducers : {
        visibleCart(state){state.showCart = true},
        inVisibleCart(state){state.showCart = false},
        placeOrderHandler(state){state.placeOrder = !state.placeOrder},
        loadingOrderHandler(state){state.loadingOrder = !state.loadingOrder},
        orderPlacedHandler(state){state.orderPlaced = !state.orderPlaced}
    }
})

export const uiActions = ui.actions;

export default ui;