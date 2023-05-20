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
import ResetPass from '~/pages/Publish/ResetPass/ResetPass';

import MyPlayList from '~/pages/Publish/MyPlayList/MyPlayList';
import Dashboard from '~/pages/Publisher/Dashboard/Dashboard';
import Copyright from '~/pages/Publisher/Copyright/Copyright';
import Analytics from '~/pages/Publisher/Analytics/Analytics';
import Earn from '~/pages/Publisher/Earn/Earn';
import Account from '~/pages/Publisher/Account/Account';
import Comment from '~/pages/Publisher/Comment/Comment';
// Public routes
const publicRoutes = [
    { path: configRouter.Home, component: Content },
    { path: configRouter.Login, component: Login, layout: null },
    { path: configRouter.Signup, component: Signup, layout: null },
    { path: configRouter.ResetPass, component: ResetPass, layout: null },
    { path: configRouter.ZingChart, component: Home },
    { path: configRouter.Library, component: Library },
    { path: configRouter.Favorite, component: MyPlayList },
    { path: configRouter.DetailPlaylist, component: DetailPlaylist },
];
const publisherRoutes = [
    { path: configRouter.dashboard, component: Dashboard },
    { path: configRouter.Login, component: Login, layout: null },
    { path: configRouter.Signup, component: Signup, layout: null },
    { path: configRouter.ResetPass, component: ResetPass, layout: null },
    { path: configRouter.content, component: Content },
    { path: configRouter.analytics, component: Analytics },
    { path: configRouter.comment, component: Comment },
    { path: configRouter.accountPublisher, component: Account },
    { path: configRouter.earn, component: Earn },
    { path: configRouter.copyright, component: Copyright },
];
const adminRoutes = [
    { path: configRouter.Home, component: Content },
    { path: configRouter.Login, component: Login, layout: null },
    { path: configRouter.Signup, component: Signup, layout: null },
    { path: configRouter.ResetPass, component: ResetPass, layout: null },
    { path: configRouter.ZingChart, component: Home },
    { path: configRouter.Library, component: Library },
    { path: configRouter.Favorite, component: MyPlayList },
    { path: configRouter.DetailPlaylist, component: DetailPlaylist },
];
const privateRoutes = [];

export { publicRoutes, publisherRoutes, adminRoutes };
