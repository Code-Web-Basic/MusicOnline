import { IconButton, Tooltip } from '@mui/material';
import { Gear } from 'phosphor-react';

function SettingPopover() {
    return (
        <div>
            <Tooltip title="cài đặt">
                <IconButton>
                    <Gear size={25} weight="fill" />
                </IconButton>
            </Tooltip>
        </div>
    );
}

export default SettingPopover;
