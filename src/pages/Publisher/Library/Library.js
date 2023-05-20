import { Box, Container, Stack, Typography } from "@mui/material";
import { PlayCircle } from "phosphor-react";
import ListMyPlayList from "~/layout/components/ListMyPlayList/ListMyPlayList";
import { styled } from '@mui/system';
import { buttonClasses } from '@mui/base/Button';
import { Tab, TabPanel, Tabs, TabsList, tabClasses } from '@mui/base';
import ItemTabPlaylist from "~/layout/components/Home/ListTabPlaylist/ItemTabPlaylist";

const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
};

const StyledTab = styled(Tab)`
    font-family: IBM Plex Sans, sans-serif;
    color: white;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: bold;
    background-color: transparent;
    // width: 100%;
    padding: 6px;
    margin: 6px 6px;
    border: none;
    border-radius: 7px;
    display: flex;
    justify-content: center;

    &:hover {
        outline: 1px solid ${grey[700]};
    }

    &:focus {
        color: #fff;
    }

    &.${tabClasses.selected} {
        background-color: #9b4de0;
        color: #fff;
        &:hover {
            background-color: #c273ed;
        }
    }

    &.${buttonClasses.disabled} {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const StyledTabPanel = styled(TabPanel)`
    width: 100%;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
`;

const StyledTabsList = styled(TabsList)(
    ({ theme }) => `
    // min-width: 400px;
    border-radius: 12px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: start;
    align-content: space-between;
    // box-shadow: 0px 4px 8px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
    `,
);

function Library() {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (<div
        style={{
            minHeight: 'calc(100vh - 70px - 90px)',
            backgroundColor: '#170f23',
            height: '100%',
            textOverflow: 'auto',
        }}
    >
        <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column', padding: '40px 0px' }}>
            <Stack>
                <Typography variant='h3' color='white' sx={{ display: 'flex', alignItems: 'center' }}>
                    Thư viện
                    <PlayCircle cursor='pointer' size={40} weight="fill" />
                </Typography>
            </Stack>
            <Stack sx={{ marginTop: '45px' }}>
                <ListMyPlayList title={'PLAYLIST'} data={data} />
            </Stack>
            <Stack sx={{ marginTop: '30px' }}>
                <Typography variant='h3' color='white' fontSize={'1.2rem'} sx={{ display: 'flex', alignItems: 'center' }}>
                    BÀI HÁT
                </Typography>
                <Stack direction="row" width="100%" padding="10px">
                    <Box sx={{ width: '100%' }}>
                        <Tabs defaultValue={1}>
                            <StyledTabsList>
                                <StyledTab value={1}>Yêu thích</StyledTab>
                                <StyledTab value={2}>Đã tải lên</StyledTab>
                            </StyledTabsList>
                            <StyledTabPanel value={1}>
                                <ItemTabPlaylist />
                            </StyledTabPanel>
                            <StyledTabPanel value={2}>
                                <Stack display='flex' flexDirection='column' width='90%'>
                                    <Stack display='flex' flexDirection='row' justifyContent='space-between' >
                                        <Typography variant="h3" fontSize='0.8rem' color='#ccc'>
                                            BÀI HÁT
                                        </Typography>
                                        <Typography variant="h3" fontSize='0.8rem' color='#ccc'>
                                            THỜI GIAN
                                        </Typography>
                                    </Stack>
                                    <Stack display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' padding='5px 5px' sx={{ backgroundColor: 'hsla(0,0%,100%,0.1)', margin: '5px 0' }}>
                                        <Box sx={{ width: '33%', height: '100%', display: 'flex', alignItems: 'center' }}>
                                            <Box sx={{ width: '64px', height: '64px' }}>
                                                <img
                                                    src="https://th.bing.com/th/id/OIP.QBN8EFimKWv_qtNxC3FP5wHaGU?pid=ImgDet&rs=1"
                                                    alt="img"
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '5px' }}
                                                />
                                            </Box>
                                            <Box sx={{ width: '150px', paddingRight: '10px', marginLeft: '10px' }}>
                                                <Typography color="white" fontSize="14px">
                                                    Tên bài nhạc
                                                </Typography>
                                                <Typography color="white" fontSize="12px">
                                                    Ten ca si
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box color='white'>
                                            Cá nhân
                                        </Box>
                                        <Box color='white'>
                                            02:32
                                        </Box>
                                    </Stack>
                                    <Stack display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' padding='5px 5px' sx={{ backgroundColor: 'hsla(0,0%,100%,0.1)', margin: '5px 0' }}>
                                        <Box sx={{ width: '33%', height: '100%', display: 'flex', alignItems: 'center' }}>
                                            <Box sx={{ width: '64px', height: '64px' }}>
                                                <img
                                                    src="https://th.bing.com/th/id/OIP.QBN8EFimKWv_qtNxC3FP5wHaGU?pid=ImgDet&rs=1"
                                                    alt="img"
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '5px' }}
                                                />
                                            </Box>
                                            <Box sx={{ width: '150px', paddingRight: '10px', marginLeft: '10px' }}>
                                                <Typography color="white" fontSize="14px">
                                                    Tên bài nhạc
                                                </Typography>
                                                <Typography color="white" fontSize="12px">
                                                    Ten ca si
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box color='white'>
                                            Cá nhân
                                        </Box>
                                        <Box color='white'>
                                            02:32
                                        </Box>
                                    </Stack>
                                </Stack>
                            </StyledTabPanel>
                        </Tabs>
                    </Box>
                </Stack>
            </Stack>
        </Container>
    </div>);
}

export default Library;