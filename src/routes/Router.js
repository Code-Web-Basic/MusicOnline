// Layouts

// Pages
import { configRouter } from '~/config';

import Home from '~/pages/Publish/Home';
import Login from '~/pages/Publish/Login';
import DetailPlaylist from '~/layout/components/Publish/DetailPlaylist/DetailPlaylist';
import Type from '~/pages/Publish/Type/Type';
import Content from '~/pages/Publisher/Content/Content';
import Library from '~/pages/Publish/Library/Library';
import Signup from '~/pages/Publish/Signup/Signup';

import MyPlayList from '~/pages/Publish/MyPlayList/MyPlayList';
import Dashboard from '~/pages/Publisher/Dashboard/Dashboard';
import Copyright from '~/pages/Publisher/Copyright/Copyright';
import Analytics from '~/pages/Publisher/Analytics/Analytics';
import Earn from '~/pages/Publisher/Earn/Earn';
import Account from '~/pages/Publisher/Account/Account';
import Comment from '~/pages/Publisher/Comment/Comment';
// layout
import DefaultLayoutAdmin from '~/layout/Admin';
import DefaultLayoutPublisher from '~/layout/Publisher';
import ZingRank from '~/pages/Publish/ZingRank/ZingRank';
import Profile from '~/pages/Publish/Profile/Profile';
import ResetPass from '~/pages/Publish/Resetpass/Resetpass';
// Public routes
const publicRoutes = [
    { path: configRouter.Home, component: Home },
    { path: configRouter.Login, component: Login, layout: null },
    { path: configRouter.Signup, component: Signup, layout: null },
    { path: configRouter.ResetPass, component: ResetPass, layout: null },
    { path: configRouter.ZingChart, component: ZingRank },
    { path: configRouter.Library, component: Library },
    { path: configRouter.Favorite, component: MyPlayList },
    { path: configRouter.DetailPlaylist, component: DetailPlaylist },
    { path: configRouter.Profile, component: Profile, layout: null },
];
const publisherRoutes = [
    { path: configRouter.dashboard, component: Dashboard, layout: DefaultLayoutPublisher },
    { path: configRouter.Login, component: Login, layout: null },
    { path: configRouter.Signup, component: Signup, layout: null },
    { path: configRouter.ResetPass, component: ResetPass, layout: null },
    { path: configRouter.content, component: Content, layout: DefaultLayoutPublisher },
    { path: configRouter.analytics, component: Analytics, layout: DefaultLayoutPublisher },
    { path: configRouter.comment, component: Comment, layout: DefaultLayoutPublisher },
    { path: configRouter.accountPublisher, component: Account, layout: DefaultLayoutPublisher },
    { path: configRouter.earn, component: Earn, layout: DefaultLayoutPublisher },
    { path: configRouter.copyright, component: Copyright, layout: DefaultLayoutPublisher },
];
const adminRoutes = [
    { path: configRouter.Login, component: Login, layout: null },
    { path: configRouter.Signup, component: Signup, layout: null },
    { path: configRouter.ResetPass, component: ResetPass, layout: null },
];
// const privateRoutes = [];

export { publicRoutes, publisherRoutes, adminRoutes };
