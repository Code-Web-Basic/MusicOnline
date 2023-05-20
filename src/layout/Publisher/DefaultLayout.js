import { Grid, Stack } from '@mui/material';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';

function DefaultLayout({ children }) {
    return (
        <Stack direction={{ xs: 'column' }} height={'100vh'} width={'100%'}>
            <Grid container height={'100%'} width={'100%'}>
                <Grid item xs={2}>
                    <Sidebar />
                </Grid>
                <Grid item xs={10} paddingTop={'100px'} paddingLeft={'10px'} paddingRight={'10px'}>
                    <Header />
                    {children}
                </Grid>
                {/* <PlayMusic /> */}
            </Grid>
        </Stack>
    );
}

export default DefaultLayout;
