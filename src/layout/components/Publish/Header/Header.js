
import { Box, IconButton, Stack } from '@mui/material';

import SearchResult from './SearchResult';
import { bgBlur } from '~/util/cssStyles';
import ControlAction from './ControlAction';
import { ArrowLeft, ArrowRight } from 'phosphor-react';

function Header() {

    return (
        <Box
            sx={{
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                backgroundColor: { ...bgBlur({ color: 'rgba(23,15,35,0.8)' }) },
                width: '100%',
                height: '70px',
                padding: 2,
            }}
        >
            <Stack direction={'row'} height={'100%'} width={'100%'} justifyContent={'space-between'}>
                <Stack direction={'row'} gap={'10px'}>
                    <Stack direction={'row'} gap={'5px'}>
                        <IconButton>
                            <ArrowLeft size={20} weight="fill" />
                        </IconButton>
                        <IconButton>
                            <ArrowRight size={20} weight="fill" />
                        </IconButton>
                    </Stack>
                    <SearchResult />
                </Stack>
                <ControlAction />
            </Stack>
            {/* <FormControl
                style={{
                    height: '40px',
                    width: '400px',
                    backgroundColor: '#ccc',
                    borderRadius: '15px',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    style={{ fontSize: '15px', width: '400px' }}
                    startAdornment={
                        <InputAdornment position="start">
                            <MagnifyingGlass size={25} cursor="pointer" onClick={handleSubmit} />
                        </InputAdornment>
                    }
                    placeholder="Tìm kiếm bài hát, nghệ sĩ"
                    onKeyDown={handleSubmit}
                />
            </FormControl> */}
            {/* <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '200px' }}>
                <Box sx={{ marginRight: '50px' }}>
                    <Fab color="white" size="medium">
                        <SketchLogo size={32} />
                    </Fab>
                </Box>
                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar
                                alt="Remy Sharp"
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
                        {settings.map((setting) => (
                            <MenuItem key={setting} onClick={() => handleClickAction(setting)}>
                                <Typography textAlign="center">{setting}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </Box> */}
        </Box>
    );
}

export default Header;
