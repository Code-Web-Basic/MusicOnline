import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import ListMusic from '~/layout/components/Publish/ListMusic/ListMusic';
// export const addOneMusic =  createAsyncThunk('')
export const getMusicPlaylist = createAsyncThunk('users/update', async (playlistData, { rejectWithValue }) => {
    const { id, ...fields } = playlistData;
    try {
        const response = null;
        return response;
    } catch (err) {
        // Use `err.response.data` as `action.payload` for a `rejected` action,
        // by explicitly returning it using the `rejectWithValue()` utility
        return rejectWithValue(err.response.data);
    }
});
const playlistCurrentSlice = createSlice({
    name: 'playlistCurrent',
    initialState: {
        ListMusic: [],
        currentIndex: 0,
        musicCurrent: null,
        error: '',
        isError: false,
        loading: false,
    },
    reducers: {
        clearListPlay: (state, action) => {
            state.ListMusic = [];
            state.currentIndex = 0;
        },
        addPlaylist: (state, action) => {
            if (state.ListMusic.length + action.payload?.length < 40) {
                const newIndex = state.ListMusic.length;
                state.ListMusic = [...state.ListMusic, ...action.payload];
                state.currentIndex = newIndex;
            } else {
                const numberSlice = 40 - state.ListMusic.length;
                console.log(Math.abs(action.payload?.length - numberSlice));
                // const newMusic = state.ListMusic.slice(0, Math.abs(action.payload?.length - numberSlice));
                // console.log(newMusic, numberSlice);
                state.ListMusic = [...state.ListMusic.slice(0, Math.abs(action.payload?.length)), ...action.payload];
                const newIndex = state.ListMusic.length - action.payload?.length;
                state.currentIndex = newIndex;
            }
        },
        addOneMusic: (state, action) => {
            if (state.ListMusic.length + 1 < 30) {
                state.ListMusic = [...state.ListMusic, action.payload];
                const newIndex = state.ListMusic.length - 1;
                state.currentIndex = newIndex;
            } else {
                const newIndex = state.ListMusic.length - 1;
                state.ListMusic = [...state.ListMusic, ...action.payload].slice(0, 1);
                state.currentIndex = newIndex;
            }
        },
        nextMusic: (state, action) => {
            if (state.currentIndex < state.ListMusic.length - 1) {
                state.currentIndex++;
            } else {
                state.currentIndex = 0;
            }
        },
        prevMusic: (state, action) => {
            if (state.currentIndex !== 0) {
                state.currentIndex--;
            } else {
                state.currentIndex = state.ListMusic.length - 1;
            }
        },
        clickCurrent: (state, action) => {
            state.currentIndex = action.payload;
        },
        playRadomMusic: (state, action) => {
            let newIndex;
            do {
                newIndex = Math.floor(Math.random() * state.ListMusic.length);
            } while (newIndex === state.currentIndex);

            state.currentIndex = newIndex;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getMusicPlaylist.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getMusicPlaylist.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isError = true;
        });
        builder.addCase(getMusicPlaylist.fulfilled, (state, action) => {
            state.loading = false;
            state.error = '';
            state.isError = true;
            state.ListMusic = [...action.payload];
        });
        // builder.addCase(fetchUserById.fulfilled, (state, action) => {});
    },
});
export const { addOneMusic, nextMusic, prevMusic, addPlaylist, clickCurrent, playRadomMusic, clearListPlay } =
    playlistCurrentSlice.actions;
export default playlistCurrentSlice.reducer;
