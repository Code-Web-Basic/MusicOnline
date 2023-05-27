import {
    Avatar,
    Box,
    Button,
    Divider,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Paper,
    Popover,
    Stack,
    Typography,
    alpha,
    useTheme,
} from '@mui/material';
import Tippy from '@tippyjs/react/headless';
import { Gear, House, SignOut, Upload, UserCircle } from 'phosphor-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import images from '~/asset/images';
import router from '~/config/Router';
import { logout } from '~/features/authSlice';
import { createMusic } from '~/service/publisher/musicService';

const MENU_OPTIONS = [
    {
        label: 'Home',
        icon: <House size={20} weight="fill" />,
    },
    {
        label: 'Thông tin cá nhân',
        icon: <UserCircle size={20} weight="fill" />,
    },
    {
        label: 'Tải lên',
        icon: <Upload size={20} weight="fill" />,
    },
    {
        label: 'Settings',
        icon: <Gear size={20} weight="fill" />,
    },
];
function AccountPopover() {
    const auth = useSelector((state) => state.auth);
    const theme = useTheme();
    const [open, setOpen] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleOpen = (event) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(null);
    };
    const handleLogout = () => {
        dispatch(logout());
        handleClose();
    };
    const handleClickAction = (option) => {
        if (option.label === 'Tải lên') {
            handleUploadMusic();
        }
        else if (option.label === 'Thông tin cá nhân') {
            navigate('/profile')
        }
        else {
            handleClose();
        }
    }
    const handleUploadMusic = async () => {
        // const data = {
        //     name: '',
        //     description: '',
        //     source: '',
        //     thumbnail: '',
        //     single: '',
        //     type: '',
        //     numberListen: 0,
        //     numberComment: 0,
        //     numberLike: 0,
        //     idPublisher: '',
        //     status: 'private',
        //     album: '',
        //     singles: '',
        //     createAt: Date.now(),
        //     updateAt: Date.now(),
        // };
        // try {
        //     await createMusic(data);
        // } catch (error) {
        //     console.log(error);
        // }
    }
    return (
        <>
            <Tippy
                interactive
                trigger="click"
                placement="bottom-end"
                render={(attrs) => (
                    <div className="box" tabIndex="-1" {...attrs}>
                        <Paper sx={{ background: '#34224f', padding: '1px', minWidth: 200 }}>
                            {auth?.currentUser !== null ? (
                                <>
                                    <Box sx={{ my: 1.5, px: 2.5 }}>
                                        <Typography variant="subtitle2" noWrap sx={{ color: theme.palette.grey[400] }}>
                                            {auth?.currentUser?.user?.providerData[0]?.displayName
                                                ? auth?.currentUser?.user?.providerData[0]?.displayName
                                                : 'cập nhật username'}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: theme.palette.grey[400] }} noWrap>
                                            {auth?.currentUser?.user?.providerData[0]?.email}
                                        </Typography>
                                    </Box>
                                    <Divider sx={{ borderStyle: 'dashed' }} />
                                    <Stack sx={{ p: 1 }}>
                                        {MENU_OPTIONS.map((option) => (
                                            <MenuItem
                                                key={option.label}
                                                onClick={() => handleClickAction(option)}
                                                sx={{ color: theme.palette.grey[400] }}
                                            >
                                                <ListItemIcon sx={{ m: 1, color: theme.palette.grey[400] }}>
                                                    {option.icon}
                                                </ListItemIcon>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Stack>
                                    <Divider sx={{ borderStyle: 'dashed' }} />
                                    <MenuItem onClick={handleLogout} sx={{ m: 1, color: theme.palette.grey[400] }}>
                                        <ListItemIcon sx={{ m: 1, color: theme.palette.grey[400] }}>
                                            <SignOut size={20} weight="fill" />
                                        </ListItemIcon>
                                        Đăng xuất
                                    </MenuItem>
                                </>
                            ) : (
                                <>
                                    <Link to={router.Login}>
                                        <MenuItem
                                            sx={{
                                                m: 1,
                                                color: theme.palette.common.white,
                                                borderRadius: 2,
                                                backgroundColor: '#9b4de0',
                                                '&:hover': {
                                                    backgroundColor: '#9b4de0',
                                                },
                                                justifyContent: 'center',
                                            }}
                                        >
                                            {/* <Button variant="contained" color={'#9b4de0'}> */}
                                            Đăng nhập
                                            {/* </Button> */}
                                        </MenuItem>
                                    </Link>
                                </>
                            )}
                        </Paper>
                    </div>
                )}
            >
                <IconButton
                    onClick={handleOpen}
                    sx={{
                        p: 0,
                        ...(open && {
                            '&:before': {
                                zIndex: 1,
                                content: "''",
                                width: '100%',
                                height: '100%',
                                borderRadius: '50%',
                                position: 'absolute',
                                bgcolor: (theme) => alpha(theme.palette.grey[700], 0.1),
                            },
                        }),
                    }}
                >
                    {auth.currentUser ? (
                        <Avatar
                            src={`${auth?.currentUser?.user?.providerData[0]?.photoURL
                                ? auth?.currentUser?.user?.providerData[0]?.photoURL
                                : ''
                                }`}
                            alt="photoURL"
                        />
                    ) : (
                        <Avatar src={`${images.imageUserDefaults}`} alt="photoURL" />
                    )}
                    {/* <Avatar
                    src={`${
                        auth?.currentUser?.user?.providerData[0]?.photoURL
                            ? auth?.currentUser?.user?.providerData[0]?.photoURL
                            : ''
                    }`}
                    alt="photoURL"
                /> */}
                </IconButton>
            </Tippy>

            {/* <Popover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: {
                        p: 0,
                        mt: 1.5,
                        ml: 0.75,
                        width: 180,
                        background: '#34224f',
                        '& .MuiMenuItem-root': {
                            typography: 'body2',
                            borderRadius: 0.75,
                        },
                    },
                }}
            > */}

            {/* </Popover> */}
        </>
    );
}

export default AccountPopover;
