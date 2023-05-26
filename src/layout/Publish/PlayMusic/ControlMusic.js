import { IconButton, Slider, Stack, Typography, styled, useTheme } from '@mui/material';
import { Pause, Play, Repeat, ShuffleAngular, SkipBack, SkipForward } from 'phosphor-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { formatDurationMusic } from '~/util/formatTime';

const TinyText = styled(Typography)({
    fontSize: '0.75rem',
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
});
function ControlMusic({ audioRef }) {
    const theme = useTheme();
    const [isPause, setIsPause] = useState(true);
    const [position, setPosition] = useState(0);
    const [isClickTime, setIsClickTime] = useState(false);
    // time music
    const [duration, setDuration] = useState(0);
    // ref audio

    const playAnimationRef = useRef();

    const repeat = useCallback(() => {
        const currentTime = audioRef.current.currentTime;
        setPosition(Math.floor(currentTime));
        // setPosition(Math.floor(currentTime));
        playAnimationRef.current = requestAnimationFrame(repeat);
    }, [audioRef]);
    useEffect(() => {
        // window.addEventListener('keydown', handleKeyDown);
        audioRef.current.addEventListener('loadedmetadata', onLoadedMetadata);
        // // cleanup this component
        return () => {
            // audioRef.current.removeEventListener('loadedmetadata', onloadedmetadata);
        };
    }, []);

    useEffect(() => {
        if (isPause) {
            audioRef.current.pause();
            cancelAnimationFrame(playAnimationRef.current);
        } else {
            audioRef.current.play();
            playAnimationRef.current = requestAnimationFrame(repeat);
        }
    }, [audioRef, isPause, repeat]);
    const delay = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };
    const handleProgressChange = async (e) => {
        const value = e.target.value;
        audioRef.current.currentTime = value;
    };
    const onLoadedMetadata = () => {
        const seconds = audioRef.current.duration;
        setDuration(seconds);
    };
    return (
        <Stack direction={'column'}>
            {/* control */}
            <Stack direction={'row'} justifyContent={'center'} gap={1}>
                <IconButton
                    sx={{
                        color: theme.palette.common.white,
                    }}
                >
                    <ShuffleAngular size={25} weight="fill" />
                </IconButton>
                <IconButton
                    sx={{
                        color: theme.palette.common.white,
                    }}
                >
                    <SkipBack size={25} weight="fill" />
                </IconButton>

                <IconButton
                    sx={{
                        border: '1px solid',
                        borderColor: theme.palette.common.white,
                        color: theme.palette.common.white,
                        '&:hover': {
                            color: theme.palette.secondary.main,
                            borderColor: theme.palette.secondary.main,
                        },
                    }}
                    onClick={() => setIsPause(!isPause)}
                >
                    {!isPause ? <Pause size={26} weight="fill" /> : <Play size={26} weight="fill" />}
                </IconButton>

                <IconButton
                    sx={{
                        color: theme.palette.common.white,
                    }}
                >
                    <SkipForward size={25} weight="fill" />
                </IconButton>
                <IconButton
                    sx={{
                        color: theme.palette.common.white,
                    }}
                >
                    <Repeat size={25} weight="fill" />
                </IconButton>
            </Stack>
            {/* time line */}
            <Stack direction={'row'} alignItems={'center'} gap={1} width={500}>
                <TinyText>{formatDurationMusic(position)}</TinyText>
                <Slider
                    aria-label="time-indicator"
                    size="small"
                    value={position}
                    min={0}
                    step={1}
                    max={duration}
                    onMouseDown={() => setIsClickTime(true)}
                    onMouseUp={() => setIsClickTime(false)}
                    // onChange={(e) => handcha}
                    onChange={(e) => handleProgressChange(e)}
                    sx={{
                        color: theme.palette.mode === 'light' ? '#fff' : 'rgba(0,0,0,0.87)',
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
                <TinyText>-{formatDurationMusic(duration - position)}</TinyText>
            </Stack>
        </Stack>
    );
}

export default ControlMusic;
