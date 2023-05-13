import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import './styles.css';

// import required modules
import { Pagination } from 'swiper';
import { Box, Stack } from '@mui/material';
import images from '~/asset/images';

function Banner() {
    const data = [1, 2, 3, 4, 5, 6];
    return (
        <Stack
            direction="row"
            alignItems="center"
            width="100%"
            padding="10px"
            justifyContent="center"
            marginBottom="20px"
        >
            <Swiper
                slidesPerView={3}
                spaceBetween={50}
                // centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                className="mySwiper"
            >
                {data.map((item) => (
                    <SwiperSlide>
                        <ItemBanner data={item} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </Stack>
    );
}

export default Banner;

function ItemBanner(data) {
    return (
        <>
            <Box
                sx={{
                    // width: 400,
                    height: 200,
                    backgroundColor: 'primary.dark',
                    '&:hover': {
                        backgroundColor: 'primary.main',
                        opacity: [0.9, 0.8, 0.7],
                    },
                    borderRadius: '5px',
                    overflow: 'hidden',
                }}
            >
                <img
                    src={'https://photo-zmp3.zmdcdn.me/banner/0/0/8/2/0082e8fc2cba5a6e2da62c9d43690a08.jpg'}
                    alt="photoUser"
                    style={{ width: '100%', height: '100%', objectFit: 'fill' }}
                />
            </Box>
        </>
    );
}
