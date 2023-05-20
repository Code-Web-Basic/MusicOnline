import PropTypes from 'prop-types';
import { Box, Stack, Link, Card, Button, Divider, Typography, CardHeader, useTheme } from '@mui/material';

// import { faker } from '@faker-js/faker';
import Scrollbar from '~/layout/components/Publisher/scrollbar/Scrollbar';
import { fToNow } from '~/util/formatTime';
import { CaretRight, Chat, Headphones, Heart, PencilSimple } from 'phosphor-react';
import router from '~/config/Router';
import { useState } from 'react';

// @mui
function ListMusicNew({ title, subheader, list, ...other }) {
    return (
        <Card {...other}>
            <CardHeader title={title} subheader={subheader} />

            {/* <Scrollbar> */}
            <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
                {list.map((news) => (
                    <NewsItem key={news.id} news={news} />
                ))}
            </Stack>
            {/* </Scrollbar> */}

            <Divider />

            <Box sx={{ p: 2, textAlign: 'right' }}>
                <Link>
                    <Button size="small" color="inherit" endIcon={<CaretRight size={20} weight="fill" />}>
                        Go to content
                    </Button>
                </Link>
            </Box>
        </Card>
    );
}

export default ListMusicNew;

// ----------------------------------------------------------------------

NewsItem.propTypes = {
    news: PropTypes.shape({
        description: PropTypes.string,
        image: PropTypes.string,
        postedAt: PropTypes.instanceOf(Date),
        title: PropTypes.string,
    }),
};

function NewsItem({ news }) {
    const theme = useTheme();
    const { image, title, description, postedAt, numberListen, numberLike, numberComment } = news;
    const [hover, setHover] = useState(false);

    return (
        <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            position={'relative'}
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}
        >
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box
                    component="img"
                    alt={title}
                    src={image}
                    sx={{ position: 'relative', width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }}
                ></Box>
                {hover && (
                    <Box
                        sx={{ position: 'absolute', width: '100%', height: '100%' }}
                        alignItems={'center'}
                        justifyContent={'center'}
                        display={'flex'}
                    >
                        <PencilSimple size={20} weight="fill" color={theme.palette.common.white} />
                    </Box>
                )}
            </div>

            <Box sx={{ minWidth: 240, flexGrow: 1 }}>
                <Link color="inherit" variant="subtitle2" underline="hover" noWrap>
                    {title}
                </Link>

                <Stack direction={'row'} gap={'10px'} alignItems={'center'}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                        {description}
                    </Typography>
                    <Box sx={{ position: 'relative' }}>
                        <Stack direction={'row'} gap={'10px'}>
                            <Stack direction={'row'} gap={'5px'} alignItems={'center'}>
                                <Headphones size={15} weight="fill" />
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {numberListen}
                                </Typography>
                            </Stack>
                            <Stack direction={'row'} gap={'5px'} alignItems={'center'}>
                                <Chat size={15} weight="fill" />
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {numberComment}
                                </Typography>
                            </Stack>
                            <Stack direction={'row'} gap={'5px'} alignItems={'center'}>
                                <Heart size={15} weight="fill" />
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {numberLike}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Box>
            <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
                {fToNow(postedAt)}
            </Typography>
        </Stack>
    );
}
