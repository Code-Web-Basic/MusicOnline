import Banner from '~/layout/components/Publish/Home/Banner/Banner';
import { Container } from '@mui/material';
import ListPlaylist from '~/layout/components/Publish/Home/ListPlaylist/ListPlaylist.';
import ListTabPlaylist from '~/layout/components/Publish/Home/ListTabPlaylist/ListTabPlaylist';
import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { getAllListPlaylistType } from '~/service/public/PlaylistService';
import { getHomeMusic } from '~/service/public/MusicService';

function Home() {
    const currentUser = useSelector((state) => state.auth.currentUser);
    const [data, setData] = useState([]);
    const [dataMusic, setDataMusic] = useState([]);
    useEffect(() => {
        try {
            const callApi = async () => {
                const type = ['Acoustic', 'EDM', 'Bolero', 'Remix', 'Indie Việt'];
                const res1 = await getAllListPlaylistType(type);
                setData(res1);
                const res2 = await getHomeMusic();
                setDataMusic(res2);
            };
            callApi();
        } catch (error) {
            console.log(error);
        }
    }, []);

    const data1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
        <div
            style={{
                minHeight: 'calc(100vh - 70px - 90px)',
                backgroundColor: '#170f23',
                height: '100%',
                textOverflow: 'auto',
            }}
        >
            <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column', padding: '10px 0px' }}>
                {/* <Banner />
                <ListPlaylist title={'Gần Đây'} data={data1} /> */}
                {/* <ListPlaylist title={'Có Thể Bạn Muốn Nghe'} data={data1} size="medium" /> */}
                <ListTabPlaylist title={'Mới Phát Hành'} data={dataMusic} />
                {data.map((i) => (
                    <ListPlaylist key={i.type} title={i.type} data={i.data} size="medium" type="description" />
                ))}
            </Container>
        </div>
    );
}

export default Home;
