import { AppBar, Avatar, Box, Container, IconButton, ListItemIcon, Menu, MenuItem, Stack, Toolbar, Tooltip, Typography } from "@mui/material";
import { House, SignOut, SpotifyLogo } from "phosphor-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { configRouter } from "~/config";
import { logout } from "~/features/authSlice";
import ProfileDetail from "~/layout/components/Publish/Profile/ProfileDetail";

function Profile() {
    const currentUser = useSelector(state => state.auth.currentUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleLogout = () => {
        dispatch(logout());
        navigate('/')
    };
    return (<Box>
        <AppBar position="static" sx={{ padding: '5px 10px' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography
                        variant="h3"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            alignItems: 'center'
                        }}
                    >
                        <SpotifyLogo size={40} />
                        NHOM7
                    </Typography>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src={currentUser?.user?.photoURL} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={handleCloseUserMenu} sx={{ display: 'flex', flexDirection: 'column' }}>
                                <MenuItem>
                                    <ListItemIcon sx={{ m: 1 }}>
                                        <House size={20} weight="fill" />
                                    </ListItemIcon>
                                    <Link to={configRouter.Home} style={{ padding: '5px 0', color: 'black' }}><Typography textAlign="center">Trang chủ</Typography></Link>
                                </MenuItem>
                                <MenuItem>
                                    <ListItemIcon sx={{ m: 1 }}>
                                        <SignOut size={20} weight="fill" />
                                    </ListItemIcon>
                                    <Link onClick={handleLogout} to={configRouter.Home} style={{ padding: '5px 0', color: 'black' }}><Typography textAlign="center">Đăng xuất</Typography></Link>
                                </MenuItem>

                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
        <Stack>
            <ProfileDetail />
        </Stack>
    </Box>);
}

export default Profile;