import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axios } from "../lib";

export const fetchUser: any = createAsyncThunk("user/fetch", async (signal: AbortSignal) => {
    let res = await axios.get('/user/me', {
        signal
    })

    return res?.['data']?.data
})

const user = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        setEmpty: () => {
            return null
        }
    },
    extraReducers: (callback) => {
        callback.addCase(fetchUser.fulfilled, (state, { payload }) => {
            state = payload

            return state
        });

        callback.addCase(fetchUser.rejected, (state, { error }) => {
            if (error?.code === "ERR_CANCELED") {
                console.log("Cancelled");
            } else {
                state = null
                return state;
            }
        });
    }
})

export const { setEmpty } = user?.actions

export default user.reducer