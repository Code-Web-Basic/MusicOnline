import { Box, IconButton, ListItemIcon, MenuItem, Paper, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import ItemMusicPlay from './ItemMusicPlay';
import { useDispatch, useSelector } from 'react-redux';
import Tippy from '@tippyjs/react/headless';
import { DotsThree, XCircle } from 'phosphor-react';
import { clearListPlay } from '~/features/playlistCurrentSlice';

function PlaylistPlay() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const playlistPlayOpen = useSelector((state) => state.layout.playlistPlayOpen);
    const currentPlaylist = useSelector((state) => state.playlistCurrent);
    const handleClearPlaylist = () => {
        dispatch(clearListPlay());
    };
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
                        padding: '10px 10px',
                        paddingBottom: '30px',
                        overflow: 'hidden',
                    }}
                >
                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                        <Typography variant="h6">Danh sách phát</Typography>
                        <Tippy
                            interactive
                            trigger="click"
                            placement="top-end"
                            render={(attrs) => (
                                <div className="box" tabIndex="-1" {...attrs}>
                                    <Paper sx={{ background: '#34224f', padding: '1px', minWidth: 200 }}>
                                        <Stack direction={'column'} overflow={'hidden'}>
                                            <MenuItem
                                                // onClick={handleClose}
                                                sx={{ color: theme.palette.grey[400] }}
                                                onClick={() => handleClearPlaylist()}
                                            >
                                                <ListItemIcon sx={{ color: theme.palette.grey[400] }}>
                                                    <XCircle size={20} />
                                                </ListItemIcon>
                                                Xoá danh sách phát
                                            </MenuItem>
                                        </Stack>
                                    </Paper>
                                </div>
                            )}
                        >
                            <Tooltip title="khac">
                                <IconButton
                                    sx={{
                                        '&:hover': {
                                            background: theme.palette.grey[800],
                                        },
                                    }}
                                >
                                    <DotsThree size={18} weight="bold" color={theme.palette.common.white} />
                                </IconButton>
                            </Tooltip>
                        </Tippy>
                    </Stack>
                    <Stack direction={'column'} gap={'4px'} height={'100%'} overflow={'auto'} paddingTop={'10px'}>
                        {currentPlaylist.ListMusic.map((i, index) => {
                            return (
                                <ItemMusicPlay
                                    data={i}
                                    key={index}
                                    active={index === currentPlaylist.currentIndex}
                                    index={index}
                                />
                            );
                        })}
                    </Stack>
                </Box>
            )}
        </>
    );
}

export default PlaylistPlay;
