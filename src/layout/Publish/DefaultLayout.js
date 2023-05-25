import { Box, Grid, Stack } from '@mui/material';
import Sidebar from '~/layout/components/Publish/SideBar';
import Header from '../components/Publish/Header/Header';
import PlayMusic from '../components/Publish/PlayMusic/PlayMusic';

function DefaultLayout({ children }) {
    return (
        <>
            <Grid
                container
                sx={{ backgroundColor: '#170f23' }}
                height={'calc(100vh - 90px)'}
                width={'100%'}
                marginBottom={'90px'}
            >
                <Grid item xs={2} width={'300px'} position={'relative'} height={'100%'}>
                    <Sidebar />
                </Grid>
                <Grid item xs={10} height={'100%'} overflow={'auto'}>
                    <Header />
                    {children}
                </Grid>
            </Grid>
            <PlayMusic />
        </>
    );
}

export default DefaultLayout;
