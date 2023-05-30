import { Box, Checkbox, IconButton, Stack, Tooltip, Typography, alpha, useTheme } from '@mui/material';
import { DotsThree, DotsThreeOutline, Heart } from 'phosphor-react';
import { useState } from 'react';
import ImageMusic from '~/components/ImageMusic/ImageMusic';

const color = ['#4a90e2', '#50e3c2', '#f8e71c', '#e35050'];
function ItemListMusic({ data, index = 0 }) {
    const theme = useTheme();
    const [isHover, setIsHover] = useState(false);

    return (
        <Box
            height={60}
            width={'100%'}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            overflow={'hidden'}
            borderRadius={1}
            sx={{
                '&:hover': {
                    backgroundColor: alpha(theme.palette.grey[500], theme.palette.action.selectedOpacity),
                    overflow: 'hidden',
                },
                borderBottom: '1px solid',
                borderColor: alpha(theme.palette.grey[500], theme.palette.action.selectedOpacity),
            }}
        >
            <Stack
                direction={'row'}
                width={'100%'}
                height={'100%'}
                // justifyContent={'space-between'}
                alignItems={'center'}
                overflow={'hidden'}
            >
                <Stack
                    direction={'row'}
                    gap={'10px'}
                    sx={{
                        display: 'flex',
                        width: '50%',
                        flexBasis: 'auto',
                        flexGrow: 0,
                        flexShrink: 0,
                        paddingLeft: '20px',
                    }}
                >
                    <Stack direction={'row'} gap={'5px'} alignItems={'center'} marginRight={'15px'}>
                        <span
                            style={{
                                WebkitTextStroke: '1px',
                                WebkitTextStrokeColor: index > 3 ? theme.palette.common.white : color[index],
                                minWidth: '40px',
                                fontSize: '32px',
                                fontWeight: 900,
                            }}
                        >
                            {index + 1}
                        </span>
                        <DotsThreeOutline size={20} weight="fill" color={theme.palette.grey[600]} />
                    </Stack>
                    <ImageMusic data={data?.thumbnail} isHover={isHover} />
                    <Stack direction={'column'} width={'50%'} overflow={'hidden'}>
                        <Typography
                            variant="h5"
                            fontSize="1rem"
                            color={theme.palette.common.white}
                            overflow={'hidden'}
                            textOverflow={'ellipsis'}
                            noWrap
                        >
                            {data?.name}
                        </Typography>
                        <Stack direction={'row'} alignItems={'center'}>
                            <Typography
                                variant="body2"
                                color={theme.palette.grey[500]}
                                textOverflow={'ellipsis'}
                                noWrap
                            >
                                {data?.singer?.map((i, index) =>
                                    index === data?.singer?.length - 1 ? `${i}` : `${i},`,
                                )}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack
                    direction={'row'}
                    gap={'10px'}
                    sx={{
                        flexBasis: 'auto',
                        flexGrow: 1,
                        flexShrink: 1,
                        alignSelf: 'center',
                        width: 0,
                    }}
                >
                    <Typography variant="body2" color={theme.palette.grey[500]}>
                        {`${data?.singer?.map((i, index) =>
                            index === data?.singer?.length - 1 ? `${i}` : `${i},`,
                        )} (Single)`}
                    </Typography>
                </Stack>
                <Stack
                    direction={'row'}
                    gap={'10px'}
                    sx={{
                        flexBasis: 'auto',
                        flexGrow: 0,
                        flexShrink: 0,
                    }}
                >
                    {isHover ? (
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-end'}>
                            <Tooltip title="Thêm vào thư viện">
                                <Checkbox
                                    sx={{ marginRight: '10px' }}
                                    icon={<Heart size={15} color={theme.palette.common.white} />}
                                    checkedIcon={<Heart size={15} weight="fill" color="#9b4de0" />}
                                    // sx={{ color: '#9b4de0' }}
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
                                    <DotsThree size={20} weight="bold" color={theme.palette.common.white} />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    ) : (
                        ''
                    )}
                </Stack>
            </Stack>
        </Box>
    );
}

export default ItemListMusic;
