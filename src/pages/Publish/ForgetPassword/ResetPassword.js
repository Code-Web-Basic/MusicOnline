import { Box, Button, Stack, Typography } from "@mui/material";
import { confirmPasswordReset } from "firebase/auth";
import { useSnackbar } from "notistack";
import { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { configRouter } from "~/config";
import { auth } from "~/connectFirebase/config";

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

function ResetPassword() {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const { enqueueSnackbar } = useSnackbar()
    const inputRef = useRef()
    const query = useQuery()
    const navigate = useNavigate()
    const handleGetNewPassword = (e) => {
        setConfirmPassword(e.target.value);
    }
    const handleGetConfirmPassword = (e) => {
        setPassword(e.target.value);
    }
    const handleResetPass = () => {
        if (password === '' || confirmPassword === '') {
            enqueueSnackbar('Hãy nhập mật khẩu mới', { variant: "error" })
            inputRef.current.focus()
        }
        else {
            if (password !== confirmPassword) {
                enqueueSnackbar('Mật khẩu mới không khớp', { variant: "error" })
                inputRef.current.focus()
            }
            else {
                try {
                    confirmPasswordReset(auth, query.get('oobCode'), password)
                        .then(() => {
                            enqueueSnackbar('Thay đổi mật khẩu thành công', { variant: "success" })
                            navigate('/login')
                        })
                        .catch(error => {
                            enqueueSnackbar(error, { variant: "error" })
                        })
                }
                catch (error) {
                    enqueueSnackbar(error, { variant: "error" })
                }
            }
        }
    }
    return (<Box sx={{
        width: '50%', height: '400px', display: 'flex',
        flexDirection: 'column', justifyContent: 'center', color: 'black',
        boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',
        position: 'absolute',
        top: '25%',
        left: '25%'
    }}>
        <Stack margin='10px 15px'>
            <Typography fontSize='25px' fontWeight='600' fontStyle='italic'>
                Khôi phục mật khẩu
            </Typography>
        </Stack>
        <Stack margin='5px 15px'>
            <Typography fontSize='18px' fontStyle='italic'>
                Mật khẩu mới
            </Typography>
        </Stack>
        <Stack margin='10px 15px'>
            <input type='password'
                ref={inputRef}
                onChange={handleGetNewPassword}
                placeholder="Nhập mật khẩu mới..."
                style={{
                    margin: '5px 0', color: 'black', padding: '15px',
                    fontSize: '15px', border: '1px solid #ccc', outline: 'none'
                }}
            />
        </Stack>
        <Stack margin='5px 15px'>
            <Typography fontSize='18px' fontStyle='italic'>
                Xác nhận mật khẩu mới
            </Typography>
        </Stack>
        <Stack margin='10px 15px'>
            <input type='password'
                onChange={handleGetConfirmPassword}
                placeholder="Nhập xác nhận mật khẩu mới..."
                style={{
                    margin: '5px 0', color: 'black', padding: '15px',
                    fontSize: '15px', border: '1px solid #ccc', outline: 'none'
                }}
            />
        </Stack>
        <Stack display='flex' flexDirection='row' justifyContent='right' margin='10px 15px'>
            <Link to={configRouter.Login} style={{ fontStyle: 'italic' }}>
                Bạn đã có tài khoản?
            </Link>
        </Stack>
        <Stack display='flex' flexDirection='row' justifyContent='right' margin='10px 15px'>
            <Button variant="contained" sx={{ color: 'white' }} onClick={handleResetPass}>
                Xác nhận
            </Button>
        </Stack>
    </Box>);
}

export default ResetPassword;