import { createSlice } from "@reduxjs/toolkit";
const  initialCartState ={Items: ["ab"], totalAmount : 0, totalQuantity : 0, changed: false};

const cartItems = createSlice({
    name: "cartItems",
    initialState: initialCartState,
    reducers:{

        replaceCart(state, action){
            state.Items = action.payload.items;
            state.totalAmount = action.payload.totalAmount;
            state.totalQuantity = action.payload.totalQuantity;
            state.changed = action.payload.changed;
        },

        addItemsToCart(state, action){
            state.changed =true;
            const temp = action.payload.item;
            state.totalAmount += temp.price * temp.quantity;
            state.totalQuantity += temp.quantity;
            state.changed = true;
            const item = state.Items.find(item => item.id===temp.id);
            if(item===undefined){
                state.Items.push({
                    id:temp.id, 
                    price:temp.price, 
                    description:temp.description, 
                    name:temp.name, 
                    quantity:temp.quantity
                });
            }
            else {
                item.quantity += temp.quantity;
            }
        },

        removeItemsFromCart(state, action){
            state.changed =true;
            const temp = action.payload.item;
            state.totalAmount -= temp.price * temp.quantity;
            state.totalQuantity -= temp.quantity;
            state.changed = true;
            const item = state.Items.find( item => item.id===temp.id );
            if(item.quantity===1){
                const temp1 = state.Items.filter( item => item.id!== temp.id);
                state.Items = temp1;
            }
            else {
                item.quantity -= temp.quantity;;
            }
            
        }
    }
})

export const cartItemsActions = cartItems.actions;

export default cartItems;
