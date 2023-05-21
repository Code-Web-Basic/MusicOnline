// Layouts

// Pages
import { configRouter } from '~/config';

import Home from '~/pages/Publish/Home';
import Login from '~/pages/Publish/Login';
import DetailPlaylist from '~/layout/components/Publish/DetailPlaylist/DetailPlaylist';
import Type from '~/pages/Publish/Type/Type';
import Content from '~/pages/Publisher/Content/Content';
import Library from '~/pages/Publisher/Library/Library';
import Signup from '~/pages/Publish/Signup/Signup';

import MyPlayList from '~/pages/Publish/MyPlayList/MyPlayList';
import ResetPass from '~/pages/Publish/Resetpass/Resetpass';
import Profile from '~/pages/Publish/Profile/Profile';
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
    { path: configRouter.Profile, component: Profile, layout: null },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
