import { Box, Container, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material';
import ListMusic from '~/layout/components/Publish/Home/ListMusic/ListMusic';

function Type() {
    const theme = useTheme();
    return (
        <Stack direction={'column'} width={'100%'} padding={'10px 30px'} gap={'10px'}>
            <Box sx={{ width: '100%', padding: '20px 0px' }}>
                <Typography variant="h4" color={theme.palette.common.white} fontSize={'2rem'} fontWeight={700}>
                    BXH Nhạc Mới
                </Typography>
            </Box>
            <ListMusic></ListMusic>
        </Stack>
    );
}

export default Type;
