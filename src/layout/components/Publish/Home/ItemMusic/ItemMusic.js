import { Box, IconButton, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import { DotsThree, Play } from 'phosphor-react';
import { useState } from 'react';

function ItemMusic() {
    const theme = useTheme();
    const [isHovering, setIsHovering] = useState(false);

    return (
        <Box
            sx={{
                padding: '10px',
                borderRadius: 1,
                '&:hover': {
                    background: 'hsla(0,0%,100%,0.1)',
                },
            }}
            onMouseOver={() => setIsHovering(true)}
            onMouseOut={() => setIsHovering(false)}
        >
            <Stack direction="row" alignItems="center" position={'relative'}>
                <Box
                    sx={{
                        borderRadius: '5px',
                        height: 60,
                        width: 60,
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {isHovering && (
                        <IconButton
                            sx={{
                                position: 'absolute',
                            }}
                        >
                            <Play size={20} weight="fill" color={theme.palette.common.white} />
                        </IconButton>
                    )}
                    <img
                        style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                        src="https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_webp/cover/d/a/4/f/da4f928118a87298376b2109c2733629.jpg"
                        alt="music"
                    />
                </Box>
                <Stack direction="column" marginLeft="10px">
                    <Typography variant="h6" color={theme.palette.common.white} fontSize="1rem">
                        Ghosting
                    </Typography>
                    <Typography variant="body1" color={theme.palette.grey[400]} fontSize="0.75rem">
                        Linh Ka, Kewtiie
                    </Typography>
                    <Typography variant="subtitle2" color={theme.palette.grey[400]} fontSize="0.75rem">
                        Hôm qua
                    </Typography>
                </Stack>
                {isHovering && (
                    <Tooltip title="khác">
                        <IconButton
                            sx={{
                                position: 'absolute',
                                right: 10,
                                '&:hover': {
                                    background: theme.palette.grey[800],
                                },
                            }}
                        >
                            <DotsThree size={20} weight="bold" color={theme.palette.common.white} />
                        </IconButton>
                    </Tooltip>
                )}
            </Stack>
        </Box>
    );
}

export default ItemMusic;
