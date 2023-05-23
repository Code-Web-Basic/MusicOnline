import { Alert, Card, CardContent, CardHeader, IconButton, Snackbar, useTheme } from '@mui/material';
import { X } from 'phosphor-react';
import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './UploadNewMusic.module.scss';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);
UploadMusic.prototype = {
    files: PropTypes.array,
    setFiles: PropTypes.func,
};
function UploadMusic({ files, setFiles, handleClose }) {
    const theme = useTheme();

    const showMessageRef = useRef();
    const [showMessage, setShowMessage] = useState(false);

    const inputRef = useRef();
    const handleUploadFile = (e) => {
        let file = e.target.files[0];
        console.log(file.type);
        if (file) {
            if (file?.type?.includes('audio')) {
                setFiles((prev) => [...prev, file]);
            } else {
                handleShowMessage();
            }
        }
    };
    const handleShowMessage = () => {
        setShowMessage(true);
        if (showMessageRef.current) {
            clearTimeout(showMessageRef.current);
        }
        showMessageRef.current = setTimeout(() => {
            setShowMessage(false);
        }, 3000);
    };
    const handleCloseMessage = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowMessage(false);
        if (showMessageRef.current) {
            clearTimeout(showMessageRef.current);
        }
    };
    return (
        <>
            <Snackbar open={showMessage} onClose={handleShowMessage}>
                <Alert onClose={handleCloseMessage} severity="warning" sx={{ width: '100%' }}>
                    format type file audio
                </Alert>
            </Snackbar>
            <Card sx={{ padding: 1 }}>
                <CardHeader
                    action={
                        <IconButton aria-label="settings" onClick={handleClose}>
                            <X size={20} color={theme.palette.common.black} />
                        </IconButton>
                    }
                    title="Upload Music"
                ></CardHeader>
                <CardContent>
                    <div className={cx('wrapper')}>
                        <form onClick={() => inputRef.current.click()}>
                            <input
                                ref={inputRef}
                                className={cx('file-input')}
                                type="file"
                                name="file"
                                hidden
                                onChange={handleUploadFile}
                            />
                            {/* <i className={cx('fas fa-cloud-upload-alt')}></i> */}
                            <p>Browse File to Upload</p>
                        </form>
                        {/* <section className={cx('progress-area')}></section>
                    <section className={cx('uploaded-area')}></section> */}
                    </div>
                </CardContent>
            </Card>
        </>
    );
}

export default UploadMusic;
