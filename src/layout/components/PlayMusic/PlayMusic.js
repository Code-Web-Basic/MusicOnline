import { Box, IconButton, Menu, MenuItem, Stack, Tooltip, Typography } from "@mui/material";
import { DotsThree, Heart, PauseCircle, Play, PlayCircle, Repeat, Shuffle, SkipBack, SkipForward } from "phosphor-react";
import { useEffect } from "react";
import { useState } from "react";

function PlayMusic() {
    const [openOptions, setOpenOptions] = useState(null);
    const handleOpenOptionsMenu = (event) => {
        setOpenOptions(event.currentTarget);
    };

    const handleCloseOptionsMenu = () => {
        setOpenOptions(null);
    };
    const settings = ['Thông tin cá nhân', 'Đăng ký nhà phát hành', 'Đăng nhập', 'Đăng xuất'];
    const [progress, setProgress] = useState(0);
    const currentTime = 30
    const duration = 300
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((currentTime / duration) * 100);
        }, 1000);
        return () => clearInterval(interval);
    }, [currentTime, duration]);
    return (<Box sx={{
        width: '100%', zIndex: 1000, height: '90px',
        backgroundColor: '#130c1c', display: 'flex',
        alignItems: 'center', padding: '0px 20px', justifyContent: 'space-between'
    }}>
        <Box sx={{ width: '33%', height: '100%', display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '64px', height: '64px' }}>
                <img src="https://th.bing.com/th/id/R.60e788ded4d8885f7e5dbfeacc425168?rik=3yBVfG3N7ZPS9Q&pid=ImgRaw&r=0"
                    alt="img"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '5px' }}
                />
            </Box>
            <Box sx={{ width: '150px', paddingRight: '10px', marginLeft: '10px' }}>
                <Typography color='white' fontSize='14px'>
                    Tên bài nhạc
                </Typography>
                <Typography color='white' fontSize='12px'>
                    Ten ca si
                </Typography>
            </Box>
            <Box sx={{ width: '64px', display: 'flex' }}>
                <Heart color="white" style={{ marginRight: '10px' }} fontSize={18} cursor='pointer' />
                <Box>
                    <Tooltip title="Xem thêm">
                        <DotsThree onClick={handleOpenOptionsMenu} color="white" fontSize={20} cursor='pointer' fontWeight='600' />
                    </Tooltip>
                    <Menu
                        sx={{ mt: '0' }}
                        id="menu-appbar"
                        anchorEl={openOptions}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={Boolean(openOptions)}
                        onClose={handleCloseOptionsMenu}
                    >
                        {settings.map((setting) => (
                            <MenuItem key={setting} onClick={handleCloseOptionsMenu}>
                                <Typography textAlign="center">{setting}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </Box>
        </Box>
        <Box sx={{ width: '33%', display: 'flex', flexDirection: 'column' }}>
            <Stack direction="row" spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Tooltip title="Phát bài ngẫu nhiên">
                    <IconButton aria-label="random">
                        <Shuffle size={28} color="white" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Phát bài nhạc trước">
                    <IconButton aria-label="previous">
                        <SkipBack size={28} weight="fill" color="white" />
                    </IconButton>
                </Tooltip>
                <Tooltip>
                    <IconButton aria-label="play">
                        <PlayCircle size={28} color="white" />
                    </IconButton>
                </Tooltip>
                <Tooltip>
                    <IconButton aria-label="pause">
                        <PauseCircle size={28} color="white" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Phát bài nhạc tiếp theo">
                    <IconButton aria-label="next">
                        <SkipForward size={28} weight="fill" color="white" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Lặp lại">
                    <IconButton aria-label="next">
                        <Repeat size={28} color="white" />
                    </IconButton>
                </Tooltip>
            </Stack>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography color='white'>
                    00:00
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }} >
                    <Box sx={{
                        height: '5px', width: '100px',
                        backgroundColor: '#ccc', position: 'relative',
                        margin: '0 10px'
                    }}>
                        <Box sx={{
                            height: '5px', backgroundColor: '#ff5a5f',
                            position: 'absolute', top: '0', left: '0',
                            width: `${progress}%`
                        }}></Box>
                    </Box>
                </Box>
                <Typography color='white'>
                    00:00
                </Typography>
            </Box>
        </Box>
        <Box sx={{ width: '33%' }}>
            slider mui
        </Box>
    </Box>);
}

export default PlayMusic;