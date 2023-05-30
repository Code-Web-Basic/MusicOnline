// component

import { House, Users,MusicNotesPlus} from 'phosphor-react';
import routerConfig from '~/config/Router';
import { configRouter } from '~/config';

// ----------------------------------------------------------------------



const navConfig = [

    {
        title: 'Quản Lý Người Dùng',
        path: configRouter.managerUser,
        icon: <Users size={20} />,
    },
    {
        title: 'Quản Lý Danh Sách Nhạc',
        path: configRouter.managerListMusic,
        icon: <MusicNotesPlus size={20} />,
    }, 


];

export default navConfig;
