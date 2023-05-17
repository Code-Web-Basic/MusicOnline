import { styled } from '@mui/system';
import { buttonClasses } from '@mui/base/Button';
import { Tab, TabPanel, Tabs, TabsList, tabClasses } from '@mui/base';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import ItemTabPlaylist from './ItemTabPlaylist';

const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
};

const StyledTab = styled(Tab)`
    font-family: IBM Plex Sans, sans-serif;
    color: white;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: bold;
    background-color: transparent;
    // width: 100%;
    padding: 6px;
    margin: 6px 6px;
    border: none;
    border-radius: 7px;
    display: flex;
    justify-content: center;

    &:hover {
        outline: 1px solid ${grey[700]};
    }

    &:focus {
        color: #fff;
    }

    &.${tabClasses.selected} {
        background-color: #9b4de0;
        color: #fff;
        &:hover {
            background-color: #c273ed;
        }
    }

    &.${buttonClasses.disabled} {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const StyledTabPanel = styled(TabPanel)`
    width: 100%;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
`;

const StyledTabsList = styled(TabsList)(
    ({ theme }) => `
    // min-width: 400px;
    border-radius: 12px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: start;
    align-content: space-between;
    // box-shadow: 0px 4px 8px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
    `,
);

function ListTabPlaylist({ title, data }) {
    const theme = useTheme();
    return (
        <Stack direction="column">
            <Stack direction="row" width="100%" justifyContent={'space-between'}>
                <Typography variant="h6" fontSize={'1.2rem'} color={theme.palette.common.white}>
                    {title}
                </Typography>
                <Typography variant="body2" fontSize="1.1rem" fontWeight="300" color={theme.palette.grey[500]}>
                    xem tất cả
                </Typography>
            </Stack>

            <Stack direction="row" width="100%" padding="10px">
                <Box sx={{ width: '100%' }}>
                    <Tabs defaultValue={1}>
                        <StyledTabsList>
                            <StyledTab value={1}>Tất cả</StyledTab>
                            <StyledTab value={2}>Việt Nam</StyledTab>
                            <StyledTab value={3}>Quốc tế</StyledTab>
                        </StyledTabsList>
                        <StyledTabPanel value={1}>
                            <ItemTabPlaylist />
                        </StyledTabPanel>
                        <StyledTabPanel value={2}>
                            <ItemTabPlaylist />
                        </StyledTabPanel>
                        <StyledTabPanel value={3}>
                            <ItemTabPlaylist />
                        </StyledTabPanel>
                    </Tabs>
                </Box>
            </Stack>
        </Stack>
    );
}

export default ListTabPlaylist;
