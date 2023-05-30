import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "~/features/authSlice";

const { Box, Stack, Typography, TextField, Avatar, Button } = require("@mui/material");

function ProfileDetail() {
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.auth.currentUser)
    const [avatar, setAvatar] = useState(currentUser?.user?.photoURL || '');
    const [displayName, setDisplayName] = useState(currentUser?.user?.displayName || '');

    const handleChangeAvatar = async (e) => {
        if (e.target.files[0].type === '') {
            enqueueSnackbar('Hãy lựa chọn ảnh phù hợp', { variant: 'error' });
        }
        else {
            const storage = getStorage();
            const storageRef = ref(storage, 'avatar/' + e.target.files[0].name);

            uploadBytes(storageRef, e.target.files[0]).then(() => {
                try {
                    getDownloadURL(storageRef).then((downloadURL) => setAvatar(downloadURL));
                } catch (error) {
                    enqueueSnackbar(error, { variant: 'error' });
                }
            });
        }
    }

    const handleGetDisplayName = (e) => {
        setDisplayName(e.target.value);
    }
    const handleUpdateInfo = () => {
        const data = {
            displayName: displayName,
            photoURL: avatar
        }
        if (displayName === '') {
            enqueueSnackbar('Hãy điền đủ tên', { variant: 'error' });
            enqueueSnackbar('Cập nhập thất bại', { variant: 'error' });
        }
        else {
            // handleUpdateProfile(data)
            dispatch(updateProfile(data))
            enqueueSnackbar('Cập nhập thông tin thành công', { variant: 'success' });
        }
    }

    return (<Box sx={{ margin: '0px 20%', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', color: 'black' }}>
        <Stack sx={{ padding: '15px' }}>
            <Typography variant="h3">
                Tổng quan về tài khoản
            </Typography>
        </Stack>
        <Stack sx={{ padding: '15px' }}>
            <Typography variant="h5">
                Hồ sơ
            </Typography>
            <Stack display='flex' flexDirection='row' alignItems='center'>
                <Stack sx={{ width: '60%' }}>
                    <Stack sx={{ margin: '5px 0' }}>
                        <Typography variant="p" fontSize='15px'>
                            Email
                        </Typography>
                        <TextField
                            disabled
                            id="outlined-read-only-input"
                            defaultValue={currentUser?.user?.email}
                            InputProps={{
                                readOnly: true,
                            }}
                            sx={{ margin: '5px 0', border: '1px solid #ccc' }}
                        />
                    </Stack>
                    <Stack sx={{ margin: '5px 0' }}>
                        <Typography variant="p" fontSize='15px'>
                            Họ và tên
                        </Typography>
                        <input onChange={handleGetDisplayName} type='search' defaultValue={displayName} style={{ margin: '5px 0', color: 'black', padding: '15px', fontSize: '15px', border: '1px solid #ccc' }} />
                    </Stack>
                </Stack>
                <Stack sx={{ margin: '5px 10px' }}>
                    <input
                        type="file"
                        id="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={(e) => {
                            handleChangeAvatar(e)
                        }}
                    />
                    <label htmlFor="file" >
                        <div style={{ width: '30%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}>
                            <Avatar sx={{ width: '250px', height: '250px' }} alt="Avatar" src={avatar} />
                        </div>
                    </label>
                </Stack>
            </Stack>
            <Stack display='flex' flexDirection='row' >
                <Button variant="contained" color="success" onClick={handleUpdateInfo}>
                    Cập nhập
                </Button>
            </Stack>
        </Stack>
        <Stack sx={{ padding: '15px' }}>
            <Typography variant="h5">
                Gói của bạn
            </Typography>
            <Stack>
                <Stack sx={{ width: '100%', backgroundColor: '#ccc', borderRadius: '10px', padding: '20px 20px' }}>
                    FreeMusic
                </Stack>
                <Stack sx={{ width: '100%', padding: '20px 0' }}>
                    Sử dụng dịch vụ ở chế độ miễn phí
                </Stack>
                <Stack>
                    <Button variant="contained" color="success" sx={{ width: '150px', padding: '10px ' }}>
                        Đăng ký VIP
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    </Box>);
}

export default ProfileDetail;