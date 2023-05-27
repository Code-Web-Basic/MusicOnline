import { createSlice } from '@reduxjs/toolkit';

export const layoutSlice = createSlice({
    name: 'layout',
    initialState: {
        sidebarOpen: true,
        playlistPlayOpen: false,
        error: '',
    },
    reducers: {
        togglePlaylistPlayOpen: (state, action) => {
            state.playlistPlayOpen = !state.playlistPlayOpen;
        },
    },
});

export const { togglePlaylistPlayOpen } = layoutSlice.actions;
export default layoutSlice.reducer;
