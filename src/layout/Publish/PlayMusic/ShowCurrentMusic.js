import { Box, Checkbox, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import { Heart } from 'phosphor-react';
import { useSelector } from 'react-redux';
import images from '~/asset/images';
import { MoreButtonMusic } from '~/components/MoreButtonMusic/MoreButtonMusic';

function ShowCurrentMusic({ data }) {
    const theme = useTheme();
    const currentPlaylist = useSelector((state) => state.playlistCurrent);
    return (
        <Stack direction={'row'} gap={'10px'} alignItems={'center'}>
            <Stack direction={'row'}>
                <Box sx={{ width: 60, height: 60, borderRadius: '10px', overflow: 'hidden' }}>
                    <img
                        src={
                            currentPlaylist.ListMusic[currentPlaylist.currentIndex]?.thumbnail
                                ? currentPlaylist.ListMusic[currentPlaylist.currentIndex]?.thumbnail
                                : images.noImageMusic
                        }
                        alt="img"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </Box>
            </Stack>

            <Stack direction={'column'} maxWidth={300}>
                <Typography color="white" variant="h6" noWrap>
                    {currentPlaylist.ListMusic[currentPlaylist.currentIndex]?.name
                        ? currentPlaylist.ListMusic[currentPlaylist.currentIndex]?.name
                        : 'chưa có nhạc trong danh sách'}
                </Typography>
                <Typography
                    color={theme.palette.text.secondary}
                    variant="body2"
                    noWrap
                    sx={{
                        '&:hover': {
                            color: theme.palette.secondary.main,
                            textDecoration: 'underline',
                        },
                    }}
                >
                    {currentPlaylist.ListMusic[currentPlaylist.currentIndex]?.singer?.map((i, index) =>
                        currentPlaylist.ListMusic[currentPlaylist.currentIndex]?.singer?.length - 1 === index
                            ? `${i}`
                            : `${i},`,
                    )}
                </Typography>
            </Stack>
            <Stack direction={'row'} marginLeft={'10px'}>
                <Stack direction={'row'} gap={1}>
                    <Tooltip title="Yêu thích">
                        <Checkbox
                            icon={<Heart size={18} color={theme.palette.grey[300]} />}
                            checkedIcon={<Heart size={18} weight="fill" color={theme.palette.secondary.main} />}
                        />
                    </Tooltip>
                    <MoreButtonMusic />
                </Stack>
            </Stack>
        </Stack>
    );
}

export default ShowCurrentMusic;
