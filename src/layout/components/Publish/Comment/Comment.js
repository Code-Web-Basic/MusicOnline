import { Avatar, Box, ListItemIcon, MenuItem, Modal, Stack, Typography, alpha, useTheme } from '@mui/material';
import { ChatCircle, PaperPlaneRight } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { auth } from '~/connectFirebase/config';
import { getListComment } from '~/service/publish/commentService';

function Comment({ musicId }) {
    const currentUser = useSelector(state => state.auth.currentUser)
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [listComment, setListComment] = useState([]);
    const [ownerComment, setOwnerComment] = useState([])
    useEffect(() => {
        const getAllComment = async () => {
            const data = await getListComment(musicId);
            setListComment(data)
        }
        getAllComment()
    }, [])
    return (
        <>
            <div onClick={handleOpen}><MenuItem
                // onClick={handleClose}
                sx={{ color: theme.palette.grey[400] }}
            >
                <ListItemIcon sx={{ color: theme.palette.grey[400] }}>
                    <ChatCircle size={20} weight="regular" />
                </ListItemIcon>
                Bình luận
            </MenuItem></div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 600,
                        height: '500px',
                        // boxShadow: 24,
                        borderRadius: 1,
                        background: theme.palette.secondary.dark,
                    }}
                >
                    <Stack direction={'column'} width={'100%'} height={'100%'} position='relative'>
                        <Stack
                            direction={'row'}
                            p={1}
                            padding={1}
                            borderBottom={'1px solid'}
                            borderColor={alpha(theme.palette.grey[500], 0.3)}
                            justifyContent={'center'}
                        >
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Bình luận
                            </Typography>
                        </Stack>
                        {/* content */}
                        <Stack width='100%' direction={'column'} p={1} >
                            <Stack height='50px' display='flex' flexDirection='row' alignItems='center'>
                                <Stack>
                                    <Avatar src='https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/349598947_261651529689712_2931965297632582605_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=730e14&_nc_ohc=YYl6vOnVDg4AX-LvaLo&_nc_ht=scontent.fsgn2-9.fna&oh=00_AfBvXo_a_wm-o7fMGHE67kfmbPXpjoEAL0QwpMIFzYR_qA&oe=64782350' />
                                </Stack>
                                <Stack direction={'column'} p={1}>
                                    <Typography variant="h5">
                                        Cong vtt - Today
                                    </Typography>
                                    <Typography>
                                        hay quas anh oiw
                                    </Typography>
                                </Stack>
                            </Stack>
                            <Stack margin='5px' width='100%' display='flex' flexDirection='row' alignItems='center' position='absolute' bottom='0'>
                                <Stack>
                                    <Avatar src={currentUser?.user?.photoURL} />
                                </Stack>
                                <Stack>
                                    <input type='search' placeholder='Nhập bình luận...' style={{
                                        background: 'none',
                                        outline: 'none',
                                        padding: '8px',
                                        borderRadius: '10px',
                                        border: '1px solid #ccc',
                                        color: 'white',
                                        width: '500px',
                                        fontSize: '1rem',
                                        margin: '5px'
                                    }} />
                                </Stack>
                                <Stack>
                                    <PaperPlaneRight cursor='pointer' weight='fill' size={32} />
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                </Box>
            </Modal>
        </>
    );
}

export default Comment;
