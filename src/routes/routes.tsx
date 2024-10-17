import { lazy } from 'react';
import DashboardLayout from '@components/layouts/DashboardLayout'; // Adjust path based on your structure
import ProtectedRoute from './ProtectedRoute';

// Lazy loaded components
const SignInPage = lazy(() => import('@pages/dashboard/SignIn'));
const SignUpPage = lazy(() => import('@pages/dashboard/SignUp'));
const Dashboard = lazy(() => import('@pages/dashboard/Dashboard'));
const Reports = lazy(() => import('@pages/dashboard/Reports'));
const Notifications = lazy(() => import('@pages/dashboard/Notifications'));
const Settings = lazy(() => import('@pages/dashboard/Settings'));

// Dashboard Routes
export const dashboardRoutes = [
    {
        path: '/dashboard',
        element: (
            <ProtectedRoute>
                <DashboardLayout />
            </ProtectedRoute>
        ), // Wrap routes with the layout and protection
        children: [
            { path: '', element: <Dashboard /> },
            { path: 'reports', element: <Reports /> },
            { path: 'notifications', element: <Notifications /> },
            { path: 'settings', element: <Settings /> }
        ]
    },
    {
        path: '/dashboard/sign-in',
        element: <SignInPage />, // Public route
    },
    {
        path: '/dashboard/sign-up',
        element: <SignUpPage />, // Public route
    },
];