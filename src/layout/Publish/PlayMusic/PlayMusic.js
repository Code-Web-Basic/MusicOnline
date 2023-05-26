import { Box, Grid, Stack } from '@mui/material';

import { useEffect, useRef } from 'react';
import { useState } from 'react';
import ShowCurrentMusic from './ShowCurrentMusic';
import ControlExtendMusic from './ControlExtendMusic';
import ControlMusic from './ControlMusic';

function PlayMusic() {
    const audioRef = useRef(
        new Audio(
            'https://firebasestorage.googleapis.com/v0/b/musiconline-b4222.appspot.com/o/audios%2FNauAnChoEm-Den-9466587.mp3?alt=media&token=e68be726-9afb-45a4-a961-46d35c4e09f8',
        ),
    );

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 0,
                width: '100%',
                zIndex: 1000,
                height: '90px',
                backgroundColor: '#130c1c',
                display: 'flex',
                alignItems: 'center',
                padding: '0px 20px',
                justifyContent: 'space-between',
            }}
        >
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} width={'100%'}>
                <Grid container width={'100%'}>
                    <Grid item xs={12 / 3} display={'flex'} justifyContent={'flex-start'}>
                        <ShowCurrentMusic />
                    </Grid>
                    <Grid item xs={12 / 3} display={'flex'} justifyContent={'center'}>
                        <ControlMusic audioRef={audioRef} />
                    </Grid>
                    <Grid item xs={12 / 3} display={'flex'} justifyContent={'flex-end'}>
                        <ControlExtendMusic audioRef={audioRef} />
                    </Grid>
                </Grid>
            </Stack>
            {/* <Box sx={{ width: '33%', display: 'flex', flexDirection: 'column' }}>
                <Stack direction="row" spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Tooltip title="Phát bài ngẫu nhiên">
                        <IconButton aria-label="random">
                            <Shuffle size={28} color="white" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Phát bài nhạc trước">
                        <IconButton aria-label="previous">
                            <SkipBack size={28} weight="fill" color="white" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip>
                        <IconButton aria-label="play">
                            <PlayCircle size={28} color="white" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip>
                        <IconButton aria-label="pause">
                            <PauseCircle size={28} color="white" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Phát bài nhạc tiếp theo">
                        <IconButton aria-label="next">
                            <SkipForward size={28} weight="fill" color="white" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Lặp lại">
                        <IconButton aria-label="next">
                            <Repeat size={28} color="white" />
                        </IconButton>
                    </Tooltip>
                </Stack>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography color="white">00:00</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box
                            sx={{
                                height: '5px',
                                width: '100px',
                                backgroundColor: '#ccc',
                                position: 'relative',
                                margin: '0 10px',
                            }}
                        >
                            <Box
                                sx={{
                                    height: '5px',
                                    backgroundColor: '#ff5a5f',
                                    position: 'absolute',
                                    top: '0',
                                    left: '0',
                                    width: `${progress}%`,
                                }}
                            ></Box>
                        </Box>
                    </Box>
                    <Typography color="white">00:00</Typography>
                </Box>
            </Box> */}
        </Box>
    );
}

export default PlayMusic;
