import { Box, Checkbox, IconButton, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import { DotsThree, Heart, Play } from 'phosphor-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import images from '~/asset/images';
import { clickCurrent } from '~/features/playlistCurrentSlice';

function ItemMusicPlay({ active = false, data = {}, index }) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [isHovering, setIsHovering] = useState(false);
    const clickMusicPlayCurrent = () => {
        dispatch(clickCurrent(index));
    };
    return (
        <Box
            sx={{
                width: '100%',
                padding: '10px 5px',
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
            <Stack direction="row" alignItems="center" position={'relative'} onClick={() => clickMusicPlayCurrent()}>
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
                        src={data?.thumbnail ? data?.thumbnail : images.noImageMusic}
                        alt="music"
                    />
                </Box>
                <Stack direction="column" marginLeft="10px" width={isHovering ? '50%' : '70%'} overflow={'hidden'}>
                    <Typography
                        variant="body2"
                        color={theme.palette.common.white}
                        fontSize="0.8rem"
                        width={'100%'}
                        textOverflow={'ellipsis'}
                        noWrap
                    >
                        {data?.name}
                    </Typography>
                    <Typography variant="inherit" color={theme.palette.grey[400]} fontSize="0.7rem">
                        {data?.singer?.map((i, index) => (index === data?.singer ? `${i}` : `${i},`))}
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
