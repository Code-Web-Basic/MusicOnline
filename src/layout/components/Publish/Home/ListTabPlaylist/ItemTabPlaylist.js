import { Stack } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import ItemMusic from '../../ItemMusic/ItemMusic';

import PropTypes from 'prop-types';
ItemTabPlaylist.prototype = {
    data: PropTypes.array,
};
function ItemTabPlaylist({ data }) {
    // tab
    // const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    return (
        <Stack direction="row" width="100%">
            <Grid2 container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }} width="100%">
                {data?.map((i, index) => (
                    <Grid2 item xs={2} sm={4} md={4} key={index}>
                        <ItemMusic data={i} />
                    </Grid2>
                ))}
            </Grid2>
        </Stack>
    );
}

export default ItemTabPlaylist;
