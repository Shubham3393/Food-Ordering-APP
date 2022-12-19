import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    userData : [],
    formValid : false,
    form : {email : true, password : true}
} 

const authSlicer = createSlice({
    name : 'authentication',
    initialState : initialAuthState,
    reducers : {
        formValidHandler(state){
            state.formValid = true;
        },
        formHandler(state, action){
            state.form.email = action.payload.email;
            state.form.password = action.payload.password;
        },
        userDataHandler(state, action){
            state.userData = action.payload.data;
        }
    }
})

export const signIn =  (props) => {
    return async (dispatch) => {
        const signinData = async () => {
            const response =  await fetch('https://food-ordering-app-bf020-default-rtdb.firebaseio.com/auth.json',{
                method : 'POST',
                body : JSON.stringify({
                    username : props.username,
                    email : props.email,
                    password : props.password
                })
            })

            if(!response.ok){
                throw new Error('impossible signin')
            }
        }
        try {
            await signinData();
        } catch (error) {
            
        }
        
    }
}

export const logIn = () => {

    return async (dispatch) => {
        
        const  fetchUserData = async () => {
            const response = await fetch('https://food-ordering-app-bf020-default-rtdb.firebaseio.com/auth.json');

            if(!response.ok){
                throw new Error('something went wrong while fetching data');
            }

            
            const temp = await response.json();
            
            const data = [];
            for(const key in temp){
                data.push({
                    username : temp[key].username,
                    email: temp[key].email,
                    password : temp[key].password
                });
            }
            
            dispatch(authActions.userDataHandler({data}));
        }
        try {
            await fetchUserData();
        } catch (error) {
            
        }
        
    }
}

export const authActions = authSlicer.actions;
export default authSlicer;