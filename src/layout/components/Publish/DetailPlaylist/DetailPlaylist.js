import { Box, Button, IconButton, Stack, Typography, useTheme } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Play } from 'phosphor-react';
import { useState } from 'react';
import TableMusic from '~/components/TableMuisic/TableMuisic';
import ListPlaylist from '../Home/ListPlaylist/ListPlaylist.';

function DetailPlaylist() {
    const [isHover, setIsHover] = useState(false);
    const theme = useTheme();
    const data = [1, 2, 3, 4];
    return (
        <Stack direction={'column'} marginBottom={'60px'}>
            <Grid2 container backgroundColor="transparent" width={'100%'}>
                <Grid2 xs={4}>
                    <Stack
                        direction="column"
                        p={2}
                        justifyContent="center"
                        gap="10px"
                        alignItems={'center'}
                        sx={{ position: 'sticky' }}
                    >
                        <Box
                            sx={{
                                width: 300,
                                height: 300,
                                position: 'relative',
                                borderRadius: '10px',
                                overflow: 'hidden',
                            }}
                            onMouseOver={() => setIsHover(true)}
                            onMouseOut={() => setIsHover(false)}
                        >
                            <img
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    transform: isHover ? 'scale(1.1)' : '',
                                    transition: '0.3s all linear',
                                }}
                                src="https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_webp/cover/8/1/e/9/81e96c0d7646b1d357298e35cecb1762.jpg"
                                alt="photoPlaylist"
                            ></img>
                            c
                            <Box
                                sx={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    top: 0,
                                    left: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {isHover && (
                                    <IconButton sx={{ border: '1px solid', borderColor: theme.palette.common.white }}>
                                        <Play size={20} weight="fill" color={theme.palette.common.white} />
                                    </IconButton>
                                )}
                            </Box>
                        </Box>

                        <Stack
                            direction="column"
                            p={2}
                            justifyContent="center"
                            alignItems={'center'}
                            gap="5px"
                            width={'100%'}
                        >
                            <Typography
                                width={'80%'}
                                variant="h5"
                                color={theme.palette.common.white}
                                fontSize={'1.2rem'}
                                textAlign="center"
                                textOverflow={'ellipsis'}
                                overflow={'hidden'}
                                height={50}
                            >
                                Những Bài Hát Hay Nhất Của Lưu Hương Giang
                            </Typography>
                            <Typography
                                variant="body2"
                                color={theme.palette.grey[500]}
                                fontSize={'0.8rem'}
                                textAlign="center"
                            >
                                Cập nhật: 10/05/2023
                            </Typography>
                            <Typography
                                variant="body2"
                                color={theme.palette.grey[500]}
                                fontSize={'0.8rem'}
                                textAlign="center"
                            >
                                Lưu Hương Giang
                            </Typography>
                            <Typography
                                variant="body2"
                                color={theme.palette.grey[500]}
                                fontSize={'0.8rem'}
                                textAlign="center"
                            >
                                283 người yêu thích
                            </Typography>
                        </Stack>

                        <Button
                            sx={{
                                backgroundColor: '#9b4de0',
                                '&:hover': {
                                    backgroundColor: '#c273ed',
                                },
                                borderRadius: 10,
                                color: theme.palette.common.white,
                                padding: '5px 10px',
                            }}
                            startIcon={<Play size={20} weight="fill" />}
                        >
                            <Typography variant="h5" fontSize="1rem">
                                Phát ngẫu nhiên
                            </Typography>
                        </Button>
                    </Stack>
                </Grid2>
                <Grid2 xs={8}>
                    <Stack direction={'column'} padding={2}>
                        <Stack direction={'row'} height={50} overflow="hidden">
                            <Typography variant="body2" fontSize="0.8rem" color={theme.palette.grey[500]}>
                                Lời tựa:{' '}
                            </Typography>
                            <Typography
                                variant="body2"
                                fontSize="0.8rem"
                                color={theme.palette.common.white}
                                textOverflow={'ellipsis'}
                            >
                                'Mất anh em tìm lại thấy chính mình' và Hit nổi bật của Lưu Hương Giang'
                            </Typography>
                        </Stack>

                        <TableMusic />
                    </Stack>
                </Grid2>
            </Grid2>
            <Stack direction={'row'} padding={'10px 20px'} width={'100%'}>
                <ListPlaylist
                    data={data}
                    title={'Có Thể Bạn Quan Tâm'}
                    size="medium"
                    type={'single'}
                    style={{ margin: '0px 10px' }}
                />
            </Stack>
        </Stack>
    );
}

export default DetailPlaylist;
