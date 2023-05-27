import { Grid } from '@mui/material';
import Sidebar from '~/layout/components/Publish/SideBar';
import Header from '../components/Publish/Header/Header';
import PlayMusic from './PlayMusic/PlayMusic';
import PlaylistPlay from './PlaylistPlay/PlaylistPlay';

function DefaultLayout({ children }) {
    return (
        <>
            <Grid
                container
                position={'relative'}
                overflow={'hidden'}
                sx={{ backgroundColor: '#170f23', overflow: 'hidden' }}
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
                <PlaylistPlay />
            </Grid>
            <PlayMusic />
        </>
    );
}

export default DefaultLayout;
