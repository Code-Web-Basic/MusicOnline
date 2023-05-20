import { Box, Tab, Tabs, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import TableDataContent from './TableDataContent';
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `content-tab-${index}`,
        'aria-controls': `content-tabpanel-${index}`,
    };
}
function TabListContent() {
    const theme = useTheme();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Music" {...a11yProps(0)} sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                    <Tab label="Album" {...a11yProps(1)} sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                    <Tab label="Single" {...a11yProps(2)} sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <TableDataContent />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <TableDataContent />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <TableDataContent />
            </TabPanel>
        </Box>
    );
}

export default TabListContent;
