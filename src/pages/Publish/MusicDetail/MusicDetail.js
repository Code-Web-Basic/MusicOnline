import { Box, Input, Stack, TextareaAutosize, Typography, useTheme } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Grid } from 'swiper';

function MusicDetail() {
    const theme = useTheme();
    return (
        <Grid2 container>
            <Grid2>
                <Stack direction={'column'} padding={10} gap={'5px'}>
                    <Stack direction={'row'}>
                        <Typography variant="h5" fontSize={'1.2rem'} color={theme.palette.common.white}>
                            chi tiết bài hát
                        </Typography>
                        <Stack direction={'row'} width={'100%'}>
                            <Input title="Tên nhạc"></Input>
                            <TextareaAutosize title="Mô tả"></TextareaAutosize>
                        </Stack>
                        <Stack direction={'column'}>
                            <Typography
                                variant="h6"
                                fontSize={'1.1rem'}
                                color={theme.palette.common.white}
                            ></Typography>
                            <Box width={300} height={300}>
                                <img
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    src={
                                        'https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_webp/cover/b/e/e/c/beeca09b8a856f4dc6d32ee63b6f9d1a.jpg'
                                    }
                                    alt="15"
                                ></img>
                            </Box>
                        </Stack>
                    </Stack>
                </Stack>
            </Grid2>
            <Grid2></Grid2>
        </Grid2>
    );
}

export default MusicDetail;
