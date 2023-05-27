import { faker } from '@faker-js/faker';
import {
    Box,
    Checkbox,
    IconButton,
    ListItemIcon,
    MenuItem,
    Paper,
    Stack,
    Tooltip,
    Typography,
    useTheme,
} from '@mui/material';
import Tippy from '@tippyjs/react/headless';
import { DotsThree, Heart, Link as LinkIcon, PlusCircle, Share } from 'phosphor-react';

const MENU_OPTIONS = [
    {
        label: 'Thêm vào playlist',
        icon: <PlusCircle size={20} />,
    },
    {
        label: 'Sao chép link',
        icon: <LinkIcon size={20} />,
    },
    {
        label: 'Chia sẽ',
        icon: <Share size={20} />,
    },
];

function ShowCurrentMusic({ data }) {
    const theme = useTheme();
    return (
        <Stack direction={'row'} gap={'10px'} alignItems={'center'}>
            <Stack direction={'row'}>
                <Box sx={{ width: 60, height: 60, borderRadius: '10px', overflow: 'hidden' }}>
                    <img
                        src="https://th.bing.com/th/id/R.60e788ded4d8885f7e5dbfeacc425168?rik=3yBVfG3N7ZPS9Q&pid=ImgRaw&r=0"
                        alt="img"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </Box>
            </Stack>

            <Stack direction={'column'} maxWidth={100}>
                <Typography color="white" variant="h6" noWrap>
                    Tên bài nhạc
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
                    Ten ca si
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
                    <MoreButton />
                </Stack>
            </Stack>
        </Stack>
    );
}

export default ShowCurrentMusic;

function MoreButton() {
    const theme = useTheme();
    return (
        <>
            <Tippy
                interactive
                trigger="click"
                placement="top-end"
                render={(attrs) => (
                    <div className="box" tabIndex="-1" {...attrs}>
                        <Paper sx={{ background: '#34224f', padding: '1px', minWidth: 200 }}>
                            <Box sx={{ my: 1.5, px: 2.5 }}>
                                <Stack direction={'row'} gap={'8px'} alignItems={'center'}>
                                    <Box
                                        sx={{
                                            width: 32,
                                            height: 32,
                                            borderRadius: '10px',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        <img
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            src={faker.image.avatarLegacy()}
                                            alt="userui"
                                        />
                                    </Box>
                                    <Stack direction={'column'} maxWidth={150} overflow={'hidden'}>
                                        <Typography
                                            variant="subtitle2"
                                            fontSize={'0.8rem'}
                                            noWrap
                                            sx={{ color: theme.palette.grey[400] }}
                                            textOverflow={'ellipsis'}
                                        >
                                            Dù Khóc Một Dòng Sông
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            fontSize={'0.5rem'}
                                            sx={{ color: theme.palette.grey[400] }}
                                            noWrap
                                        >
                                            Mai Tiến Dũng
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </Box>
                            <Stack sx={{ p: '4px' }}>
                                {MENU_OPTIONS.map((option) => (
                                    <MenuItem
                                        key={option.label}
                                        // onClick={handleClose}
                                        sx={{ color: theme.palette.grey[400] }}
                                    >
                                        <ListItemIcon sx={{ color: theme.palette.grey[400] }}>
                                            {option.icon}
                                        </ListItemIcon>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Stack>

                            {/* <MenuItem onClick={handleLogout} sx={{ m: 1, color: theme.palette.grey[400] }}>
                            <ListItemIcon sx={{ m: 1, color: theme.palette.grey[400] }}>
                                <SignOut size={20} weight="fill" />
                            </ListItemIcon>
                            Logout
                        </MenuItem> */}
                        </Paper>
                    </div>
                )}
            >
                <Tooltip title="khac">
                    <IconButton
                        sx={{
                            '&:hover': {
                                background: theme.palette.grey[800],
                            },
                        }}
                    >
                        <DotsThree size={18} weight="bold" color={theme.palette.common.white} />
                    </IconButton>
                </Tooltip>
            </Tippy>
        </>
    );
}
