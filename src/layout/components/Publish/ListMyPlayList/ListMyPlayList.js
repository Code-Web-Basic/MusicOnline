import React, { useEffect, useState } from 'react';
import { Alert, Box, Modal, Snackbar, Stack, Switch, Typography, useTheme } from '@mui/material';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';

// import required modules
import { Scrollbar } from 'swiper';
import { CaretRight, PlusCircle, X } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';
import ItemMyPlayList from './ItemMyPlayList';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMyPlayList, setNewMyPlayList } from '~/service/publish/publish';
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
function ListMyPlayList({ title, size = 'small' }) {
    const dispath = useDispatch()
    const currentUser = useSelector(state => state.auth.currentUser)
    const myPlayLists = useSelector(state => state.myplaylist.data)
    const theme = useTheme();
    const [newPlayList, setNewPlayList] = useState(false);
    const [checked, setChecked] = useState(true);
    const [namePlayList, setNamePlayList] = useState('');
    const [open, setOpen] = useState(false);
    // const dispath = useDispatch()
    let slidesPerView;

    if (size === 'large') {
        slidesPerView = 5;
    } else if (size === 'medium') {
        slidesPerView = 6;
    } else {
        slidesPerView = 9;
    }

    const navigate = useNavigate();
    const handleLoadMorePlayList = () => {
        navigate('/favorite');
    };

    const handleOpenNewPlayList = () => {
        setNewPlayList(true);
    };
    const handleCloseNewPlayList = () => {
        setNewPlayList(false);
    };

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const handleCreatePlayList = () => {
        const playList = {
            name: namePlayList,
            type: checked,
            userId: currentUser?.user?.uid
        };
        if (playList.name === '') {
            alert('Vui lòng nhập tên playlist');
        } else {
            setNewPlayList(false);
            setNamePlayList('')
            dispath(setNewMyPlayList(playList));
            handleClick()
        }
    };

    const handleGetNamePlayList = (e) => {
        setNamePlayList(e.target.value);
    };

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Stack direction="column" width="100%">
            <Stack direction="row" width="100%" justifyContent={'space-between'}>
                <Typography
                    display="flex"
                    alignItems="center"
                    fontSize={'1.2rem'}
                    color={theme.palette.common.white}
                >
                    {title}
                    <PlusCircle cursor="pointer" size={32} onClick={handleOpenNewPlayList} />
                    <Modal
                        open={newPlayList}
                        onClose={handleCloseNewPlayList}
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
                                    color="black"
                                >
                                    <Typography variant="body1 " fontWeight={5600} fontSize="0.8rem">
                                        <h3>Tạo playlist mới</h3>
                                    </Typography>
                                    <Box sx={{ position: 'absolute', right: '10px' }} onClick={handleCloseNewPlayList}>
                                        <X size={20} />
                                    </Box>
                                </Stack>
                                <Stack sx={{ padding: '5px' }}>
                                    <input
                                        style={{
                                            height: '40px',
                                            width: '100%',
                                            borderRadius: '999px',
                                            padding: '0px 15px',
                                            fontSize: '14px',
                                            border: '1px solid hsla(0,0%,100%,0.1)',
                                            backgroundColor: 'hsla(0,0%,100%,0.1)',
                                        }}
                                        placeholder="Nhập tên playlist"
                                        onChange={handleGetNamePlayList}
                                    />
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
                                            Công khai
                                        </Typography>
                                        <Typography fontSize="12px" fontWeight="400" marginBottom="5px">
                                            Mọi người có thể nhìn thấy playlist này
                                        </Typography>
                                    </Stack>
                                    <Stack>
                                        <Switch checked={checked} onChange={handleChange} size="small" />
                                    </Stack>
                                </Stack>
                                <Stack sx={{ padding: '10px 20px' }}>
                                    <button
                                        onClick={handleCreatePlayList}
                                        style={{
                                            height: '40px',
                                            width: '100%',
                                            borderRadius: '999px',
                                            padding: '0px 15px',
                                            fontSize: '14px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Tạo mới
                                    </button>
                                </Stack>
                            </Stack>
                        </Box>
                    </Modal>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            Tạo playlist thành công!
                        </Alert>
                    </Snackbar>
                </Typography>
                <Typography
                    onClick={handleLoadMorePlayList}
                    sx={{ cursor: 'pointer' }}
                    display="flex"
                    alignItems="center"
                    variant="body2"
                    fontSize="1.1rem"
                    fontWeight="300"
                    color={theme.palette.grey[500]}
                >
                    Tất cả
                    <CaretRight size={20} />
                </Typography>
            </Stack>

            <Stack direction="row" width="100%">
                {myPlayLists.length > 5 ?
                    myPlayLists.slice(0, 5).map((playlist, index) => (
                        <ItemMyPlayList playlist={playlist} key={index} />
                    ))
                    :
                    myPlayLists.map((playlist, index) => (
                        <ItemMyPlayList playlist={playlist} key={index} />
                    ))
                }
            </Stack>
        </Stack>
    );
}

export default ListMyPlayList;
