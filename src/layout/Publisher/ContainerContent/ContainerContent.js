import { Stack, Typography, useTheme } from '@mui/material';
import TabListContent from './TabListContent';
import { Button } from '@mui/material';
import { UploadSimple } from 'phosphor-react';

function ContainerContent() {
    const theme = useTheme();
    return (
        <Stack direction={'column'} width="100%" padding={2}>
            <Stack direction={'row'} paddingLeft={2} paddingRight={2} justifyContent={'space-between'}>
                <Typography
                    variant="h5"
                    fontSize={'1.2rem'}
                    fontWeight={700}
                    color={theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white}
                >
                    Content Music
                </Typography>
                <Button size="large" variant="contained" startIcon={<UploadSimple size={20} weight="fill" />}>
                    upload new music
                </Button>
            </Stack>
            <Stack direction={'row'} padding={2}>
                <TabListContent />
            </Stack>
        </Stack>
    );
}

export default ContainerContent;
