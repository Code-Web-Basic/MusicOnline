import { Box, Button, Container, Modal, Stack, Typography } from '@mui/material';
import { PlayCircle, X } from 'phosphor-react';
import ListMyPlayList from '~/layout/components/Publish/ListMyPlayList/ListMyPlayList';
import { styled } from '@mui/system';
import { buttonClasses } from '@mui/base/Button';
import { Tab, TabPanel, Tabs, TabsList, tabClasses } from '@mui/base';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMusicByOwerId } from '~/service/publisher/musicService';
import { useSnackbar } from 'notistack';
import ListMusicMyLike from '~/layout/components/Publish/Library/Library';

const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
};

const StyledTab = styled(Tab)`
    font-family: IBM Plex Sans, sans-serif;
    color: white;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: bold;
    background-color: transparent;
    // width: 100%;
    padding: 6px;
    margin: 6px 6px;
    border: none;
    border-radius: 7px;
    display: flex;
    justify-content: center;

    &:hover {
        outline: 1px solid ${grey[700]};
    }

    &:focus {
        color: #fff;
    }

    &.${tabClasses.selected} {
        background-color: #9b4de0;
        color: #fff;
        &:hover {
            background-color: #c273ed;
        }
    }

    &.${buttonClasses.disabled} {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const StyledTabPanel = styled(TabPanel)`
    width: 100%;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
`;

const StyledTabsList = styled(TabsList)(
    ({ theme }) => `
    // min-width: 400px;
    border-radius: 12px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: start;
    align-content: space-between;
    // box-shadow: 0px 4px 8px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
    `,
);

const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    background: 'rgb(255, 255, 255)',
    p: 1,
    borderRadius: '10px',
};

function Library() {
    const currentUser = useSelector(state => state.auth.currentUser)
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = useState(true);
    const [myMusic, setMyMusic] = useState([]);
    const [musicAudio, setMusicAudio] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        const load = async () => {
            try {
                const data = await getMusicByOwerId(currentUser?.user?.uid)
                setMyMusic(data)
                setMusicAudio(new Audio(data[0]?.data?.source))
            } catch (error) {
                enqueueSnackbar(error, { variant: 'error' });
            }
        };
        load();
    }, [])

    const handleLogin = () => {
        navigate('/login')
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        console.log("true");
    };

    return (
        <div
            style={{
                minHeight: 'calc(100vh - 70px - 90px)',
                backgroundColor: '#170f23',
                height: '100%',
                textOverflow: 'auto',
            }}
        >
            {currentUser?.user?.uid ? <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column', padding: '40px 0px' }}>
                {/* all playlist */}
                <Stack>
                    <Typography variant="h3" color="white" sx={{ display: 'flex', alignItems: 'center' }}>
                        Thư viện
                        <PlayCircle cursor="pointer" size={40} weight="fill" />
                    </Typography>
                </Stack>
                <Stack sx={{ marginTop: '45px' }}>
                    <ListMyPlayList title={'PLAYLIST'} />
                </Stack>

                {/* Music */}
                <Stack sx={{ marginTop: '30px' }}>
                    <Typography
                        color="white"
                        fontSize={'1.2rem'}
                        sx={{ display: 'flex', alignItems: 'center' }}
                    >
                        BÀI HÁT
                    </Typography>
                    <Stack direction="row" width="100%" padding="10px">
                        <Box sx={{ width: '100%' }}>
                            <Tabs defaultValue={1}>
                                <StyledTabsList>
                                    <StyledTab value={1}>Yêu thích</StyledTab>
                                    <StyledTab value={2}>Đã tải lên</StyledTab>
                                </StyledTabsList>
                                {/*  */}
                                <StyledTabPanel value={1}>
                                    <ListMusicMyLike />
                                </StyledTabPanel>
                                {/* da tai len */}
                                <StyledTabPanel value={2}>
                                    <Stack display="flex" flexDirection="column" width="90%">
                                        <Stack display="flex" flexDirection="row" justifyContent="space-between">
                                            <Typography variant="h3" fontSize="0.8rem" color="#ccc">
                                                BÀI HÁT
                                            </Typography>
                                            <Typography variant="h3" fontSize="0.8rem" color="#ccc">
                                                THỜI GIAN
                                            </Typography>
                                        </Stack>
                                        {myMusic?.map((music, index) => (
                                            <Stack
                                                key={index}
                                                display="flex"
                                                flexDirection="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                padding="5px 5px"
                                                sx={{ backgroundColor: 'hsla(0,0%,100%,0.1)', margin: '5px 0' }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: '33%',
                                                        height: '100%',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <Box sx={{ width: '64px', height: '64px' }}>
                                                        <img
                                                            src="https://th.bing.com/th/id/OIP.QBN8EFimKWv_qtNxC3FP5wHaGU?pid=ImgDet&rs=1"
                                                            alt="img"
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                objectFit: 'cover',
                                                                borderRadius: '5px',
                                                            }}
                                                        />
                                                    </Box>
                                                    <Box sx={{ paddingRight: '10px', marginLeft: '10px' }}>
                                                        <Typography color="white" fontSize="14px">
                                                            {music?.data?.name}
                                                        </Typography>
                                                        <Typography color="white" fontSize="12px">
                                                            {music?.data?.description}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                <Box color="white">Cá nhân</Box>
                                                <Box color="white">{parseInt(musicAudio?.duration)}</Box>
                                            </Stack>
                                        ))}
                                    </Stack>
                                </StyledTabPanel>
                            </Tabs>
                        </Box>
                    </Stack>
                </Stack>
            </Container>
                :
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} minWidth="400px" maxheight="400px" overflow="auto">
                        <Stack direction="column">
                            <Stack
                                direction="row"
                                width="100%"
                                alignItems="center"
                                justifyContent={'center'}
                                p={1}
                                position="relative"
                                borderBottom="1px solid rgb(219, 219, 219)"
                                color='black'
                            >
                                <Typography variant="body1" fontWeight={5600} fontSize="1.2rem">
                                    Bạn chưa đăng nhập?
                                </Typography>
                                <Box sx={{ position: 'absolute', right: '10px' }} >
                                    <X cursor='pointer' onClick={handleClose} size={20} />
                                </Box>
                            </Stack>
                            <Stack
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '5px 20px',
                                    color: 'black'
                                }}
                            >
                                <Stack>
                                    <Typography fontSize="14px" fontWeight="400" marginBottom="5px">
                                        Đăng nhập để sử dụng dịch vụ?
                                    </Typography>
                                </Stack>
                            </Stack>
                            <Stack sx={{ padding: '10px 20px', display: 'flex', flexDirection: 'row', justifyContent: 'right' }}>
                                <Stack>
                                    <Button onClick={handleLogin} style={{ borderRadius: '10px', backgroundColor: '#33FF33', color: 'black', fontWeight: '600', marginLeft: '10px' }}>
                                        Đăng nhập
                                    </Button>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Box>
                </Modal>}
        </div >
    );
}

export default Library;
