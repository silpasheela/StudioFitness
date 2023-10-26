import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../../api/axiosInstance";
import { baseURL } from "../../../constants/endpoints";

const initialState = {

    loading: false,
    success: false,
    users: [],
    error: ''
}


//ADMIN LOGIN

// export const adminLogin = createAsyncThunk('admin/login', async (_, { rejectWithValue }) => {
//     try {
//         const response = await instance.post(`${baseURL}admin/login`, { withCredentials: true });

//         if (response.status === 200) {
//             console.log(response.data)
//             return response.data;
//         } else {
//             return rejectWithValue('Failed to login');
//         }
//     } catch (error) {
//         return rejectWithValue('Network error');        
//     }
// })


//ADMIN LOGOUT

export const adminLogout = createAsyncThunk('admin/logout', async (_, { rejectWithValue }) => {
    try {
        const response = await instance.get(`${baseURL}admin/logout`, { withCredentials: true });
        
        if (response.status === 200) {
            // console.log(response.data)
            localStorage.removeItem('user')
            return response.data;
        } else {
        // If the response is not successful, handle it here
            return rejectWithValue('Failed to logout');
        }
    } catch (error) {
      // Handle any network or request error here
        return rejectWithValue('Network error');
    }
});


//FETCH USER DATA ON ADMIN DASHBOARD

export const adminGetAllUsers = createAsyncThunk('admin/getAllUsers', async (_, { rejectWithValue }) => {
    try {
        const response = await instance.get(`${baseURL}admin/all-users`, { withCredentials: true });
        
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

//FETCH TRAINER DATA ON ADMIN DASHBOARD

export const adminGetAllTrainers = createAsyncThunk('admin/getAllTrainers', async (_, { rejectWithValue }) => {
    try {
        const response = await instance.get(`${baseURL}admin/all-trainers`, { withCredentials: true });
        
        if (response.status === 200) {
            console.log(response.data)
            return response.data;
        } else {
            return rejectWithValue('Failed to fetch user data');
        }
    } catch (error) {
        return rejectWithValue('Network error');
    }
});

//BLOCK-UNBLOCK USERS BY ADMIN

export const adminBlockUnblockUser = createAsyncThunk('admin/blockUnblockUser', async(id, { rejectWithValue }) => {
    try {
        const response = await instance.put(`${baseURL}admin/block-user/${id}`, { withCredentials: true });
        if (response.status === 200) {
            // console.log("im from adminslice",response.data)
            return response.data;
        } else {
            return rejectWithValue('Failed to fetch user data');
        }
    } catch (error) {
        return rejectWithValue('Network error');
    }
})


//GET SPECIFIC USER BY ADMIN

export const adminGetUser = createAsyncThunk('admin/getUser', async(id, {rejectWithValue}) => {
    try {
        const response = await instance.get(`${baseURL}admin/user/${id}`, { withCredentials: true });

        if(response.status === 200) {
            return response.data;
        } else {
            return rejectWithValue('Failed to fetch user data');
        }
    } catch (error) {
        return rejectWithValue('Network error');
    }
})

//BLOCK-UNBLOCK TRAINERS BY ADMIN

export const adminBlockUnblockTrainer = createAsyncThunk('admin/blockUnblockTrainer', async(id, { rejectWithValue }) => {
    try {
        const response = await instance.put(`${baseURL}admin/block-trainer/${id}`, { withCredentials: true });
        if (response.status === 200) {
            // console.log("im from adminslice",response.data)
            return response.data;
        } else {
            return rejectWithValue('Failed to fetch user data');
        }
    } catch (error) {
        return rejectWithValue('Network error');
    }
})


//GET SPECIFIC TRAINER BY ADMIN

export const adminGetTrainer = createAsyncThunk('admin/getTrainer', async(id, {rejectWithValue}) => {
    try {
        const response = await instance.get(`${baseURL}admin/trainer/${id}`, { withCredentials: true });

        if(response.status === 200) {
            return response.data;
        } else {
            return rejectWithValue('Failed to fetch trainer data');
        }
    } catch (error) {
        return rejectWithValue('Network error');
    }
})


//VERIFY TRAINER BY ADMIN

export const adminVerifyTrainer = createAsyncThunk('admin/verifyTrainer', async(id, {rejectWithValue}) => {
    try {
        const response = await instance.put(`${baseURL}admin/verify-trainer/${id}`, { withCredentials: true });

        if (response.status === 200) {
            return response.data;
        } else {
            return rejectWithValue('Failed to fetch trainer data');
        }
    } catch (error) {
        return rejectWithValue('Network error');
    }
})


//FETCH SERVICES DATA ON ADMIN DASHBOARD

export const adminGetAllServices = createAsyncThunk('admin/getAllServices', async (_, { rejectWithValue }) => {
    try {
        const response = await instance.get(`${baseURL}admin/all-services`, { withCredentials: true });
        console.log(response)

        if (response.status === 200) {
            console.log(response)
            return response.data;
        } else {
        // If the response is not successful, handle it here
            return rejectWithValue('Failed to fetch service data');
        }
    } catch (error) {
      // Handle any network or request error here
        return rejectWithValue('Network error');
    }
});


//DEACTIVATE SERVICES BY ADMIN

export const adminBlockUnblockService = createAsyncThunk('admin/blockUnblockService', async(id, { rejectWithValue }) => {
    try {
        const response = await instance.put(`${baseURL}admin/deactivate-service/${id}`, { withCredentials: true });
        if (response.status === 200) {
            // console.log("im from adminslice",response.data)
            return response.data;
        } else {
            return rejectWithValue('Failed to fetch user data');
        }
    } catch (error) {
        return rejectWithValue('Network error');
    }
})

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(adminGetAllUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(adminGetAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(adminGetAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //correction needed

            .addCase(adminGetAllTrainers.pending, (state) => {
                state.loading = true;
            })
            .addCase(adminGetAllTrainers.fulfilled, (state, action) => {
                state.loading = false;
                state.trainers = action.payload;
            })
            .addCase(adminGetAllTrainers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(adminBlockUnblockUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(adminBlockUnblockUser.fulfilled, (state,action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(adminBlockUnblockUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(adminGetUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(adminGetUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(adminGetUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(adminBlockUnblockTrainer.pending, (state) => {
                state.loading = true;
            })
            .addCase(adminBlockUnblockTrainer.fulfilled, (state,action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(adminBlockUnblockTrainer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(adminGetTrainer.pending, (state) => {
                state.loading = true;
            })
            .addCase(adminGetTrainer.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(adminGetTrainer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(adminVerifyTrainer.pending, (state) => {
                state.loading = true;
            })
            .addCase(adminVerifyTrainer.fulfilled, (state,action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(adminVerifyTrainer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // .addCase(adminLogin.pending, (state) => {
            //     state.loading = true;
            // })
            // .addCase(adminLogin.fulfilled, (state, action) => {
            //     state.loading = false;
            //     state.users = action.payload;
            // })
            // .addCase(adminLogin.rejected, (state, action) => {
            //     state.loading = false;
            //     state.error = action.error.message;
            // })

            .addCase(adminLogout.pending, (state) => {
                state.loading = true;
            })
            .addCase(adminLogout.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.users = action.payload;
                state.error = '';
            })
            .addCase(adminLogout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(adminGetAllServices.pending, (state) => {
                state.loading = true;
            })
            .addCase(adminGetAllServices.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(adminGetAllServices.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(adminBlockUnblockService.pending, (state) => {
                state.loading = true;
            })
            .addCase(adminBlockUnblockService.fulfilled, (state,action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(adminBlockUnblockService.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

    }
})



export default adminSlice.reducer
