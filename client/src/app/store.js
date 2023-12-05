import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/Auth/authSlice';
import adminReducer from './features/Admin/adminSlice';
import userReducer from './features/User/userSlice';
import dataReducer from './features/Data/dataSlice';
import appointmentReducer from './features/Appointment/appointmentSlice';
import trainerReducer from './features/Trainer/trainerSlice';


const store = configureStore({
    reducer: {
        auth: authReducer,
        admin: adminReducer,
        user: userReducer,
        trainer: trainerReducer,
        data: dataReducer,
        appointment: appointmentReducer,
    }
})


export default store;