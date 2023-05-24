import { Alert, Box, Button, Container, IconButton, Modal, Snackbar, Stack, Switch, Typography } from '@mui/material';
import { Play, PlusCircle, X } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ItemMyPlayList from '~/layout/components/Publish/ListMyPlayList/ItemMyPlayList';
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

function MyPlayList() {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.auth.currentUser)
    // useEffect(() => {
    //     dispatch(getAllMyPlayList(currentUser?.user?.uid))
    // })
    const myPlayLists = useSelector(state => state.myplaylist.data)
    const [newPlayList, setNewPlayList] = useState(false);
    const [checked, setChecked] = useState(true);
    const [namePlayList, setNamePlayList] = useState('');
    const [isHovering, setIsHovering] = useState(false);
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
            dispatch(setNewMyPlayList(playList));
            handleClick()
        }
    };

    const handleGetNamePlayList = (e) => {
        setNamePlayList(e.target.value);
    };

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const [openLogin, setOpenLogin] = useState(true);

    const handleClickOpenLogin = () => {
        setOpenLogin(true);
    };

    const handleCloseOpenLogin = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenLogin(false);
    };
    const navigate = useNavigate()
    const handleLogin = () => {
        navigate('/login')
    }

    return (
        <>
            {currentUser?.user?.uid ? <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <Stack borderBottom="1px solid #ccc" padding="15px" display="flex" flexDirection="row">
                    <Typography width="100px" variant="h3" color="white" fontSize="1.5rem">
                        Playlist
                    </Typography>
                </Stack>
                {/* All playlist */}
                <Stack margin="10px 10px" sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', width: '100%' }}>

                    {/* new playlist */}
                    <Stack sx={{ cursor: 'pointer' }} width="18%" height="250px" border="1px solid hsla(0,0%,100%,0.1)"
                        margin='10px 10px'>
                        <Stack
                            onClick={handleOpenNewPlayList}
                            width="100%"
                            height="100%"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <PlusCircle size={40} color="white" />
                            <Typography color="white" fontSize='15px'>
                                Tạo playlist mới
                            </Typography>
                        </Stack>
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
                    </Stack>

                    {myPlayLists.map((playlist, index) => (
                        <ItemMyPlayList playlist={playlist} key={index} />
                    ))}

                </Stack>
            </Container> :
                <Modal
                    open={openLogin}
                    onClose={handleCloseOpenLogin}
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
                            >
                                <Typography variant="body1" fontWeight={5600} fontSize="1.2rem">
                                    Bạn chưa đăng nhập?
                                </Typography>
                                <Box sx={{ position: 'absolute', right: '10px' }} >
                                    <X cursor='pointer' onClick={handleCloseOpenLogin} size={20} />
                                </Box>
                            </Stack>
                            <Stack
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '5px 20px',
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
                </Modal>
            }
        </>
    );
}

export default MyPlayList;
