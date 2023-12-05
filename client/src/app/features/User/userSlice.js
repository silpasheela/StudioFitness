import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../../api/axiosInstance";

const initialState = {

    loading: false,
    success: false,
    user: {},
    error: ''
}



//USER PROFILE UPDATION

export const updateUserProfile = createAsyncThunk('user/updateUserProfile', async(userData, {rejectWithValue}) => {
    try {
        const response = await instance.put(`user/editprofile/${userData._id}`,userData, { withCredentials: true });

        if (response.status === 200) {
            return response.data.user;
        } else {
        return rejectWithValue('Failed to update user profile');
        }
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})



//USER VIEW ALL TRAINERS

export const userViewAllTrainers = createAsyncThunk('user/userViewAllTrainers', async (_, { rejectWithValue }) => {
    try {
        const response = await instance.get(`user/view-trainers`, { withCredentials: true });
        
        if (response.status === 200) {
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


//GET SPECIFIC TRAINER BY USER

export const userGetTrainer = createAsyncThunk('user/userGetTrainer', async(id, {rejectWithValue}) => {
    try {
        const response = await instance.get(`user/trainer/${id}`, { withCredentials: true });

        if(response.status === 200) {
            return response.data;
        } else {
            return rejectWithValue('Failed to fetch trainer data');
        }
    } catch (error) {
        return rejectWithValue('Network error');
    }
})


//GET SUBSCRIPTION DETAILS BY USER

export const userGetSubscriptionDetails = createAsyncThunk('user/userGetSubscriptionDetails', async(id, {rejectWithValue}) => {
    try {
        const response = await instance.get(`user/subscription/${id}`, { withCredentials: true });

        if(response.status === 200) {
            return response.data;
        } else {
            return rejectWithValue('Failed to fetch Subscription data');
        }
    } catch (error) {
        return rejectWithValue('Network error');
    }
})



//GET TRAINER SLOT DETAILS BY USER

export const userGetAvailableSlots = createAsyncThunk('user/userGetAvailableSlots', async(trainerId, {rejectWithValue}) => {
    try {
        const response = await instance.get(`user/view-slots/${trainerId}`, { withCredentials: true });

        if(response.status === 200) {
            return response.data;
        } else {
            return rejectWithValue('Failed to fetch slot data');
        }
    } catch (error) {
        return rejectWithValue('Network error');
    }
})



const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
        .addCase(updateUserProfile.pending, (state) => {
                state.loading = true;
                state.error = '';
        })
        .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.error = '';
        })
        .addCase(updateUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
        })


        .addCase(userViewAllTrainers.pending, (state) => {
            state.loading = true;
        })
        .addCase(userViewAllTrainers.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
        .addCase(userViewAllTrainers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })

        .addCase(userGetTrainer.pending, (state) => {
            state.loading = true;
        })
        .addCase(userGetTrainer.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
        .addCase(userGetTrainer.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })

        .addCase(userGetSubscriptionDetails.pending, (state) => {
            state.loading = true;
        })
        .addCase(userGetSubscriptionDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
        .addCase(userGetSubscriptionDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })

        .addCase(userGetAvailableSlots.pending, (state) => {
            state.loading = true;
        })
        .addCase(userGetAvailableSlots.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
        .addCase(userGetAvailableSlots.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
})






export default userSlice.reducer