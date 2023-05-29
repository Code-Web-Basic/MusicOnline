import Banner from '~/layout/components/Publish/Home/Banner/Banner';
import { Container } from '@mui/material';
import ListPlaylist from '~/layout/components/Publish/Home/ListPlaylist/ListPlaylist.';
import ListTabPlaylist from '~/layout/components/Publish/Home/ListTabPlaylist/ListTabPlaylist';
import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { getListPlaylistType } from '~/service/public/PlaylistService';

function Home() {
    const currentUser = useSelector((state) => state.auth.currentUser);
    const [data, setData] = useState({ type: '', data: [] });
    useEffect(() => {
        try {
            const callApi = async () => {
                const res = await getListPlaylistType('Hip-Hop');
                console.log(res);
                setData({ type: 'Hip-Hop', data: res });
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
                <Banner />
                <ListPlaylist title={'Gần Đây'} data={data1} />
                <ListPlaylist title={'Có Thể Bạn Muốn Nghe'} data={data1} size="medium" />
                <ListTabPlaylist title={'Mới Phát Hành'} />
                <ListPlaylist title={data.type} data={data.data} size="medium" type="description" />
                <ListPlaylist title={'Năng Lượng Tích Cực'} data={data1} size="medium" type="description" />
                <ListPlaylist title={'Nghệ Sĩ Thịnh Hành'} data={data1} size="medium" type="description" />
                <ListPlaylist title={'Chill Cùng R&B Việt'} data={data1} size="medium" type="single" />
                <ListPlaylist title={'Backstreet Boys'} data={data1} size="medium" type="single" />
            </Container>
        </div>
    );
}

export default Home;
