import { Box, Checkbox, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { DotsThreeOutline, Heart, Play } from 'phosphor-react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import images from '~/asset/images';
import router from '~/config/Router';

function ItemPlaylist({ size = 'large', data, type = 'playlist' }) {
    const theme = useTheme();
    const [isHovering, setIsHovering] = useState(false);
    let width, height;
    if (size === 'large') {
        width = 240;
        height = 240;
    } else if (size === 'medium') {
        width = 200;
        height = 200;
    } else {
        width = 120;
        height = 120;
    }

    const TypeDescription = () => {
        if (type === 'playlist') {
            return (
                <Stack direction="row" width={width} paddingTop="10px" alignItems="center" overflow="hidden">
                    <Typography
                        width="100%"
                        variant="body1"
                        fontSize={width / 12}
                        color={theme.palette.common.white}
                        textAlign="center"
                        textOverflow="ellipsis"
                        noWrap
                    >
                        {data?.name}
                    </Typography>
                </Stack>
            );
        } else if (type === 'single') {
            return (
                <Stack direction="column" width={width} paddingTop="10px" alignItems="center" overflow="hidden">
                    <Typography
                        width="100%"
                        variant="body1"
                        fontSize={width / 12}
                        color={theme.palette.common.white}
                        textOverflow="ellipsis"
                        noWrap
                    >
                        {data?.name}
                    </Typography>
                    <Stack direction="row" width="100%">
                        <Typography variant="body2" fontSize="0.8rem" color={theme.palette.grey[500]}>
                            {data?.description}
                        </Typography>
                    </Stack>
                </Stack>
            );
        } else if (type === 'type') {
            return (
                <Stack direction="column" width={width} paddingTop="10px" overflow="hidden">
                    <Stack direction="row" width="100%">
                        <Typography variant="body2" fontSize="0.8rem" color={theme.palette.grey[500]}>
                            {data?.name}
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
                        {data?.description}
                    </Typography>
                </Stack>
            );
        } else {
            return (
                <Stack direction="column" width={width} paddingTop="10px" overflow="hidden">
                    <Typography
                        variant="body2"
                        fontSize="0.8rem"
                        color={theme.palette.grey[500]}
                        width="100%"
                        textOverflow="ellipsis"
                        noWrap
                    >
                        {data?.description}
                    </Typography>
                </Stack>
            );
        }
    };
    return (
        <Stack
            direction={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            component={Link}
            to={router.DetailPlaylist.slice(0, -3) + `${data.id}`}
        >
            <Box
                sx={{ position: 'relative', width: width, height: height, overflow: 'hidden', borderRadius: '10px' }}
                onMouseOver={() => setIsHovering(true)}
                onMouseOut={() => setIsHovering(false)}
            >
                <img
                    src={data?.thumbnail ? data?.thumbnail : images.playlistImageDefault}
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
