import { useState } from 'react';
// mui
import { LoadingButton } from '@mui/lab';
import {
    Box,
    Button,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    styled,
    Switch,
    Typography,
    useTheme,
} from '@mui/material';
import { Eye, EyeSlash } from 'phosphor-react';
// redux
import images from '~/asset/images';

const IOSSwitch = styled((props) => <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />)(
    ({ theme }) => ({
        width: 42,
        height: 26,
        padding: 0,
        '& .MuiSwitch-switchBase': {
            padding: 0,
            margin: 2,
            transitionDuration: '300ms',
            '&.Mui-checked': {
                transform: 'translateX(16px)',
                color: '#fff',
                '& + .MuiSwitch-track': {
                    backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                    opacity: 1,
                    border: 0,
                },
                '&.Mui-disabled + .MuiSwitch-track': {
                    opacity: 0.5,
                },
            },
            '&.Mui-focusVisible .MuiSwitch-thumb': {
                color: '#33cf4d',
                border: '6px solid #fff',
            },
            '&.Mui-disabled .MuiSwitch-thumb': {
                color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
            },
        },
        '& .MuiSwitch-thumb': {
            boxSizing: 'border-box',
            width: 22,
            height: 22,
        },
        '& .MuiSwitch-track': {
            borderRadius: 26 / 2,
            backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
            opacity: 1,
            transition: theme.transitions.create(['background-color'], {
                duration: 500,
            }),
        },
    }),
);
function Login() {
    const theme = useTheme();
    // data
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickButtonSignIn = async () => {
        console.log("login")
    };
    return (
        <>
            <Grid container width="100%" height={'100vh'}>
                <Grid item xs={6} height="100%" alignItems="center" justifyContent="center">
                    <Stack direction={'column'} p={2} height="100%" width="100%" spacing={2}>
                        <Stack direction={'row'} alignItems="center" justifyContent={'space-between'}>
                            <Box height={50}>
                                <img
                                    src={images.logo}
                                    alt=""
                                    width={'100%'}
                                    height={'100%'}
                                    style={{ objectFit: 'cover' }}
                                ></img>
                            </Box>
                            <Box display={'flex'} gap={'10px'}>
                                <Typography variant="h4" fontSize="1rem">
                                    Don’t have an account?
                                </Typography>
                                <Typography
                                    fontSize="1rem"
                                    variant="h4"
                                    sx={{ color: theme.palette.primary.main }}
                                >
                                    Sign up!
                                </Typography>
                            </Box>
                        </Stack>
                        <Stack direction={'column'} alignItems="center" justifyContent={'center'} spacing={2} flex="1">
                            <Typography variant="h4">Welcome Back</Typography>
                            <Typography variant="h5" sx={{ fontSize: '1rem', fontWeight: 500 }}>
                                Login into your account
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: 2,
                                    paddingTop: '30px',
                                }}
                            >
                                <Button
                                    variant="outlined"
                                    sx={{
                                        height: 44,
                                        width: 126,
                                        borderRadius: 2,
                                        color: theme.palette.text.secondary,
                                        borderColor: theme.palette.text.secondary,
                                        '&:hover': {
                                            color: theme.palette.text.secondary,
                                        },
                                    }}
                                    startIcon={<img src={images.googleIcon} alt="google"></img>}
                                >
                                    Google
                                </Button>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '20px 10px',
                                    gap: '10px',
                                }}
                            >
                                <Box
                                    sx={{
                                        width: '130px',
                                        height: '0.5px',
                                        backgroundColor: theme.palette.text.disabled,
                                        opacity: 0.5,
                                    }}
                                ></Box>
                                <Typography variant="h6" fontSize={'1rem'}>
                                    Or continue with
                                </Typography>
                                <Box
                                    sx={{
                                        width: '130px',
                                        height: '0.5px',
                                        backgroundColor: theme.palette.text.disabled,
                                        opacity: 0.5,
                                    }}
                                ></Box>
                            </Box>
                            <Stack direction={'column'} spacing={3} alignItems="center">
                                <FormControl sx={{ m: 1, width: '400px' }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-email">email</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-email"
                                        type="email"
                                        label="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </FormControl>
                                <FormControl sx={{ m: 1, width: '400px' }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? (
                                                        <Eye size={20} weight="light" />
                                                    ) : (
                                                        <EyeSlash size={20} weight="light" />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                </FormControl>
                            </Stack>
                            <Stack
                                direction={'row'}
                                alignItems="center"
                                justifyContent={'space-between'}
                                padding="10px 0px"
                                width={400}
                            >
                                <Stack direction={'row'} alignItems="center" spacing={2}>
                                    <IOSSwitch />
                                    <Typography variant="body1">Remember me</Typography>
                                </Stack>
                                <Stack direction={'row'} alignItems="center" fontSize="0.8rem">
                                    Recover Password
                                </Stack>
                            </Stack>
                            <LoadingButton
                                onClick={handleClickButtonSignIn}
                                // loading={loading}
                                loadingPosition="center"
                                variant="outlined"
                                sx={{
                                    height: 55,
                                    width: 400,
                                    borderRadius: 2,
                                    color: theme.palette.text.secondary,
                                    borderColor: theme.palette.text.secondary,
                                    '&:hover': {
                                        color: theme.palette.text.secondary,
                                    },
                                }}
                            >
                                Log In
                            </LoadingButton>
                        </Stack>
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    <Stack
                        direction={'column'}
                        p={2}
                        width="100%"
                        height="100%"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Stack
                            direction={'row'}
                            alignItems="center"
                            justifyContent={'center'}
                            position="relative"
                            width="100%"
                            height="100%"
                        >
                            <img
                                src={images.loginBackground}
                                alt="background"
                                style={{
                                    position: 'absolute',
                                    height: '100%',
                                    width: '100%',
                                    objectFit: 'cover',
                                    transform: 'translateX(-10%)',
                                }}
                            />
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>
        </>
    );
}

export default Login;
