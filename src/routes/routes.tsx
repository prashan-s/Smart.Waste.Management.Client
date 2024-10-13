import { lazy } from 'react';
import DashboardLayout from '@components/layouts/DashboardLayout'; // Adjust path based on your structure

// Lazy loaded components
const Dashboard = lazy(() => import('@pages/dashboard/Dashboard'));
const Reports = lazy(() => import('@pages/dashboard/Reports'));
const Notifications = lazy(() => import('@pages/dashboard/Notifications'));
const Settings = lazy(() => import('@pages/dashboard/Settings'));

// Dashboard Routes
export const dashboardRoutes = [
    {
        path: '/dashboard',
        element: <DashboardLayout />, // Wrap routes with the layout containing Sidebar
        children: [
            { path: '', element: <Dashboard /> },
            { path: 'reports', element: <Reports /> },
            { path: 'notifications', element: <Notifications /> },
            { path: 'settings', element: <Settings /> }
        ]
    }
];