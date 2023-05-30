import { Grid, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import ListPlaylistColumn from '~/layout/components/Publish/ListPlaylistColumn/ListPlaylistColumn';
import { searchPlaylistFull } from '~/service/public/searchService';

function SearchResultAlbum({ keyword = '' }) {
    const [data, setData] = useState([]);
    useEffect(() => {
        const callApi = async () => {
            try {
                const resPlaylist = await searchPlaylistFull({ keyword: keyword });
                setData(resPlaylist);
            } catch (error) {
                console.log(error);
            }
        };
        callApi();
    }, [keyword]);
    return (
        <Stack direction={'column'} alignItems={'center'} padding={'10px 30px'}>
            <ListPlaylistColumn data={data} />
        </Stack>
    );
}

export default SearchResultAlbum;
