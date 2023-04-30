// Layouts

// Pages
import { configRouter } from '~/config';
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Signup from '~/pages/Signup';
import Resetpass from '~/pages/Resetpass';
// Public routes
const publicRoutes = [
    { path: configRouter.Home, component: Home },
    { path: configRouter.Login, component: Login, layout: null },
    { path: configRouter.Signup, component: Signup, layout: null },
    { path: configRouter.Resetpass, component: Resetpass, layout: null },
    { path: configRouter.ZingChart, component: Home },
    { path: configRouter.Library, component: Home },
    { path: configRouter.Favorite, component: Home },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
