import { IconButton, Slider, Stack, Typography, styled, useTheme } from '@mui/material';
import { Pause, Play, Repeat, ShuffleAngular, SkipBack, SkipForward } from 'phosphor-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nextMusic, playRadomMusic, prevMusic } from '~/features/playlistCurrentSlice';
import { formatDurationMusic } from '~/util/formatTime';

const TinyText = styled(Typography)({
    fontSize: '0.75rem',
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
});
function ControlMusic({ audio, setIsRepeatMusic, isRepeatMusic }) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [isPause, setIsPause] = useState(true);
    const [position, setPosition] = useState(0);
    const [isRadom, setIsRadom] = useState(false);

    const currentPlaylist = useSelector((state) => state.playlistCurrent);
    // time music
    const [duration, setDuration] = useState(0);
    // ref audio

    const playAnimationRef = useRef();

    const repeat = useCallback(() => {
        const currentTime = audio?.current?.currentTime;
        setPosition(Math.floor(currentTime));
        // setPosition(Math.floor(currentTime));
        playAnimationRef.current = requestAnimationFrame(repeat);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPlaylist.currentIndex]);
    useEffect(() => {
        // window.addEventListener('keydown', handleKeyDown);
        audio?.current?.addEventListener('loadedmetadata', onLoadedMetadata);
        // // cleanup this component
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [audio]);

    useEffect(() => {
        if (isPause) {
            audio?.current?.pause();
            cancelAnimationFrame(playAnimationRef.current);
        } else {
            audio?.current?.play();
            playAnimationRef.current = requestAnimationFrame(repeat);
        }
    }, [audio, isPause, repeat]);

    const handleProgressChange = async (e) => {
        const value = e.target.value;
        audio.current.currentTime = value;
    };
    const onLoadedMetadata = () => {
        const seconds = audio?.current?.duration;
        setDuration(seconds);
    };
    // control
    const prevMusicPlaylist = () => {
        dispatch(prevMusic());
    };
    const nextMusicPlaylist = () => {
        if (isRadom) {
            dispatch(playRadomMusic());
        } else {
            dispatch(nextMusic());
        }
    };
    // end music

    return (
        <Stack direction={'column'}>
            {/* control */}
            <Stack direction={'row'} justifyContent={'center'} gap={1}>
                {/* button radom */}
                <IconButton
                    sx={{
                        color: isRadom ? theme.palette.secondary.main : theme.palette.common.white,
                    }}
                    onClick={() => setIsRadom((prev) => !prev)}
                >
                    <ShuffleAngular size={25} weight="fill" />
                </IconButton>
                {/* button prev */}
                <IconButton
                    sx={{
                        color: theme.palette.common.white,
                    }}
                    onClick={() => prevMusicPlaylist()}
                >
                    <SkipBack size={25} weight="fill" />
                </IconButton>
                {/* button pause */}
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
                {/* button next */}
                <IconButton
                    sx={{
                        color: theme.palette.common.white,
                    }}
                    onClick={() => nextMusicPlaylist()}
                >
                    <SkipForward size={25} weight="fill" />
                </IconButton>
                {/* button Repeat */}
                <IconButton
                    sx={{
                        color: isRepeatMusic ? theme.palette.secondary.main : theme.palette.common.white,
                    }}
                    onClick={() => setIsRepeatMusic((prev) => !prev)}
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
