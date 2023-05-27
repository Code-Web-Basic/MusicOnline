import { Alert, Box, Button, IconButton, Modal, Snackbar, Stack, Typography, useTheme } from '@mui/material';
import { DotsThreeOutline, Play, X } from 'phosphor-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { configRouter } from '~/config';
import { deleteMyPlayList } from '~/service/publish/publish';

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

function ItemMyPlayList({ playlist }) {
    const dispath = useDispatch()
    const currentUser = useSelector(state => state.auth.currentUser)
    const theme = useTheme();
    const [deletePlayList, setDeletePlayList] = useState(false);
    const handleOpenConfirmDeletePlayList = () => {
        setDeletePlayList(true);
    };
    const handleCloseConfirmDeletePlayList = () => {
        setDeletePlayList(false);
    };
    const [isHovering, setIsHovering] = useState(false);
    const handleDeleleMyPlayList = async () => {
        handleOpenConfirmDeletePlayList()
    }
    const handleConfirmDeletePlayList = (documentId) => {
        try {
            dispath(deleteMyPlayList(documentId))
            setDeletePlayList(false);
            handleClick()
        } catch (error) {
            console.error('Error deleting document:', error);
        }
    }

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
    return (
        <Stack
            margin="10px 10px"
            sx={{
                cursor: 'pointer',
                position: 'relative'
            }}
            width="18%"
            height="250px"
        >
            <Stack
                sx={{
                    cursor: 'pointer',
                    position: 'relative'
                }}
                onMouseOver={() => setIsHovering(true)}
                onMouseOut={() => setIsHovering(false)}>
                <img src='https://th.bing.com/th/id/OIP.94-AotN7wmEJEpbouOzJ3QHaHa?pid=ImgDet&rs=1'
                    style={{
                        borderRadius: '5px', width: '100%', height: '205px',
                        '&:hover': {
                            background: 'hsla(0,0%,100%,0.1)',
                        },
                    }}
                />
                {isHovering && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: '100%',
                            width: '100%',
                            zIndex: 10,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(23,15,35, 0.5)',
                        }}
                    >
                        <Stack direction={'row'} justifyContent="center" alignItems="center" gap="5px">
                            <IconButton onClick={() => handleDeleleMyPlayList()}>
                                <X size={20} weight="fill" color={theme.palette.common.white} />
                            </IconButton>
                            <IconButton
                                sx={{
                                    border: '1px solid',
                                    borderColor: theme.palette.grey[500],
                                }}
                            >
                                <Play size={20} weight="fill" color={theme.palette.common.white} />
                            </IconButton>

                            <IconButton>
                                <DotsThreeOutline size={20} weight="fill" color={theme.palette.common.white} />
                            </IconButton>
                        </Stack>
                    </Box>
                )}
                <Modal
                    open={deletePlayList}
                    onClose={handleCloseConfirmDeletePlayList}
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
                                <Typography variant="body1 " fontWeight={5600} fontSize="1.2rem">
                                    Xóa Playlist
                                </Typography>
                                <Box sx={{ position: 'absolute', right: '10px' }} onClick={handleCloseConfirmDeletePlayList}>
                                    <X size={20} />
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
                                        Playlist của bạn sẽ bị xóa khỏi thư viện cá nhân. Bạn có muốn xóa?
                                    </Typography>
                                </Stack>
                            </Stack>
                            <Stack sx={{ padding: '10px 20px', display: 'flex', flexDirection: 'row', justifyContent: 'right' }}>
                                <Stack>
                                    <Button onClick={handleCloseConfirmDeletePlayList} style={{ borderRadius: '10px', backgroundColor: '#ccc', color: 'black', fontWeight: '600' }}>
                                        Không
                                    </Button>
                                </Stack>
                                <Stack>
                                    <Button onClick={() => handleConfirmDeletePlayList(playlist?.id)} style={{ borderRadius: '10px', backgroundColor: '#33FF33', color: 'black', fontWeight: '600', marginLeft: '10px' }}>
                                        Có
                                    </Button>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Box>
                </Modal>
            </Stack>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Xóa playlist thành công
                </Alert>
            </Snackbar>
            <Link to={`/playlist/${playlist?.id}`}><Typography color="white" fontSize="1.2rem" >{playlist?.data?.name}</Typography></Link>
            <Typography color="white" fontSize="1rem" fontStyle='italic' sx={{ opacity: '0.7' }}>{currentUser?.user?.displayName}</Typography>
        </Stack>
    );
}

export default ItemMyPlayList;

