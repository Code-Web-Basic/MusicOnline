import { Stack } from '@mui/material';
import ItemListMusic from './ItemListMusic';
import PropTypes from 'prop-types';

ListMusic.prototype = {
    data: PropTypes.array,
};
function ListMusic({ data = [] }) {
    return (
        <Stack direction={'column'} width={'100%'}>
            {data?.map((item, index) => (
                <ItemListMusic key={item.id} data={item} index={index} />
            ))}
        </Stack>
    );
}

export default ListMusic;
