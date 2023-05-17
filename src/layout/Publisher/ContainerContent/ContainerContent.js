import { Stack, Typography, useTheme } from '@mui/material';
import TabListContent from './TabListContent';

function ContainerContent() {
    const theme = useTheme();
    return (
        <Stack direction={'column'} width="100%" padding={2}>
            <Stack direction={'row'} paddingLeft={2} paddingRight={2}>
                <Typography variant="h5" fontSize={'1.2rem'} fontWeight={700} color={theme.palette.common.white}>
                    Content Music
                </Typography>
            </Stack>
            <Stack direction={'row'} padding={2}>
                <TabListContent />
            </Stack>
        </Stack>
    );
}

export default ContainerContent;
