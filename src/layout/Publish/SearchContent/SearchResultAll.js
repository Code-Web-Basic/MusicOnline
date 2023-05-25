import { Grid, Stack, Typography, useTheme } from '@mui/material';
import { CaretRight } from 'phosphor-react';
import ItemMusic from '~/layout/components/Publish/ItemMusic/ItemMusic';
import ListPlaylist from '~/layout/components/Publish/Home/ListPlaylist/ListPlaylist.';

function SearchResultAll() {
    const theme = useTheme();
    const dataMusic = [1, 2, 3];
    const dataItemMusic = [1, 2, 3, 4, 5, 6];
    return (
        <Stack direction={'column'} width={'100%'} padding={'10px 30px'} gap="10px">
            <Typography variant="h6">Nổi Bật</Typography>
            <Stack direction={'row'} width={'100%'} gap={'5px'}>
                {dataMusic.map((i) => (
                    <ItemMusic key={i} />
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
                        {dataItemMusic.map((i) => (
                            <Grid item xs={6} key={i}>
                                <ItemMusic type="small" />
                            </Grid>
                        ))}
                    </Grid>
                </Stack>
            </Stack>

            <ListPlaylist title={'Playlist/Album'} size="medium" data={[1, 2, 3, 4, 5, 6]} type="single" />
        </Stack>
    );
}

export default SearchResultAll;
