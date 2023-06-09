import { Box, Button, IconButton, Stack, Typography, useTheme } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Play } from 'phosphor-react';
import { useEffect, useState } from 'react';
import TableMusic from '~/components/TableMuisic/TableMuisic';
import ListPlaylist from '../Home/ListPlaylist/ListPlaylist.';
import { useParams } from 'react-router-dom';
import { getDetailPlaylistMusic, getPlaylist } from '~/service/public/PlaylistService';
import images from '~/asset/images';
import { formatDurationMusic } from '~/util/formatTime';
import { useDispatch } from 'react-redux';
import { addPlaylist } from '~/features/playlistCurrentSlice';

function DetailPlaylist() {
    const [isHover, setIsHover] = useState(false);
    const theme = useTheme();
    const dispatch = useDispatch();
    // const data = [1, 2, 3, 4];
    const [data, setData] = useState({});

    let { id } = useParams();
    useEffect(() => {
        const callApi = async () => {
            try {
                if (id) {
                    const res = await getPlaylist(id);
                    const res1 = await getDetailPlaylistMusic(res?.type);
                    setData({ ...res, musics: res1 });
                }
            } catch (error) {
                console.log(error);
            }
        };
        callApi();
    }, [id]);
    const handleClickPlayPlaylist = () => {
        dispatch(addPlaylist(data.musics));
    };
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
                                src={data?.thumbnail ? data?.thumbnail : images.playlistImageDefault}
                                alt="photoPlaylist"
                            ></img>
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
                                {data?.name}
                            </Typography>
                            <Typography
                                variant="body2"
                                color={theme.palette.grey[500]}
                                fontSize={'0.8rem'}
                                textAlign="center"
                            >
                                {/* {DateTime.parse(Timestamp.fromDate(data?.createdAt.toda).toString)} */}
                            </Typography>
                            {/* singer */}
                            {/* <Typography
                                variant="body2"
                                color={theme.palette.grey[500]}
                                fontSize={'0.8rem'}
                                textAlign="center"
                            >
                                Lưu Hương Giang
                            </Typography> */}
                            {/* <Typography
                                variant="body2"
                                color={theme.palette.grey[500]}
                                fontSize={'0.8rem'}
                                textAlign="center"
                            >
                                0 người yêu thích
                            </Typography> */}
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
                            onClick={handleClickPlayPlaylist}
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
                                {data?.description}
                            </Typography>
                        </Stack>

                        <TableMusic data={data?.musics} />
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
