import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

export const fetchUsers = createAsyncThunk('fetchUsers', async () => {
    const resp = await axios.get(USERS_URL);
    return resp.data;

})
const initialState = []

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            return action.payload;
        })
    }

})

export const selectAllUsers = (state) => state.users

export default userSlice.reducer