// component

import { ChartLineUp, ChatText, Copyleft, Layout, Money, MusicNotes, User } from 'phosphor-react';
import SvgColor from '../../components/Publisher/svg-color/SvgColor';
import routerConfig from '~/config/Router';
import { configRouter } from '~/config';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
    {
        title: 'Dashboard',
        path: configRouter.dashboard,
        icon: <Layout size={20} weight="fill" />,
    },
    {
        title: 'Content',
        path: routerConfig.content,
        icon: <MusicNotes size={20} weight="fill" />,
    },
    {
        title: 'Analytics',
        path: routerConfig.analytics,
        icon: <ChartLineUp size={20} weight="fill" />,
    },
    {
        title: 'Comment',
        path: routerConfig.comment,
        icon: <ChatText size={20} weight="fill" />,
    },

    {
        title: 'Account',
        path: routerConfig.accountPublisher,
        icon: <User size={20} weight="fill" />,
    },
    {
        title: 'Earn',
        path: routerConfig.earn,
        icon: <Money size={20} weight="fill" />,
    },
    {
        title: 'Copyright',
        path: routerConfig.copyright,
        icon: <Copyleft size={20} weight="fill" />,
    },
];

export default navConfig;
