import { Paper, Stack, styled } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import ItemMusic from '../ItemMusic/ItemMusic';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function ItemTabPlaylist({ indexSelected }) {
    // tab
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    return (
        <Stack direction="row" width="100%">
            <Grid2 container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }} width="100%">
                {data.map((_, index) => (
                    <Grid2 item xs={2} sm={4} md={4} key={index}>
                        <ItemMusic />
                    </Grid2>
                ))}
            </Grid2>
        </Stack>
    );
}

export default ItemTabPlaylist;
