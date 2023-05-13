import React, { useRef, useState } from 'react';
import { Stack, Typography, useTheme } from '@mui/material';
import ItemPlaylist from '../ItemPlaylist/ItemPlaylist';
import PropTypes from 'prop-types';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';

// import './styles.css';

// import required modules
import { Scrollbar } from 'swiper';

function ListPlaylist({ title, data = [], size = 'small', type = 'playlist' }) {
    const theme = useTheme();
    let slidesPerView;

    if (size === 'large') {
        slidesPerView = 5;
    } else if (size === 'medium') {
        slidesPerView = 6;
    } else {
        slidesPerView = 9;
    }
    return (
        <Stack direction="column" width="100%" margin="30px 0px">
            <Stack direction="row" width="100%" justifyContent={'space-between'}>
                <Typography variant="h6" fontSize={'1.2rem'} color={theme.palette.common.white}>
                    {title}
                </Typography>
                <Typography variant="body2" fontSize="1.1rem" fontWeight="300" color={theme.palette.grey[500]}>
                    xem tất cả
                </Typography>
            </Stack>

            <Stack direction="row" width="100%" padding="10px">
                <Swiper
                    slidesPerView={slidesPerView}
                    spaceBetween={25 - slidesPerView}
                    scrollbar={{
                        hide: true,
                    }}
                    modules={[Scrollbar]}
                    className="mySwiper"
                >
                    {data.map((item) => (
                        <SwiperSlide>
                            <ItemPlaylist data={item} size={size} type={type} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Stack>
        </Stack>
    );
}

export default ListPlaylist;
ListPlaylist.prototype = {
    title: PropTypes.string,
    data: PropTypes.array,
    width: PropTypes.number,
};
