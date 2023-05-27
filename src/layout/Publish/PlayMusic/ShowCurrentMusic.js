import { Box, Checkbox, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import { Heart } from 'phosphor-react';
import { MoreButtonMusic } from '~/components/MoreButtonMusic/MoreButtonMusic';

function ShowCurrentMusic({ data }) {
    const theme = useTheme();
    return (
        <Stack direction={'row'} gap={'10px'} alignItems={'center'}>
            <Stack direction={'row'}>
                <Box sx={{ width: 60, height: 60, borderRadius: '10px', overflow: 'hidden' }}>
                    <img
                        src="https://th.bing.com/th/id/R.60e788ded4d8885f7e5dbfeacc425168?rik=3yBVfG3N7ZPS9Q&pid=ImgRaw&r=0"
                        alt="img"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </Box>
            </Stack>

            <Stack direction={'column'} maxWidth={100}>
                <Typography color="white" variant="h6" noWrap>
                    Tên bài nhạc
                </Typography>
                <Typography
                    color={theme.palette.text.secondary}
                    variant="body2"
                    noWrap
                    sx={{
                        '&:hover': {
                            color: theme.palette.secondary.main,
                            textDecoration: 'underline',
                        },
                    }}
                >
                    Ten ca si
                </Typography>
            </Stack>
            <Stack direction={'row'} marginLeft={'10px'}>
                <Stack direction={'row'} gap={1}>
                    <Tooltip title="Yêu thích">
                        <Checkbox
                            icon={<Heart size={18} color={theme.palette.grey[300]} />}
                            checkedIcon={<Heart size={18} weight="fill" color={theme.palette.secondary.main} />}
                        />
                    </Tooltip>
                    <MoreButtonMusic />
                </Stack>
            </Stack>
        </Stack>
    );
}

export default ShowCurrentMusic;
