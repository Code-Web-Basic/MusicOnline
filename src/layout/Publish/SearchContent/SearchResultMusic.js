import { Stack } from '@mui/material';
import ListMusic from '~/layout/components/Publish/ListMusic/ListMusic';

function SearchResultMusic() {
    return (
        <Stack direction={'column'} padding={'10px 30px'}>
            <ListMusic />
        </Stack>
    );
}

export default SearchResultMusic;
