import { Box, Divider, Stack, Tab, Tabs, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import SearchResultAlbum from '~/layout/Publish/SearchContent/SearchResultAlbum';
import SearchResultAll from '~/layout/Publish/SearchContent/SearchResultAll';
import SearchResultMusic from '~/layout/Publish/SearchContent/SearchResultMusic';

function Search() {
    const theme = useTheme();
    const [valueSelectTab, setValueSelectTab] = useState(1);

    const handleChange = (event, newValue) => {
        setValueSelectTab(newValue);
    };
    const renderLayoutTab = () => {
        if (valueSelectTab === 1) {
            return <SearchResultAll />;
        } else if (valueSelectTab === 2) {
            return <SearchResultMusic />;
        } else if (valueSelectTab === 3) {
            return <SearchResultAlbum />;
        }
    };
    return (
        <Stack direction={'column'} height={'100%'} width={'100%'}>
            <Stack
                direction={'row'}
                width={'100%'}
                height={50}
                alignItems={'center'}
                borderBottom={'1px solid'}
                borderColor={theme.palette.grey[700]}
            >
                <Typography
                    variant="h6"
                    noWrap
                    textAlign={'center'}
                    justifyContent={'center'}
                    width={300}
                    color={theme.palette.common.white}
                >
                    Kết Quả Tìm Kiếm
                </Typography>
                <Divider orientation="vertical" flexItem sx={{ margin: '0px 10px' }} />
                <Box sx={{ width: '100%' }}>
                    <Tabs
                        value={valueSelectTab}
                        onChange={handleChange}
                        textColor="secondary"
                        indicatorColor="secondary"
                        aria-label="secondary tabs example"
                    >
                        <Tab value={1} label="Tất cả" />
                        <Tab value={2} label="Bài hát" />
                        <Tab value={3} label="playlist/album" />
                    </Tabs>
                </Box>
            </Stack>
            <Stack direction={'column'} width={'100%'} height={'auto'}>
                {renderLayoutTab()}
            </Stack>
        </Stack>
    );
}

export default Search;
