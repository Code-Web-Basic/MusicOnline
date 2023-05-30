import { Grid } from '@mui/material';
import Sidebar from '~/layout/components/Publish/SideBar';
import Header from '../components/Publish/Header/Header';
import PlayMusic from './PlayMusic/PlayMusic';
import PlaylistPlay from './PlaylistPlay/PlaylistPlay';
import { useSelector } from 'react-redux';

function DefaultLayout({ children }) {
    const currentPlaylist = useSelector((state) => state.playlistCurrent);
    return (
        <>
            <Grid
                container
                position={'relative'}
                overflow={'hidden'}
                sx={{ backgroundColor: '#170f23', overflow: 'hidden' }}
                height={currentPlaylist.ListMusic.length > 0 ? 'calc(100vh - 90px)' : '100vh'}
                width={'100%'}
                marginBottom={currentPlaylist.ListMusic.length > 0 ? '90px' : '0px'}
            >
                <Grid item xs={2} width={'300px'} position={'relative'} height={'100%'}>
                    <Sidebar />
                </Grid>
                <Grid item xs={10} height={'100%'} overflow={'auto'}>
                    <Header />
                    {children}
                </Grid>

                {currentPlaylist.ListMusic.length > 0 && <PlaylistPlay />}
            </Grid>
            {currentPlaylist.ListMusic.length > 0 && <PlayMusic />}
        </>
    );
}

export default DefaultLayout;
