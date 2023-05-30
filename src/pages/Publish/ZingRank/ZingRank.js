import { useEffect, useState } from 'react';
import ListMusic from '~/layout/components/Publish/ListMusic/ListMusic';
import { getMusicTop } from '~/service/public/MusicService';

function ZingRank() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const callApi = async () => {
            try {
                const res = await getMusicTop();
                console.log(res);
                setData(res);
            } catch (error) {
                console.log(error);
            }
        };
        callApi();
    }, []);
    return (
        <>
            <ListMusic data={data} />
        </>
    );
}

export default ZingRank;
