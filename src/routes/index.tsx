import { lazy } from 'react';

const Login = lazy(() => import('../pages/login'));
const Dashboard = lazy(() => import('../pages/dashboard'));

const routes = [
    {
        id: 1,
        title: 'Login',
        slug: '/login',
        protected: false,
        page: <Login />
    },
    {
        id: 2,
        title: 'Dashboard',
        slug: '/dashboard',
        protected: true,
        page: <Dashboard />
    },
];

export default routes;