import { Grid } from '@mui/material';

import PropTypes from 'prop-types';
import ItemPlaylist from '../Home/ItemPlaylist/ItemPlaylist';

ListPlaylistColumn.prototype = {
    data: PropTypes.array,
};
function ListPlaylistColumn({ data = [] }) {
    return (
        <Grid container spacing={1}>
            {data?.map((i, index) => (
                <Grid item xs={12 / 5} alignItems={'center'} justifyContent={'center'}>
                    <ItemPlaylist key={i.id} type="single" data={i} />
                </Grid>
            ))}
        </Grid>
    );
}

export default ListPlaylistColumn;
