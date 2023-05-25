import { Stack, Typography, alpha, useTheme } from '@mui/material';
import { TrendUp } from 'phosphor-react';
import PropTypes from 'prop-types';

SuggestSearch.prototype = {
    data: PropTypes.array,
    loading: PropTypes.bool,
};
function SuggestSearch({ data = [], loading = false }) {
    const theme = useTheme();
    return (
        <Stack direction={'column'} width={'100%'} padding={'0px 8px 16px 8px'} gap={'6px'}>
            <Stack direction={'row'}>
                <Typography variant="h6" color={theme.palette.common.white}>
                    Đề xuất cho bạn
                </Typography>
            </Stack>
            {data.length > 0 ? (
                <Stack
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
                    <TrendUp size={20} color={theme.palette.common.white} />
                    <Typography
                        variant="body2"
                        sx={{
                            color: theme.palette.common.white,
                            '&:hover': {
                                color: '#c273ed',
                            },
                        }}
                    ></Typography>
                </Stack>
            ) : (
                <Typography variant="body2" width={'100%'} color={theme.palette.common.white} textAlign={'center'}>
                    Không có đề xuất
                </Typography>
            )}
        </Stack>
    );
}

export default SuggestSearch;
