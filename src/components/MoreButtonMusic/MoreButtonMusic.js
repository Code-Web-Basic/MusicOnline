import { faker } from '@faker-js/faker';
import { Box, IconButton, ListItemIcon, MenuItem, Paper, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import Tippy from '@tippyjs/react/headless';
import { ChatCircle, DotsThree, Link as LinkIcon, PlusCircle, Share } from 'phosphor-react';
import Comment from '~/layout/components/Publish/Comment/Comment';

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
export function MoreButtonMusic() {
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
                                <Comment>
                                    <MenuItem
                                        // onClick={handleClose}
                                        sx={{ color: theme.palette.grey[400] }}
                                    >
                                        <ListItemIcon sx={{ color: theme.palette.grey[400] }}>
                                            <ChatCircle size={20} weight="regular" />
                                        </ListItemIcon>
                                        Bình luận
                                    </MenuItem>
                                </Comment>

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
