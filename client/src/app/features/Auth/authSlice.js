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
        },

        // subsAuth: (state) => {
        //     if (state.authState && state.authState.subscriptionDetails) {
        //         state.authState.subscriptionDetails.status = 'canceled';
        //     }
        // },        

        subsAuth: (state) => {
            if (state.authState && state.authState.subscriptionDetails) {
                if(state.authState.subscriptionDetails.status === 'canceled') {
                    state.authState.subscriptionDetails.status = 'active';
                }
                else if(state.authState.subscriptionDetails.status === 'active') {
                    state.authState.subscriptionDetails.status = 'canceled';
                }
            }
        },  
    }
})


export default authSlice.reducer;
export const {setAuth,removeAuth,updateAuth,subsAuth} = authSlice.actions;