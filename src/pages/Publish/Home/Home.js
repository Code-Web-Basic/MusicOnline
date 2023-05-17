import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Banner from '~/layout/components/Publish/Home/Banner/Banner';
import { Container, ListItem } from '@mui/material';
import ListPlaylist from '~/layout/components/Publish/Home/ListPlaylist/ListPlaylist.';
import ItemTabPlaylist from '~/layout/components/Publish/Home/ListTabPlaylist/ItemTabPlaylist';
import ListTabPlaylist from '~/layout/components/Publish/Home/ListTabPlaylist/ListTabPlaylist';
const cx = classNames.bind(styles);

function Home() {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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
                <ListPlaylist title={'Gần Đây'} data={data} />
                <ListPlaylist title={'Có Thể Bạn Muốn Nghe'} data={data} size="medium" />
                <ListTabPlaylist title={'Mới Phát Hành'} />
                <ListPlaylist title={'Chill'} data={data} size="medium" type="description" />
                <ListPlaylist title={'Năng Lượng Tích Cực'} data={data} size="medium" type="description" />
                <ListPlaylist title={'Nghệ Sĩ Thịnh Hành'} data={data} size="medium" type="description" />
                <ListPlaylist title={'Chill Cùng R&B Việt'} data={data} size="medium" type="single" />
                <ListPlaylist title={'Backstreet Boys'} data={data} size="medium" type="single" />
            </Container>
        </div>
    );
}

export default Home;
