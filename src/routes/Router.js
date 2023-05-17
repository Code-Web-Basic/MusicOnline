// Layouts

// Pages
import { configRouter } from '~/config';
import Home from '~/pages/Publish/Home';
import Login from '~/pages/Publish/Login';
import Signup from '~/pages/Publish/Signup';
import Resetpass from '~/pages/Publish/Resetpass';
import DetailPlaylist from '~/layout/components/Publish/DetailPlaylist/DetailPlaylist';
import Type from '~/pages/Publish/Type/Type';
import Content from '~/pages/Publisher/Content/Content';
// Public routes
const publicRoutes = [
    { path: configRouter.Home, component: Content },
    { path: configRouter.Login, component: Login, layout: null },
    { path: configRouter.Signup, component: Signup, layout: null },
    { path: configRouter.ResetPass, component: Resetpass, layout: null },
    { path: configRouter.ZingChart, component: Home },
    { path: configRouter.Library, component: Home },
    { path: configRouter.Favorite, component: Home },
    { path: configRouter.DetailPlaylist, component: DetailPlaylist },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
