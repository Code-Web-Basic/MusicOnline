import { Box, Checkbox, IconButton, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import { DotsThree, Heart, Play } from 'phosphor-react';
import { useState } from 'react';

import PropTypes from 'prop-types';
import { MoreButtonMusic } from '~/components/MoreButtonMusic/MoreButtonMusic';

ItemMusic.prototype = {
    data: PropTypes.object,
    type: PropTypes.string,
};
function ItemMusic({ data, type = 'medium' }) {
    const theme = useTheme();
    const [isHovering, setIsHovering] = useState(false);

    return (
        <Box
            sx={{
                width: '100%',
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
                        height: type === 'medium' ? 60 : 40,
                        width: type === 'medium' ? 60 : 40,
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
                    {type === 'medium' && (
                        <Typography variant="subtitle2" color={theme.palette.grey[400]} fontSize="0.75rem">
                            Hôm qua
                        </Typography>
                    )}
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

                            <MoreButtonMusic />
                        </Stack>
                    </Stack>
                )}
            </Stack>
        </Box>
    );
}

export default ItemMusic;
