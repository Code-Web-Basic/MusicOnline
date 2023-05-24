import { AppBar, Avatar, Box, Container, IconButton, Menu, MenuItem, Stack, Toolbar, Tooltip, Typography } from "@mui/material";
import { SpotifyLogo } from "phosphor-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { configRouter } from "~/config";
import ProfileDetail from "~/layout/components/Publish/Profile/ProfileDetail";

const settings = ['Trang chủ', 'Đăng xuất'];

function Profile() {
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (<Box>
        <AppBar position="static" sx={{ padding: '5px 10px' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography
                        variant="h5"
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
                        }}
                    >
                        <SpotifyLogo size={32} />
                        LOGO
                    </Typography>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="https://static.vecteezy.com/system/resources/previews/000/380/945/original/edit-profile-vector-icon.jpg" />
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
                                <Link to={configRouter.Home} style={{ padding: '5px 0' }}><Typography textAlign="center">Trang chủ</Typography></Link>
                                <Link to={configRouter.Login} style={{ padding: '5px 0' }}><Typography textAlign="center">Đăng xuất</Typography></Link>
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