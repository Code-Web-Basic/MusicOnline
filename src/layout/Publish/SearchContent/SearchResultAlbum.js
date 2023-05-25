import { Grid, Stack } from '@mui/material';
import ListPlaylistColumn from '~/layout/components/Publish/ListPlaylistColumn/ListPlaylistColumn';

function SearchResultAlbum() {
    return (
        <Stack direction={'column'} alignItems={'center'} padding={'10px 30px'}>
            <ListPlaylistColumn />
        </Stack>
    );
}

export default SearchResultAlbum;
