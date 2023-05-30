import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import ListMusic from '~/layout/components/Publish/ListMusic/ListMusic';
import { searchMusicFull } from '~/service/public/searchService';

function SearchResultMusic({ keyword = '' }) {
    const [data, setData] = useState([]);
    useEffect(() => {
        const callApi = async () => {
            try {
                const resPlaylist = await searchMusicFull({ keyword: keyword });
                setData(resPlaylist);
            } catch (error) {
                console.log(error);
            }
        };
        callApi();
    }, [keyword]);
    return (
        <Stack direction={'column'} padding={'10px 30px'}>
            <ListMusic data={data} />
        </Stack>
    );
}

export default SearchResultMusic;
