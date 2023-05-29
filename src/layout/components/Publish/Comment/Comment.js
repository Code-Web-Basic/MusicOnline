import { Avatar, Box, ListItemIcon, MenuItem, Modal, Stack, Typography, alpha, useTheme } from '@mui/material';
import { useSnackbar } from 'notistack';
import { ChatCircle, PaperPlaneRight } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { auth } from '~/connectFirebase/config';
import { getListComment, setNewComment } from '~/service/publish/commentService';
import { getUserById } from '~/service/publish/userService';

function Comment({ music }) {
    const currentUser = useSelector(state => state.auth.currentUser)
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [listComment, setListComment] = useState([]);
    const [ownerComment, setOwnerComment] = useState([])
    const [content, setContent] = useState('')
    const { enqueueSnackbar } = useSnackbar()
    useEffect(() => {
        const getAllComment = async () => {
            const data = await getListComment(music?.id);
            setListComment(data)
        }
        getAllComment()
    }, [])
    useEffect(() => {
        listComment.map(async (comment) => {
            const user = await getUserById(comment?.data?.ownerId)
            setOwnerComment(prev => [...prev, user])
        })
    }, [listComment])
    const convertTime = (time) => {
        return new Date(time * 1000)
    }

    const handleGetContent = (e) => {
        setContent(e.target.value)
    }

    const handleAddComment = async () => {
        const data = {
            content: content,
            createdAt: new Date(),
            updatedAt: new Date(),
            musicId: music?.id,
            ownerId: currentUser?.user?.uid,
        }
        if (content === '') {
            enqueueSnackbar('Hãy nhập bình luận!!!', { variant: "error" })
        }
        else {
            try {
                const newComment = await setNewComment(data)
                setListComment(prev => [...prev, newComment?.data])
                setOwnerComment(prev => [...prev, {
                    displayName: currentUser?.user?.displayName,
                    photoURL: currentUser?.user?.photoURL
                }])
                setContent('')
            }
            catch (err) {
                enqueueSnackbar(err, { variant: "error" })
            }
        }
    }

    const handleSubmit = async (event) => {
        const data = {
            content: content,
            createdAt: new Date(),
            updatedAt: new Date(),
            musicId: music?.id,
            ownerId: currentUser?.user?.uid,
        }
        if (event.key === 'Enter') {
            if (content === '') {
                enqueueSnackbar('Hãy nhập bình luận!!!', { variant: "error" })
            }
            else {
                try {
                    const newComment = await setNewComment(data)
                    setListComment(prev => [...prev, newComment?.data])
                    setOwnerComment(prev => [...prev, {
                        displayName: currentUser?.user?.displayName,
                        photoURL: currentUser?.user?.photoURL
                    }])
                    setContent('')
                }
                catch (err) {
                    enqueueSnackbar(err, { variant: "error" })
                }
            }
        }
    };
    return (
        <>
            <div onClick={handleOpen}><MenuItem
                onClick={handleClose}
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
                                {music?.data?.numberComment} Bình luận
                            </Typography>
                        </Stack>
                        {/* content */}
                        <Stack width='100%' direction={'column'} p={1} >
                            {ownerComment.map((item, index) => (
                                <Stack key={index} margin='5px' height='50px' display='flex' flexDirection='row' alignItems='center'>
                                    <Stack>
                                        <Avatar src={item[0]?.data?.photoURL} />
                                    </Stack>
                                    <Stack direction={'column'} p={1}>
                                        <Typography variant="h5">
                                            {item[0]?.data?.displayName} - {convertTime(listComment[index]?.data?.createdAt?.seconds).toDateString()}
                                        </Typography>
                                        <Typography>
                                            {listComment[index]?.data?.content}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            ))}
                            <Stack margin='5px' width='100%' display='flex' flexDirection='row' alignItems='center' position='absolute' bottom='0'>
                                <Stack>
                                    <Avatar src={currentUser?.user?.photoURL} />
                                </Stack>
                                <Stack>
                                    <input type='search' placeholder='Nhập bình luận...'
                                        style={{
                                            background: 'none',
                                            outline: 'none',
                                            padding: '8px',
                                            borderRadius: '10px',
                                            border: '1px solid #ccc',
                                            color: 'white',
                                            width: '500px',
                                            fontSize: '1rem',
                                            margin: '5px'
                                        }}
                                        onChange={handleGetContent}
                                        onKeyDown={handleSubmit}
                                    />
                                </Stack>
                                <Stack>
                                    <PaperPlaneRight onClick={handleAddComment} cursor='pointer' weight='fill' size={32} />
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
