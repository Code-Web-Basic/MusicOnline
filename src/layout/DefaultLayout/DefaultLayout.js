import { Box, Grid, Stack } from '@mui/material';
import Sidebar from '~/layout/components/SideBar';
import Header from '../components/Header/Header';
import PlayMusic from '../components/PlayMusic/PlayMusic';

function DefaultLayout({ children }) {
    return (
        <Stack direction={{ xs: 'column' }}>
            <Grid container>
                <Grid item xs={2}>
                    <Sidebar />
                </Grid>
                <Grid item xs={10}>
                    <Header />
                    {children}
                </Grid>
            </Grid>
            <PlayMusic />
        </Stack>
    );
}

export default DefaultLayout;
