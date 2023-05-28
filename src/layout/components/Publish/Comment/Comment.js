import { Box, Modal, Stack, Typography, alpha, useTheme } from '@mui/material';
import { useState } from 'react';

function Comment({ children }) {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
            <div onClick={handleOpen}>{children}</div>
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
                        width: 400,
                        // boxShadow: 24,
                        borderRadius: 1,
                        background: theme.palette.secondary.dark,
                    }}
                >
                    <Stack direction={'column'} width={'100%'} height={'100%'}>
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
                        <Stack direction={'row'} p={1}></Stack>
                    </Stack>
                </Box>
            </Modal>
        </>
    );
}

export default Comment;
