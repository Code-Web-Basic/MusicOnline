import { Box, Checkbox, IconButton, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import { DotsThree, Heart, Play } from 'phosphor-react';
import { useState } from 'react';

function ItemMusicPlay({ active = false }) {
    const theme = useTheme();
    const [isHovering, setIsHovering] = useState(false);
    return (
        <Box
            sx={{
                width: '100%',
                padding: '5px',
                borderRadius: 1,
                background: active ? theme.palette.secondary.main : '',
                '&:hover': {
                    background: active ? theme.palette.secondary.main : ' hsla(0,0%,100%,0.1)',
                },
            }}
            background={active ? theme.palette.secondary.main : 'none'}
            onMouseOver={() => setIsHovering(true)}
            onMouseOut={() => setIsHovering(false)}
        >
            <Stack direction="row" alignItems="center" position={'relative'}>
                <Box
                    sx={{
                        borderRadius: '5px',
                        height: 35,
                        width: 35,
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {(isHovering || active) && (
                        <IconButton
                            sx={{
                                position: 'absolute',
                            }}
                        >
                            <Play size={15} weight="fill" color={theme.palette.common.white} />
                        </IconButton>
                    )}
                    <img
                        style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                        src="https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_webp/cover/d/a/4/f/da4f928118a87298376b2109c2733629.jpg"
                        alt="music"
                    />
                </Box>
                <Stack direction="column" marginLeft="10px" width={'150px'} overflow={'hidden'}>
                    <Typography
                        variant="body2"
                        color={theme.palette.common.white}
                        fontSize="0.8rem"
                        width={'100%'}
                        textOverflow={'ellipsis'}
                    >
                        Ghosting
                    </Typography>
                    <Typography variant="inherit" color={theme.palette.grey[400]} fontSize="0.7rem">
                        Linh Ka, Kewtiie
                    </Typography>
                </Stack>
                {isHovering && (
                    <Stack direction={'row'} position={'absolute'} right={0}>
                        <Stack direction={'row'} gap={1}>
                            <Tooltip title="Yêu thích">
                                <Checkbox
                                    icon={<Heart size={18} color={theme.palette.common.white} />}
                                    checkedIcon={<Heart size={18} weight="fill" color="#9b4de0" />}
                                />
                            </Tooltip>

                            <Tooltip title="khác">
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
                        </Stack>
                    </Stack>
                )}
            </Stack>
        </Box>
    );
}

export default ItemMusicPlay;
