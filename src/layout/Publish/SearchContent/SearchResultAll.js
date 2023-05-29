import { Grid, Stack, Typography, useTheme } from '@mui/material';
import { CaretRight } from 'phosphor-react';
import ItemMusic from '~/layout/components/Publish/ItemMusic/ItemMusic';
import ListPlaylist from '~/layout/components/Publish/Home/ListPlaylist/ListPlaylist.';
import { useEffect, useState } from 'react';
import { searchMusic, searchPlaylist } from '~/service/public/searchService';

function SearchResultAll({ keyword = '' }) {
    const theme = useTheme();
    const [data, setData] = useState({ dataMusic: [], dataPlaylist: [] });
    const dataMusic = [1, 2, 3];
    const dataItemMusic = [1, 2, 3, 4, 5, 6];
    useEffect(() => {
        const callApi = async () => {
            try {
                const resMusic = await searchMusic({ keyword: keyword });
                const resPlaylist = await searchPlaylist({ keyword: keyword });
                console.log(keyword, resPlaylist);
                setData({ dataMusic: [...resMusic], dataPlaylist: [...resPlaylist] });
            } catch (error) {
                console.log(error);
            }
        };
        callApi();
    }, [keyword]);

    return (
        <Stack direction={'column'} width={'100%'} padding={'10px 30px'} gap="10px">
            <Typography variant="h6">Nổi Bật</Typography>
            {data.dataMusic.length > 0 ? (
                <>
                    <Stack direction={'row'} width={'100%'} gap={'5px'}>
                        {data.dataMusic.slice(0, 3).map((i) => (
                            <ItemMusic key={i?.id} data={i} />
                        ))}
                    </Stack>
                    <Stack direction={'column'} width={'100%'}>
                        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                            <Typography variant="h6">Nổi Bật</Typography>
                            <Stack gap={'4px'} direction={'row'}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        '&:hover': {
                                            color: theme.palette.secondary.light,
                                        },
                                    }}
                                >
                                    TẤT CẢ
                                </Typography>
                                <CaretRight size={20} />
                            </Stack>
                        </Stack>
                        <Stack direction={'row'}>
                            <Grid container>
                                {data.dataMusic.map((i) => (
                                    <Grid item xs={6} key={i?.id}>
                                        <ItemMusic type="small" data={i} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Stack>
                    </Stack>
                </>
            ) : (
                <>
                    <Stack direction={'row'} width={'100%'} gap={'5px'} alignItems={'center'}>
                        <Typography variant="h6" color={theme.palette.common.white} textAlign={'center'} width={'100%'}>
                            không tìm được nhạc
                        </Typography>
                    </Stack>
                    <Stack direction={'column'} width={'100%'}>
                        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                            <Typography variant="h6">Nổi Bật</Typography>
                            <Stack gap={'4px'} direction={'row'}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        '&:hover': {
                                            color: theme.palette.secondary.light,
                                        },
                                    }}
                                >
                                    TẤT CẢ
                                </Typography>
                                <CaretRight size={20} />
                            </Stack>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'}>
                            <Typography
                                variant="h6"
                                color={theme.palette.common.white}
                                textAlign={'center'}
                                width={'100%'}
                            >
                                không tìm được nhạc
                            </Typography>
                        </Stack>
                    </Stack>
                </>
            )}

            <ListPlaylist title={'Playlist/Album'} size="medium" data={data.dataPlaylist.slice(0, 3)} type="single" />
        </Stack>
    );
}

export default SearchResultAll;
