import { Box, Button, Stack, Typography } from "@mui/material";
import { sendPasswordResetEmail } from "firebase/auth";
import { useSnackbar } from "notistack";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { configRouter } from "~/config";
import { auth } from "~/connectFirebase/config";

function ForgetPassword() {
    const [gmail, setEmail] = useState('')
    const { enqueueSnackbar } = useSnackbar()
    const inputRef = useRef()
    const handleGetEmail = (e) => {
        setEmail(e.target.value);
    }
    const handleForgetPass = () => {
        if (gmail === '') {
            enqueueSnackbar('Hãy nhập email!', { variant: "error" })
            inputRef.current.focus()
        }
        else {
            sendPasswordResetEmail(auth, gmail)
                .then(() => {
                    enqueueSnackbar('Vui lòng kiểm tra email của bạn để thay đổi mật khẩu', { variant: "success" })
                })
                .catch((error) => {
                    inputRef.current.focus()
                    enqueueSnackbar('Email chưa được đăng ký hoặc emai không hợp lệ', { variant: "error" })
                });
        }
    }
    return (<Box sx={{
        width: '50%', height: '300px', display: 'flex',
        flexDirection: 'column', justifyContent: 'center', color: 'black',
        boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',
        position: 'absolute',
        top: '25%',
        left: '25%'
        // margin: '0 25%',
    }}>
        <Stack margin='10px 15px'>
            <Typography fontSize='25px' fontWeight='600'>
                Tìm tài khoản của bạn
            </Typography>
        </Stack>
        <Stack margin='10px 15px'>
            <Typography fontSize='20px'>
                Vui lòng nhập email để tìm kiếm tài khoản của bạn.
            </Typography>
        </Stack>
        <Stack margin='10px 15px'>
            <input type='search'
                ref={inputRef}
                onChange={handleGetEmail}
                placeholder="Nhập email..."
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
            <Button variant="contained" sx={{ color: 'white' }} onClick={handleForgetPass}>
                Tìm kiếm
            </Button>
        </Stack>
    </Box>);
}

export default ForgetPassword;