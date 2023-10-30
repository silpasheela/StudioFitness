import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    authState : localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
}

const authSlice = createSlice({

    name: 'user',
    initialState,
    reducers: {
        setAuth: (state) => {
            console.log("test")
            state.authState = JSON.parse(localStorage.getItem('user')); //actions
        },

        removeAuth: (state) => {
            state.authState = null  //actions
        },

        updateAuth: (state, action) => {
            state.authState = {...state.authState,...action.payload}
            console.log("state.authState",state.authState)
        }
    }
})


export default authSlice.reducer;
export const {setAuth,removeAuth,updateAuth} = authSlice.actions;