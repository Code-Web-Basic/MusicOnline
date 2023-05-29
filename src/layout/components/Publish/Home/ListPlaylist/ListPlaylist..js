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
            {data.length > 0 ? (
                <Stack direction="row" width="100%" padding="10px">
                    <Swiper
                        slidesPerView={slidesPerView}
                        spaceBetween={25 - slidesPerView}
                        scrollbar={{
                            hide: true,
                        }}
                        modules={[Scrollbar]}
                        className="mySwiper"
                        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        {data.map((item) => (
                            <SwiperSlide key={item.id}>
                                <ItemPlaylist data={item} size={size} type={type} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Stack>
            ) : (
                <Typography width={'100%'} textAlign={'center'} variant="h6">
                    không có playlist
                </Typography>
            )}
        </Stack>
    );
}

export default ListPlaylist;
ListPlaylist.prototype = {
    title: PropTypes.string,
    data: PropTypes.array,
    width: PropTypes.number,
};
