import { useState } from 'react';
// mui
import { LoadingButton } from '@mui/lab';
import {
    Alert,
    Box,
    Button,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Snackbar,
    Stack,
    Typography,
    useTheme,
} from '@mui/material';
import { GithubLogo } from 'phosphor-react';
// component
import images from '~/asset/images';
import { useNavigate } from 'react-router-dom';
function Signup() {
    const theme = useTheme()
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [open, setOpen] = useState(false)
    const [messageError, setMessageError] = useState([])
    const navigate = useNavigate();
    const handleSignUp = async (e) => {
        e.preventDefault();
        const newUser = {
            email: email,
            password: password,
            name: name,
            username: username,
            phone: phone
        };
        if (email === '' || phone === '' || name === '' || username === '' || password === '' || confirmPassword === '') {
            setOpen(true)
            setMessageError([...messageError, 'Please fill out all fields'])
        }
        else {
            if (password === confirmPassword) {
                console.log(newUser)
                navigate('login')
            }
            else {
                setOpen(true)
                setMessageError([...messageError, 'Password not confirm'])
            }
        }
    }
    const handleClose = () => {
        setOpen(false);
    };
    return <Grid container width="100%" height={'100vh'}>
        <Grid item xs={6} height="100%" alignItems="center" justifyContent="center">
            <Stack direction={'column'} p={2} height="100%" width="100%" spacing={2}>
                <Stack direction={'column'} alignItems="center" justifyContent={'center'} spacing={2} flex="1">
                    {/* title */}
                    <Typography variant="h4">Welcome My Website</Typography>
                    {/* input login */}
                    <Stack direction={'column'} spacing={1.5} alignItems="center">
                        <FormControl sx={{ m: 1, width: '400px' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-email" >Email</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email"
                                type="email"
                                label="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: '400px' }} variant="outlined">
                            <InputLabel>Name</InputLabel>
                            <OutlinedInput
                                type="text"
                                label="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: '400px' }} variant="outlined">
                            <InputLabel >User name</InputLabel>
                            <OutlinedInput
                                type="text"
                                label="User name"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: '400px' }} variant="outlined">
                            <InputLabel >Phone</InputLabel>
                            <OutlinedInput
                                type="text"
                                label="Phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: '400px' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            edge="end"
                                        >
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: '400px' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                            <OutlinedInput
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            edge="end"
                                        >
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Confirm Password"
                                type='password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </FormControl>
                    </Stack>
                    {/* button login */}
                    <LoadingButton
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
                        onClick={handleSignUp}
                    >
                        Sign up
                    </LoadingButton>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
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
                            Or Login With
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
                    {/* button login */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 2,
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
                            startIcon={<GithubLogo size={20} />}
                        >
                            Github
                        </Button>
                    </Box>
                </Stack>
            </Stack>
        </Grid>
        <div className='test'>
            {messageError.map((e) => (
                <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                    <Alert variant="filled" severity="error" sx={{ width: '100%' }}>
                        {e}
                    </Alert>
                </Snackbar>))}
        </div>
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
    </Grid>;
}

export default Signup;