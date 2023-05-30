import { Box, Checkbox, IconButton, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import { DotsThree, Heart, Play } from 'phosphor-react';
import { useState } from 'react';

import PropTypes from 'prop-types';
import { MoreButtonMusic } from '~/components/MoreButtonMusic/MoreButtonMusic';
import images from '~/asset/images';
import { hover } from '@testing-library/user-event/dist/hover';

ItemMusic.prototype = {
    data: PropTypes.object,
    type: PropTypes.string,
};
function ItemMusic({ music, type = 'medium', data }) {
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
                        src={data?.thumbnail ? data?.thumbnail : images.noImageMusic}
                        alt="music"
                    />
                </Box>
                <Stack direction="column" marginLeft="10px">
                    <Typography variant="h6" color={theme.palette.common.white} fontSize="1rem">
                        {music?.data?.name?.length > 25 ? music?.data?.name?.slice(0, 25) : music?.data?.name}
                    </Typography>
                    <Typography variant="body1" color={theme.palette.grey[400]} fontSize="0.75rem">
                        {music?.data?.description > 25
                            ? music?.data?.description?.slice(0, 25)
                            : music?.data?.description}
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
                                    icon={<Heart size={18} weight="fill" color="#9b4de0" />}
                                    // checkedIcon={<Heart size={18} weight="fill" color={theme.palette.common.white} />}
                                />
                            </Tooltip>
                            <MoreButtonMusic music={music} />
                        </Stack>
                    </Stack>
                )}
            </Stack>
        </Box>
    );
}

export default ItemMusic;
