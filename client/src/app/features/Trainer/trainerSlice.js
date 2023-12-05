import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../../api/axiosInstance";

const initialState = {

    loading: false,
    success: false,
    trainer: {},
    error: ''
}


export const trainerGetSlots = createAsyncThunk('trainer/trainerGetSlots', async(_, { rejectWithValue }) => {
    try {
        const response = await instance.get('trainer/view-slots',{ withCredentials: true });

        if (response.status === 200) {
            return response.data;
        } else {
        // If the response is not successful, handle it here
            return rejectWithValue('Failed to fetch trainer data');
        }
    } catch (error) {
      // Handle any network or request error here
        return rejectWithValue('Network error');
    }
})



const trainerSlice = createSlice({
    name:'trainer',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
        .addCase(trainerGetSlots.pending, (state) => {
            state.loading = true;
        })
        .addCase(trainerGetSlots.fulfilled, (state, action) => {
            state.loading = false;
            state.trainer = action.payload;
        })
        .addCase(trainerGetSlots.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
})




export default trainerSlice.reducer;