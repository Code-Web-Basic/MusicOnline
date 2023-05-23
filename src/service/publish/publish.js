import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, deleteDoc, doc, getDoc, getDocs, limit, query, setDoc } from "firebase/firestore";
import { db } from "~/connectFirebase/config";

const createRandom = () => {
    var randomstring = '';
    var characters = 'QWERTYUIOPASDFGHJKLZXCVBNM123456789qwertyuiopasdfghjklzxcvbnm';
    for (var i, i = 0; i < 28; i++) {
        randomstring += characters.charAt(Math.floor(Math.random() * 28));
    }
    return randomstring;
};

export const getAllMyPlayList = createAsyncThunk('playlist/getAllMyPlayList', async (params, thunkAPI) => {
    let data = []
    const q = query(collection(db, 'myplaylist'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        data.push({
            data: doc.data(),
            id: doc.id
        });
    });
    return data;
});

export const setNewMyPlayList = createAsyncThunk('playlist/setNewMyPlayList', async (params, thunkAPI) => {
    const id = createRandom()
    const data = {
        name: params.name,
        type: params.type
    }
    await setDoc(doc(db, "myplaylist", id), data);

    return { data: data, id: id }
});

export const deleteMyPlayList = createAsyncThunk('playlist/deleteMyPlayList', async (params, thunkAPI) => {
    await deleteDoc(doc(db, 'myplaylist', params));

    return params
});

export const MyPlayListSlice = createSlice({
    name: 'my-playlist',
    initialState: {
        loading: false,
        error: '',
        data: [],
    },
    extraReducers: (builder) => {
        builder.addCase(getAllMyPlayList.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getAllMyPlayList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(getAllMyPlayList.fulfilled, (state, action) => {
            state.loading = false;
            state.error = '';
            state.data = action.payload;
        });
        builder.addCase(setNewMyPlayList.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(setNewMyPlayList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(setNewMyPlayList.fulfilled, (state, action) => {
            state.loading = false;
            state.error = '';
            state.data.push(action.payload);
        });
        builder.addCase(deleteMyPlayList.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(deleteMyPlayList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(deleteMyPlayList.fulfilled, (state, action) => {
            state.loading = false;
            state.error = '';
            state.data = state.data.filter((data) => data.id !== action.payload);
        });
    },
});

export default MyPlayListSlice.reducer;