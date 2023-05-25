import { Stack } from '@mui/material';
import SettingPopover from './SettingPopover';
import AccountPopover from './AccountPopover';

function ControlAction() {
    return (
        <Stack direction={'row'} gap={'30px'}>
            <SettingPopover />
            <AccountPopover />
        </Stack>
    );
}

export default ControlAction;
