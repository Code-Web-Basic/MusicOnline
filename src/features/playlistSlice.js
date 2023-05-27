import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteMyPlayList, getAllMyPlayList, setNewMyPlayList } from "~/service/publish/playlistService";

export const getMyPlayLists = createAsyncThunk('playlist/getAllMyPlayList', async (params, thunkAPI) => {
    const data = getAllMyPlayList(params)
    return data;
});

export const createNewMyPlayList = createAsyncThunk('playlist/setNewMyPlayList', async (params, thunkAPI) => {
    const data = setNewMyPlayList(params)
    return data
});

export const deletedMyPlayList = createAsyncThunk('playlist/deleteMyPlayList', async (params, thunkAPI) => {
    deleteMyPlayList(params)
    return params
});

export const myPlayListSlice = createSlice({
    name: 'my-playlist',
    initialState: {
        loading: false,
        error: '',
        data: [],
    },
    reducers: {
        clearMyPlayList: (state, action) => {
            state.data = [];
            state.loading = false;
            state.error = '';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getMyPlayLists.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getMyPlayLists.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(getMyPlayLists.fulfilled, (state, action) => {
            state.loading = false;
            state.error = '';
            state.data = action.payload;
        });
        builder.addCase(createNewMyPlayList.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(createNewMyPlayList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(createNewMyPlayList.fulfilled, (state, action) => {
            state.loading = false;
            state.error = '';
            state.data.push(action.payload);
        });
        builder.addCase(deletedMyPlayList.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(deletedMyPlayList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(deletedMyPlayList.fulfilled, (state, action) => {
            state.loading = false;
            state.error = '';
            state.data = state.data.filter((data) => data.id !== action.payload);
        });
    },
});

export const { clearMyPlayList } = myPlayListSlice.actions;
export default myPlayListSlice.reducer;