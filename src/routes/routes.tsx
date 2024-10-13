import { lazy } from "react";

// Lazy loaded components
const Dashboard = lazy(() => import("@pages/dashboard/Dashboard"));
const Reports = lazy(() => import("@pages/dashboard/Reports"));
const Notifications = lazy(() => import("@pages/dashboard/Notifications"));
const Settings = lazy(() => import("@pages/dashboard/Settings"));

// Dashboard Routes
export const dashboardRoutes = [
    {
        path: "/dashboard",
        element: <Dashboard />,
    },
    {
        path: "/dashboard/order",
        element: <Reports />,
    },
    {
        path: "/dashboard/bulk",
        element: <Notifications />,
    },
    {
        path: "/dashboard/flight",
        element: <Settings />,
    }
];
