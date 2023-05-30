import { Box, Stack, Typography, useTheme } from '@mui/material';
import ItemMusicPlay from './ItemMusicPlay';
import { useSelector } from 'react-redux';

function PlaylistPlay() {
    const theme = useTheme();
    const playlistPlayOpen = useSelector((state) => state.layout.playlistPlayOpen);
    const currentPlaylist = useSelector((state) => state.playlistCurrent);
    return (
        <>
            {playlistPlayOpen && (
                <Box
                    sx={{
                        position: 'fixed',
                        top: 0,
                        right: 0,
                        bottom: '90px',
                        height: 'calc(100% - 90px)',
                        width: 300,
                        background: theme.palette.secondary.darker,
                        borderLeft: '1px solid',
                        borderColor: theme.palette.grey[900],
                        boxShadow: theme.shadows[18],
                        zIndex: 1000,
                        p: 1,
                        overflow: 'hidden',
                    }}
                >
                    <Typography variant="h6">Danh sách phát</Typography>
                    <Stack direction={'column'} gap={'4px'} height={'100%'} overflow={'auto'}>
                        {currentPlaylist.ListMusic.map((i, index) => {
                            return (
                                <ItemMusicPlay
                                    data={i}
                                    key={i.id}
                                    active={index === currentPlaylist.currentIndex}
                                    index={index}
                                />
                            );
                        })}
                        {/* <ItemMusicPlay />
                        <ItemMusicPlay />
                        <ItemMusicPlay />
                        <ItemMusicPlay />
                        <ItemMusicPlay />
                        <ItemMusicPlay active={true} />
                        <ItemMusicPlay />
                        <ItemMusicPlay />
                        <ItemMusicPlay />
                        <ItemMusicPlay />
                        <ItemMusicPlay />
                        <ItemMusicPlay />
                        <ItemMusicPlay />
                        <ItemMusicPlay />
                        <ItemMusicPlay />
                        <ItemMusicPlay />
                        <ItemMusicPlay />
                        <ItemMusicPlay />
                        <ItemMusicPlay />
                        <ItemMusicPlay />
                        <ItemMusicPlay /> */}
                    </Stack>
                </Box>
            )}
        </>
    );
}

export default PlaylistPlay;
