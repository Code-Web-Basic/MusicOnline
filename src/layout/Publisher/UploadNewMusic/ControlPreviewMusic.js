import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { Pause, Play, SpeakerSimpleLow, SpeakerSimpleNone } from 'phosphor-react';
import { Card } from '@mui/material';
import { formatDurationMusic } from '~/util/formatTime';

const WallPaper = styled('div')({
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    overflow: 'hidden',
    background: 'linear-gradient(rgb(255, 38, 142) 0%, rgb(255, 105, 79) 100%)',
    transition: 'all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s',
    '&:before': {
        content: '""',
        width: '140%',
        height: '140%',
        position: 'absolute',
        top: '-40%',
        right: '-50%',
        background: 'radial-gradient(at center center, rgb(62, 79, 249) 0%, rgba(62, 79, 249, 0) 64%)',
    },
    '&:after': {
        content: '""',
        width: '140%',
        height: '140%',
        position: 'absolute',
        bottom: '-50%',
        left: '-30%',
        background: 'radial-gradient(at center center, rgb(247, 237, 225) 0%, rgba(247, 237, 225, 0) 70%)',
        transform: 'rotate(30deg)',
    },
});

const Widget = styled('div')(({ theme }) => ({
    padding: 16,
    borderRadius: 16,
    width: 343,
    maxWidth: '100%',
    margin: 'auto',
    position: 'relative',
    zIndex: 1,
    backgroundColor: theme.palette.mode === 'drank' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)',
    backdropFilter: 'blur(40px)',
}));

const CoverImage = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,

    overflow: 'hidden',
    flexShrink: 0,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.08)',
    '& > img': {
        width: '100%',
        objectFit: 'cover',
    },
});

const TinyText = styled(Typography)({
    fontSize: '0.75rem',
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
});

export default function ControlPreviewMusic({ thumbnail, title = '', single = [], files }) {
    const theme = useTheme();
    // const duration = 200; // seconds
    const [volume, setVolume] = React.useState(1);

    const [paused, setPaused] = React.useState(true);
    // current time
    const [position, setPosition] = React.useState(0);
    // time music
    const [duration, setDuration] = React.useState(0);
    // ref audio
    const audioRef = React.useRef(files ? new Audio(URL.createObjectURL(files)) : null);

    // const handleVolumeChange = ()=>{

    function handleVolumeChange(event) {
        audioRef.current.volume = volume;
        setVolume(event.target.value);
    }

    const playAnimationRef = React.useRef();

    const repeat = React.useCallback(() => {
        const currentTime = audioRef.current.currentTime;
        setPosition(Math.floor(currentTime));
        playAnimationRef.current = requestAnimationFrame(repeat);
    }, [audioRef]);
    React.useEffect(() => {
        // window.addEventListener('keydown', handleKeyDown);
        audioRef.current.addEventListener('loadedmetadata', onLoadedMetadata);
        // // cleanup this component
        return () => {
            // audioRef.current.removeEventListener('loadedmetadata', onloadedmetadata);
        };
    }, []);

    React.useEffect(() => {
        if (paused) {
            audioRef.current.pause();
            cancelAnimationFrame(playAnimationRef.current);
        } else {
            audioRef.current.play();
            playAnimationRef.current = requestAnimationFrame(repeat);
        }
    }, [paused, repeat]);

    React.useEffect(() => {}, [volume]);
    const delay = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };
    const handleProgressChange = async (e) => {
        const value = e.target.value;
        console.log(value);
        await delay(1000);

        audioRef.current.currentTime = value;
    };
    const onLoadedMetadata = () => {
        const seconds = audioRef.current.duration;
        setDuration(seconds);
    };
    return (
        <Card sx={{ width: '100%', overflow: 'hidden' }}>
            <Widget>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CoverImage>
                        <img
                            alt="can't win - Chilling Sunday"
                            src={
                                thumbnail !== null
                                    ? URL.createObjectURL(thumbnail)
                                    : 'https://3.bp.blogspot.com/-6SvaeQvNYU8/Tw8IrLBRZYI/AAAAAAAABP4/5vrnRLQ41jI/s1600/music-backgrounds-6.jpg'
                            }
                        />
                    </CoverImage>
                    <Box sx={{ ml: 1.5, minWidth: 0 }}>
                        {/* <Typography variant="caption" color="text.secondary" fontWeight={500}>
                            Jun Pulse
                        </Typography> */}
                        <Typography noWrap>{title !== '' ? title : 'Tên bài hát chưa cập nhật'}</Typography>
                        <Typography noWrap letterSpacing={-0.25}>
                            {single.length > 0 ? single : 'Tên ca sĩ chưa cập nhật'}
                        </Typography>
                    </Box>
                </Box>
                {/* time music */}
                <Slider
                    aria-label="time-indicator"
                    size="small"
                    value={position}
                    min={0}
                    step={1}
                    max={duration}
                    // onChange={(e) => handcha}
                    onChange={(e) => handleProgressChange(e)}
                    sx={{
                        color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                        height: 4,
                        '& .MuiSlider-thumb': {
                            width: 8,
                            height: 8,
                            transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                            '&:before': {
                                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                            },
                            '&:hover, &.Mui-focusVisible': {
                                boxShadow: `0px 0px 0px 8px ${
                                    theme.palette.mode === 'dark' ? 'rgb(255 255 255 / 16%)' : 'rgb(0 0 0 / 16%)'
                                }`,
                            },
                            '&.Mui-active': {
                                width: 20,
                                height: 20,
                            },
                        },
                        '& .MuiSlider-rail': {
                            opacity: 0.28,
                        },
                    }}
                />
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mt: -2,
                    }}
                >
                    <TinyText>{formatDurationMusic(position)}</TinyText>
                    <TinyText>-{formatDurationMusic(duration - position)}</TinyText>
                </Box>
                {/* control play music */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mt: -1,
                    }}
                >
                    {/* <IconButton aria-label="previous song">
                        <FastRewindRounded fontSize="large" htmlColor={mainIconColor} />
                    </IconButton> */}
                    <IconButton aria-label={paused ? 'play' : 'pause'} onClick={() => setPaused(!paused)}>
                        {paused ? <Play size={20} weight="fill" /> : <Pause size={20} weight="fill" />}
                    </IconButton>
                    {/* <IconButton aria-label="next song">
                        <FastForwardRounded fontSize="large" htmlColor={mainIconColor} />
                    </IconButton> */}
                </Box>
                <Stack spacing={2} direction="row" sx={{ mb: 1, px: 1 }} alignItems="center">
                    <SpeakerSimpleNone size={20} weight="fill" />
                    <Slider
                        value={volume}
                        onChange={handleVolumeChange}
                        aria-label="Volume"
                        // defaultValue={30}
                        min={0}
                        step={0.1}
                        max={1}
                        sx={{
                            color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                            '& .MuiSlider-track': {
                                border: 'none',
                            },
                            '& .MuiSlider-thumb': {
                                width: 24,
                                height: 24,
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
                    <SpeakerSimpleLow size={20} weight="fill" />
                </Stack>
            </Widget>
            {/* <WallPaper /> */}
        </Card>
    );
}
