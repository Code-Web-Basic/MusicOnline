import { Grid } from '@mui/material';

import PropTypes from 'prop-types';
import ItemPlaylist from '../Home/ItemPlaylist/ItemPlaylist';

ListPlaylistColumn.prototype = {
    data: PropTypes.array,
};
function ListPlaylistColumn({ data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] }) {
    return (
        <Grid container spacing={1}>
            {data.map((i) => (
                <Grid item xs={12 / 5} alignItems={'center'} justifyContent={'center'}>
                    <ItemPlaylist key={i} type="single" data={i} />
                </Grid>
            ))}
        </Grid>
    );
}

export default ListPlaylistColumn;
