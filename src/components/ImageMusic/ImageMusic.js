import { Box, useTheme } from '@mui/material';
import { Play } from 'phosphor-react';
import { useState } from 'react';

function ImageMusic({ isHover = false }) {
    const theme = useTheme();
    // const [isHover, setisHover] = useState(false);
    return (
        <Box sx={{ height: 40, width: 40, overflow: 'hidden', borderRadius: 1, position: 'relative' }}>
            <img
                style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                src={
                    'https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_webp/covers/f/a/facbb6acec54dacd342c04b533f56b9d_1396931968.jpg'
                }
                alt="music"
            />
            {isHover && (
                <Box
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        top: 0,
                        left: 0,
                    }}
                >
                    <Play size={15} color={theme.palette.common.white} weight="fill" />
                </Box>
            )}
        </Box>
    );
}

export default ImageMusic;
