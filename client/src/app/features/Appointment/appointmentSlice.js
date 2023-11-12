import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../../api/axiosInstance";


const initialState = {

    loading: false,
    success: false,
    appointment: {},
    error: ''
}



//TRAINER GET ALL APPOINTMENTS

export const trainerGetAppointment = createAsyncThunk('trainer/trainerGetAppointment', async (_, { rejectWithValue }) => {

    try {
        
        const response = await instance.get(`trainer/view-appointments`, { withCredentials: true })

        if (response.status === 200) {
            console.log(response.data)
            return response.data;
        } else {
        // If the response is not successful, handle it here
            return rejectWithValue('Failed to fetch user data');
        }
    } catch (error) {
        return rejectWithValue('Network error');
    }
})







const appointmentSlice = createSlice({
    name: 'appointment',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
        .addCase(trainerGetAppointment.pending, (state) => {
            state.loading = true;
        })
        .addCase(trainerGetAppointment.fulfilled, (state, action) => {
            state.loading = false;
            state.appointment = action.payload;
        })
        .addCase(trainerGetAppointment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
})






export default appointmentSlice.reducer;

