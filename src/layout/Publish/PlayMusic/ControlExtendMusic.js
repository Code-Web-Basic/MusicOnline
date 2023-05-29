import { Divider, IconButton, Slider, Stack, alpha, useTheme } from '@mui/material';
import { Playlist, SpeakerHigh, SpeakerSlash } from 'phosphor-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { togglePlaylistPlayOpen } from '~/features/layoutSlice';

function ControlExtendMusic({ audio }) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const playlistPlayOpen = useSelector((state) => state.layout.playlistPlayOpen);
    const [volume, setVolume] = useState(1);
    function handleVolumeChange(event) {
        audio.volume = volume;
        setVolume(event.target.value);
    }

    function handleClickVolume() {
        if (volume > 0) {
            setVolume(0);
            audio.volume = 0;
        } else {
            setVolume(1);
            audio.volume = 1;
        }
    }
    const handleOpenPlaylistPlay = () => {
        dispatch(togglePlaylistPlayOpen(!playlistPlayOpen));
    };

    return (
        <Stack direction={'row'} gap={'10px'} alignItems={'center'}>
            <Stack direction="row" sx={{ mb: 1, px: 1 }} alignItems="center" width={200} gap={1}>
                <IconButton onClick={handleClickVolume} sx={{ color: theme.palette.text.primary }}>
                    {volume > 0 ? <SpeakerHigh size={20} weight="fill" /> : <SpeakerSlash size={20} weight="fill" />}
                </IconButton>

                <Slider
                    value={volume}
                    onChange={handleVolumeChange}
                    aria-label="Volume"
                    // defaultValue={30}
                    min={0}
                    step={0.1}
                    max={1}
                    sx={{
                        color: theme.palette.mode === 'light' ? '#fff' : 'rgba(0,0,0,0.87)',
                        '& .MuiSlider-track': {
                            border: 'none',
                        },
                        '& .MuiSlider-thumb': {
                            width: 10,
                            height: 10,
                            backgroundColor: '#fff',
                            '&:before': {
                                boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                            },
                            '&:hover, &.Mui-focusVisible, &.Mui-active': {
                                boxShadow: 'none',
                            },
                        },
                    }}
                />
            </Stack>
            <Divider orientation="vertical" sx={{ height: '50%' }} />
            <Stack direction={'row'}>
                <IconButton
                    sx={{
                        borderRadius: '5px',
                        color: theme.palette.text.primary,
                        backgroundColor: !playlistPlayOpen
                            ? alpha(theme.palette.grey[700], 0.2)
                            : theme.palette.secondary.main,
                        '&:hover': {
                            backgroundColor: !playlistPlayOpen
                                ? alpha(theme.palette.grey[600], 0.2)
                                : alpha(theme.palette.secondary.main, 0.8),
                        },
                    }}
                    onClick={handleOpenPlaylistPlay}
                >
                    <Playlist size={20} weight="fill" />
                </IconButton>
            </Stack>
        </Stack>
    );
}
export default ControlExtendMusic;
