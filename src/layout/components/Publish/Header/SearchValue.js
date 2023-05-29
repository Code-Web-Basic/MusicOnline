import { Divider, Stack, Typography, alpha, useTheme } from '@mui/material';
import { MagnifyingGlass } from 'phosphor-react';
import ItemMusic from '../ItemMusic/ItemMusic';

function SearchValue({ dataMusic = [], dataKeyword = [], loading }) {
    const theme = useTheme();
    return (
        <Stack
            direction={'column'}
            width={'100%'}
            height={'100%'}
            padding={'0px 8px 16px 8px'}
            gap={'6px'}
            overflow={'auto'}
        >
            {/* <Divider textAlign="left"></Divider> */}
            {/* <Stack direction={'row'}>
                <Typography variant="h6" color={theme.palette.common.white}>
                    Từ khóa liên quan
                </Typography>
            </Stack>
            {dataKeyword?.length > 0 ? (
                dataKeyword?.map((i) => (
                    <Stack
                        key={i}
                        direction={'row'}
                        padding={1}
                        sx={{
                            borderRadius: 1,
                            '&:hover': {
                                backgroundColor: alpha(theme.palette.grey[200], 0.1),
                            },
                        }}
                        gap={'5px'}
                        alignItems={'center'}
                    >
                        <MagnifyingGlass size={20} color={theme.palette.common.white} />
                        <Typography
                            variant="body2"
                            sx={{
                                color: theme.palette.common.white,
                                '&:hover': {
                                    color: '#c273ed',
                                },
                            }}
                        >
                            i
                        </Typography>
                    </Stack>
                ))
            ) : (
                <Typography variant="body2" width={'100%'} color={theme.palette.common.white} textAlign={'center'}>
                    Không có kết quả
                </Typography>
            )}
            <Divider textAlign="left">
                <Typography variant="h6" color={theme.palette.common.white}>
                    Gợi ý kết quả
                </Typography>
            </Divider> */}
            {dataMusic?.length > 0 ? (
                dataMusic?.map((i) => <ItemMusic key={i.id} data={i} type="small" />)
            ) : (
                <Typography variant="body2" width={'100%'} color={theme.palette.common.white} textAlign={'center'}>
                    Không có kết quả
                </Typography>
            )}
        </Stack>
    );
}

export default SearchValue;
