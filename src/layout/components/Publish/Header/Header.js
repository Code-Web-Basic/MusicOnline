import { Avatar, Box, Fab, FormControl, IconButton, Input, InputAdornment, InputBase, Menu, MenuItem, Tooltip, Typography, useTheme } from "@mui/material";
import { MagnifyingGlass, SketchLogo } from "phosphor-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { configRouter } from "~/config";

function Header() {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const theme = useTheme()
    const handleSubmit = async (event) => {
        if (event.key === 'Enter') {
            console.log('search')
        }
    }

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const settings = ['Thông tin cá nhân', 'Đăng ký nhà phát hành', 'Đăng nhập', 'Đăng xuất'];

    return (<Box sx={{
        position: 'sticky', top: '0px', zIndex: 1000,
        backgroundColor: 'rgba(23,15,35,0.8)', width: '100%', height: '70px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-around'
    }}>
        <FormControl style={{ height: '40px', width: '400px', backgroundColor: '#ccc', borderRadius: '15px', display: 'flex', alignItems: 'center' }}>
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                style={{ fontSize: '15px', width: '400px' }}
                startAdornment={
                    <InputAdornment position="start">
                        <MagnifyingGlass size={25} cursor='pointer' onClick={handleSubmit} />
                    </InputAdornment>
                }
                placeholder="Tìm kiếm bài hát, nghệ sĩ"
                onKeyDown={handleSubmit}
            />
        </FormControl>
        <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '200px' }}>
            <Box sx={{ marginRight: '50px' }}>
                <Fab
                    color="white"
                    size="medium"
                >
                    <SketchLogo size={32} />
                </Fab>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp"
                            src="https://th.bing.com/th/id/R.60e788ded4d8885f7e5dbfeacc425168?rik=3yBVfG3N7ZPS9Q&pid=ImgRaw&r=0"
                            sx={{ p: 0, width: '48px', height: '48px' }}
                        />
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
                    <MenuItem sx={{ display: 'flex', flexDirection: 'column' }} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center" margin='5px'><Link to={configRouter.Login} >Thông tin cá nhân</Link></Typography>
                        <Typography textAlign="center" margin='5px'><Link to={configRouter.Login} >Đăng ký nhà phát hành</Link></Typography>
                        <Typography textAlign="center" margin='5px'><Link to={configRouter.Login} >Đăng nhập</Link></Typography>
                        <Typography textAlign="center" margin='5px'><Link to={configRouter.Login} >Đăng xuất</Link></Typography>
                    </MenuItem>
                </Menu>
            </Box>
        </Box>
    </Box >);
}

export default Header;