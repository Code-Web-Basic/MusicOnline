import { Box, Grid, Stack } from '@mui/material';
import Sidebar from '~/layout/components/Publish/SideBar';
import Header from '../components/Publish/Header/Header';
import PlayMusic from '../components/Publish/PlayMusic/PlayMusic';

function DefaultLayout({ children }) {
    return (
        <Stack direction={{ xs: 'column' }} height={'100vh'} width={'100%'}>
            <Grid container sx={{ backgroundColor: '#170f23' }}>
                <Grid item xs={2}>
                    <Sidebar />
                </Grid>
                <Grid item xs={10}>
                    <Header />
                    {children}
                </Grid>
                <PlayMusic />
            </Grid>
        </Stack>
    );
}

export default DefaultLayout;
