import { Box, Stack, Typography, useTheme } from '@mui/material';
import {
    ChartLineUp,
    ChatCircleDots,
    Compass,
    House,
    InstagramLogo,
    ListPlus,
    MonitorPlay,
    Playlist,
} from 'phosphor-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { configRouter } from '~/config';

function Sidebar() {
    const theme = useTheme();
    const location = useLocation();
    const [openSideBar, setOpenSidebar] = useState(true);
    return (
        <Box sx={{ position: 'sticky', top: '0px', backgroundColor: '#2a213a' }}>
            <Stack direction="row">
                <Stack
                    direction={'column'}
                    spacing={2}
                    width="100%"
                    overflow="hidden"
                    sx={{
                        transition: '0.1s linear',
                        borderColor: theme.palette.grey[300],
                        height: '100vh',
                    }}
                >
                    <Stack
                        direction={'row'}
                        width="100%"
                        height="50px"
                        p={1}
                        alignItems="center"
                        justifyContent="center"
                        color="white"
                    >
                        {openSideBar && <Typography variant="h5">NHOM 7</Typography>}
                    </Stack>
                    <Stack direction={'column'} width="100%" p={1} spacing={2}>
                        {/* home */}
                        <Stack
                            direction={'row'}
                            p={'10px 10px'}
                            alignItems="center"
                            justifyContent="flex-start"
                            width="100%"
                            sx={{
                                textDecoration: 'none',
                                '&:hover': {
                                    borderRadius: '15px',
                                    opacity: '1',
                                },
                                background:
                                    location.pathname === configRouter.Home && openSideBar
                                        ? 'hsla(0,0%,100%,0.1)'
                                        : 'transparent',
                                borderRadius: '15px',
                                opacity: '0.7',
                            }}
                            spacing={3}
                            component={Link}
                            to={configRouter.Home}
                            onClick={() => {
                                setOpenSidebar(true);
                            }}
                        >
                            {location.pathname === configRouter.Home ? (
                                <>
                                    <House color="white" size={24} weight="fill" />
                                    {openSideBar && (
                                        <Typography color="white" variant="h6" fontSize={'1rem'} fontWeight="500">
                                            Khám Phá
                                        </Typography>
                                    )}
                                </>
                            ) : (
                                <>
                                    <House color="white" size={24} weight="regular" />
                                    {openSideBar && (
                                        <Typography color="white" variant="body1" fontWeight="300">
                                            Khám Phá
                                        </Typography>
                                    )}
                                </>
                            )}
                        </Stack>
                        {/* Zing chart */}
                        <Stack
                            direction={'row'}
                            p={'10px 10px'}
                            alignItems="center"
                            justifyContent="flex-start"
                            width="100%"
                            sx={{
                                textDecoration: 'none',
                                '&:hover': {
                                    borderRadius: '15px',
                                    opacity: '1',
                                },
                                background:
                                    location.pathname === configRouter.ZingChart && openSideBar
                                        ? 'hsla(0,0%,100%,0.1)'
                                        : 'transparent',
                                borderRadius: '15px',
                                opacity: '0.7',
                            }}
                            spacing={3}
                            component={Link}
                            to={configRouter.ZingChart}
                            onClick={() => {
                                setOpenSidebar(true);
                            }}
                        >
                            {location.pathname === configRouter.ZingChart ? (
                                <>
                                    <ChartLineUp color="white" size={24} weight="fill" />
                                    {openSideBar && (
                                        <Typography color="white" variant="h6" fontSize={'1rem'} fontWeight="500">
                                            Zing chart
                                        </Typography>
                                    )}
                                </>
                            ) : (
                                <>
                                    <ChartLineUp color="white" size={24} weight="regular" />
                                    {openSideBar && (
                                        <Typography color="white" variant="body1" fontWeight="300">
                                            Zing chart
                                        </Typography>
                                    )}
                                </>
                            )}
                        </Stack>
                        {/* library */}
                        <Stack
                            direction={'row'}
                            p={'10px 10px'}
                            alignItems="center"
                            justifyContent="flex-start"
                            width="100%"
                            sx={{
                                textDecoration: 'none',
                                '&:hover': {
                                    borderRadius: '15px',
                                    opacity: '1',
                                },
                                background:
                                    location.pathname === configRouter.Library && openSideBar
                                        ? 'hsla(0,0%,100%,0.1)'
                                        : 'transparent',
                                borderRadius: '15px',
                                opacity: '0.7',
                            }}
                            spacing={3}
                            component={Link}
                            to={configRouter.Library}
                            onClick={() => {
                                setOpenSidebar(true);
                            }}
                        >
                            {location.pathname === configRouter.Library ? (
                                <>
                                    <Playlist color="white" size={24} weight="fill" />
                                    {openSideBar && (
                                        <Typography color="white" variant="h6" fontSize={'1rem'} fontWeight="500">
                                            Thư Viện
                                        </Typography>
                                    )}
                                </>
                            ) : (
                                <>
                                    <Playlist color="white" size={24} weight="regular" />
                                    {openSideBar && (
                                        <Typography color="white" variant="body1" fontWeight="300">
                                            Thư Viện
                                        </Typography>
                                    )}
                                </>
                            )}
                        </Stack>
                        {/* fav */}
                        <Stack
                            direction={'row'}
                            p={'10px 10px'}
                            alignItems="center"
                            justifyContent="flex-start"
                            width="100%"
                            sx={{
                                textDecoration: 'none',
                                '&:hover': {
                                    borderRadius: '15px',
                                    opacity: '1',
                                },
                                background:
                                    location.pathname === configRouter.Favorite && openSideBar
                                        ? 'hsla(0,0%,100%,0.1)'
                                        : 'transparent',
                                borderRadius: '15px',
                                opacity: '0.7',
                            }}
                            spacing={3}
                            component={Link}
                            to={configRouter.Favorite}
                            onClick={() => {
                                setOpenSidebar(true);
                            }}
                        >
                            {location.pathname === configRouter.Favorite ? (
                                <>
                                    <ListPlus color="white" size={24} weight="fill" />
                                    {openSideBar && (
                                        <Typography color="white" variant="h6" fontSize={'1rem'} fontWeight="500">
                                            Tạo Playlist Mới
                                        </Typography>
                                    )}
                                </>
                            ) : (
                                <>
                                    <ListPlus color="white" size={24} weight="regular" />
                                    {openSideBar && (
                                        <Typography color="white" variant="body1" fontWeight="300">
                                            Tạo Playlist Mới
                                        </Typography>
                                    )}
                                </>
                            )}
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    );
}

export default Sidebar;
