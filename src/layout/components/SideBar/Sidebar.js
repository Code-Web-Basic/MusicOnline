import { Box, Stack, Typography, useTheme } from '@mui/material';
import {
    ChatCircleDots,
    Compass,
    House,
    InstagramLogo,
    MonitorPlay
} from 'phosphor-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { configRouter } from '~/config';

function Sidebar() {
    const theme = useTheme();
    const location = useLocation();
    const [openSideBar, setOpenSidebar] = useState(true);
    return (
        <Box sx={{ position: 'sticky', top: '0px', zIndex: 1000, backgroundColor: '#130c1c' }}>
            <Stack direction="row">
                <Stack
                    direction={'column'}
                    spacing={2}
                    width={!openSideBar ? '80px' : '100%'}
                    overflow="hidden"
                    sx={{
                        transition: '0.1s linear',
                        borderRight: '1px solid',
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
                        color='white'
                    >
                        {openSideBar ? (
                            <Typography variant="h5">ZIMGMP3</Typography>
                        ) : (
                            <>
                                <InstagramLogo size={24} weight="regular" />
                            </>
                        )}
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
                                '&:hover': {
                                    background: theme.palette.grey[300],
                                    borderRadius: '15px',
                                },
                                background:
                                    location.pathname === configRouter.Home && openSideBar
                                        ? theme.palette.grey[300]
                                        : 'transparent',
                                borderRadius: '15px',
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
                                    <House size={24} weight="fill" />
                                    {openSideBar && (
                                        <Typography variant="h6" fontSize={'1rem'} fontWeight="600">
                                            Home
                                        </Typography>
                                    )}
                                </>
                            ) : (
                                <>
                                    <House size={24} weight="regular" />
                                    {openSideBar && (
                                        <Typography variant="body1" fontWeight="300">
                                            Home
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
                                '&:hover': {
                                    background: theme.palette.grey[300],
                                    borderRadius: '15px',
                                },
                                background:
                                    location.pathname === configRouter.ZingChart && openSideBar
                                        ? theme.palette.grey[300]
                                        : 'transparent',
                                borderRadius: '15px',
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
                                    <Compass size={24} weight="fill" />
                                    {openSideBar && (
                                        <Typography variant="h6" fontSize={'1rem'} fontWeight="600">
                                            Zing chart
                                        </Typography>
                                    )}
                                </>
                            ) : (
                                <>
                                    <Compass size={24} weight="regular" />
                                    {openSideBar && (
                                        <Typography variant="body1" fontWeight="300">
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
                                '&:hover': {
                                    background: theme.palette.grey[300],
                                    borderRadius: '15px',
                                },
                                background:
                                    location.pathname === configRouter.Library && openSideBar
                                        ? theme.palette.grey[300]
                                        : 'transparent',
                                borderRadius: '15px',
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
                                    <MonitorPlay size={24} weight="fill" />
                                    {openSideBar && (
                                        <Typography variant="h6" fontSize={'1rem'} fontWeight="600">
                                            library
                                        </Typography>
                                    )}
                                </>
                            ) : (
                                <>
                                    <MonitorPlay size={24} weight="regular" />
                                    {openSideBar && (
                                        <Typography variant="body1" fontWeight="300">
                                            library
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
                                '&:hover': {
                                    background: theme.palette.grey[300],
                                    borderRadius: '15px',
                                },
                                background:
                                    location.pathname === configRouter.Favorite && openSideBar
                                        ? theme.palette.grey[300]
                                        : 'transparent',
                                borderRadius: '15px',
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
                                    <ChatCircleDots size={24} weight="fill" />
                                    {openSideBar && (
                                        <Typography variant="h6" fontSize={'1rem'} fontWeight="600">
                                            Favorite
                                        </Typography>
                                    )}
                                </>
                            ) : (
                                <>
                                    <ChatCircleDots size={24} weight="regular" />
                                    {openSideBar && (
                                        <Typography variant="body1" fontWeight="300">
                                            Favorite
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
