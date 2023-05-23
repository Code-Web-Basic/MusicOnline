import { Stack } from '@mui/material';
import ItemListMusic from './ItemListMusic';

function ListMusic() {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    return (
        <Stack direction={'column'} width={'100%'}>
            {data.map((item, index) => (
                <ItemListMusic data={item} index={index} />
            ))}
        </Stack>
    );
}

export default ListMusic;
