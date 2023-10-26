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
        }
    }
})


export default authSlice.reducer;
export const {setAuth,removeAuth} = authSlice.actions;