import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { instance, uninterceptedApiInstance } from "../../../api/axiosInstance";
import { baseURL } from "../../../constants/endpoints";


const initialState = {

    loading: false,
    success: false,
    data: [],
    error: ''
}


//COMMON SLICE FOR FETCHING AND DISPLAYING TRAINER DATA

export const viewAllTrainers = createAsyncThunk('data/viewAllTrainers', async (_, { rejectWithValue }) => {
    try {
        const response = await uninterceptedApiInstance.get(`user/view-trainers`, { withCredentials: true });
        
        if (response.status === 200) {
            console.log(response.data)
            return response.data;
        } else {
        // If the response is not successful, handle it here
            return rejectWithValue('Failed to fetch user data');
        }
    } catch (error) {
      // Handle any network or request error here
        return rejectWithValue('Network error');
    }
});


//COMMON SLICE FOR FETCHING AND DISPLAYING SERVICES DATA


export const viewAllServices = createAsyncThunk('data/viewAllServices', async (_, { rejectWithValue }) => {
    try {
        const response = await instance.get(`trainer/all-services`, { withCredentials: true });
        
        if (response.status === 200) {
            console.log(response.data)
            return response.data;
        } else {
        // If the response is not successful, handle it here
            return rejectWithValue('Failed to fetch user data');
        }
    } catch (error) {
      // Handle any network or request error here
        return rejectWithValue('Network error');
    }
});



const dataSlice = createSlice({
    name:'data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(viewAllTrainers.pending, (state) => {
                state.loading = true;
            })
            .addCase(viewAllTrainers.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(viewAllTrainers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(viewAllServices.pending, (state) => {
                state.loading = true;
            })
            .addCase(viewAllServices.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(viewAllServices.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
})




export default dataSlice.reducer
