import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/Auth/authSlice';
import adminReducer from './features/Admin/adminSlice';
import userReducer from './features/User/userSlice';
import dataReducer from './features/Data/dataSlice';
import appointmentReducer from './features/Appointment/appointmentSlice'


const store = configureStore({
    reducer: {
        auth: authReducer,
        admin: adminReducer,
        user: userReducer,
        data: dataReducer,
        appointment: appointmentReducer,
    }
})


export default store;