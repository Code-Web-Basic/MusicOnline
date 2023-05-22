import { Box, Modal } from '@mui/material';
import React, { useState } from 'react';
// import Typography from '~/theme/overrides/Typography';

import UploadMusic from './UploadMusic';
import AddContentMusic from './AddContentMusic';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    maxHeight: 'calc(100vh - 100px)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: 1,
    boxShadow: 24,
};
function UploadNewMusic({ children }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // const theme = useTheme();

    const [files, setFiles] = useState([]);
    const renderComponents = () => {
        if (files.length === 0) {
            return <UploadMusic files={files} setFiles={setFiles} />;
        } else {
            return <AddContentMusic files={files} />;
        }
    };
    return (
        <>
            <div onClick={handleOpen}>{children}</div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>{renderComponents()}</Box>
            </Modal>
        </>
    );
}

export default UploadNewMusic;
