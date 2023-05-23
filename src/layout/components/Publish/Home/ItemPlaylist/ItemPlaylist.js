import { Box, Checkbox, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { DotsThreeOutline, Heart, Play } from 'phosphor-react';
import PropTypes from 'prop-types';
import { useState } from 'react';

function ItemPlaylist({ size = 'large', data, type = 'playlist' }) {
    const theme = useTheme();
    const [isHovering, setIsHovering] = useState(false);
    let width, height;
    if (size === 'large') {
        width = 300;
        height = 300;
    } else if (size === 'medium') {
        width = 200;
        height = 200;
    } else {
        width = 120;
        height = 120;
    }

    if (type === 'playlist') {
    } else if (type === 'single') {
    } else {
    }

    const TypeDescription = () => {
        if (type === 'playlist') {
            return (
                <Stack direction="row" width={width} padding="10px" alignItems="center" overflow="hidden">
                    <Typography
                        width="100%"
                        variant="body1"
                        fontSize={width / 10}
                        color={theme.palette.common.white}
                        textAlign="center"
                        textOverflow="ellipsis"
                        noWrap
                    >
                        2000s Pop Rock
                    </Typography>
                </Stack>
            );
        } else if (type === 'single') {
            return (
                <Stack direction="column" width={width} padding="10px" alignItems="center" overflow="hidden">
                    <Typography
                        width="100%"
                        variant="body1"
                        fontSize={width / 10}
                        color={theme.palette.common.white}
                        textOverflow="ellipsis"
                        noWrap
                    >
                        2000s Pop Rock
                    </Typography>
                    <Stack direction="row" width="100%">
                        <Typography variant="body2" fontSize="0.8rem" color={theme.palette.grey[500]}>
                            Backstreet Boys
                        </Typography>
                    </Stack>
                </Stack>
            );
        } else if (type === 'type') {
            return (
                <Stack direction="column" width={width} padding="10px" overflow="hidden">
                    <Stack direction="row" width="100%">
                        <Typography variant="body2" fontSize="0.8rem" color={theme.palette.grey[500]}>
                            Cứ vui lên vì những âu lo rồi cũng sẽ qua
                        </Typography>
                    </Stack>
                    <Typography
                        width="100%"
                        variant="body2"
                        fontSize="0.8rem"
                        color={theme.palette.grey[500]}
                        textOverflow="ellipsis"
                        noWrap
                    >
                        Cứ vui lên vì
                    </Typography>
                </Stack>
            );
        } else {
            return (
                <Stack direction="column" width={width} padding="10px" overflow="hidden">
                    <Typography
                        variant="body2"
                        fontSize="0.8rem"
                        color={theme.palette.grey[500]}
                        width="100%"
                        textOverflow="ellipsis"
                        noWrap
                    >
                        Cứ vui lên vì những âu lo rồi cũng sẽ qua
                    </Typography>
                </Stack>
            );
        }
    };
    return (
        <Stack direction={'column'}>
            <Box
                sx={{ position: 'relative', width: width, height: height, overflow: 'hidden', borderRadius: '10px' }}
                onMouseOver={() => setIsHovering(true)}
                onMouseOut={() => setIsHovering(false)}
            >
                <img
                    src="https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/e/9/e/b/e9eb32fbef1e5fb1c653ab6ff5a4dc64.jpg"
                    alt="photoUser"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'fill',
                        transform: isHovering ? 'scale(1.1)' : '',
                        transition: '0.3s all linear',
                    }}
                />
                {isHovering && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: '100%',
                            width: '100%',
                            zIndex: 10,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(23,15,35, 0.5)',
                        }}
                    >
                        <Stack direction={'row'} justifyContent="center" alignItems="center" gap="5px">
                            <Checkbox
                                icon={<Heart size={20} color={theme.palette.common.white} />}
                                checkedIcon={<Heart size={20} weight="fill" color="#9b4de0" />}
                            // sx={{ color: '#9b4de0' }}
                            />
                            <IconButton
                                sx={{
                                    border: '1px solid',
                                    borderColor: theme.palette.grey[500],
                                }}
                            >
                                <Play size={20} weight="fill" color={theme.palette.common.white} />
                            </IconButton>

                            <IconButton>
                                <DotsThreeOutline size={20} weight="fill" color={theme.palette.common.white} />
                            </IconButton>
                        </Stack>
                    </Box>
                )}
            </Box>
            <TypeDescription />
        </Stack>
    );
}

export default ItemPlaylist;

ItemPlaylist.prototype = {
    width: PropTypes.number,
    height: PropTypes.number,
    data: PropTypes.object,
};
