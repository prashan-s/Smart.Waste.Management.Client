import { lazy } from 'react';
import ProtectedRoute from './ProtectedRoute';

// Lazy-loaded components for the client mobile journey
const OnboardingPage = lazy(() => import('@pages/client/OnboardingPage'));
const LoginPage = lazy(() => import('@pages/client/LoginPage'));
const RegisterPage = lazy(() => import('@pages/client/RegisterPage'));
const ResetPasswordPage = lazy(() => import('@pages/client/ResetPasswordPage'));
const HomePage = lazy(() => import('@pages/client/HomePage'));
const MyWastePage = lazy(() => import('@pages/client/MyWastePage'));
const WasteDetailsPage = lazy(() => import('@pages/client/WasteDetailsPage'));
const ProfilePage = lazy(() => import('@pages/client/ProfilePage'));
const PointsPage = lazy(() => import('@pages/client/PointsPage'));
const PaymentsPage = lazy(() => import('@pages/client/PaymentsPage'));
const NotificationsPage = lazy(() => import('@pages/client/NotificationsPage'));
const FeedbackPage = lazy(() => import('@pages/client/FeedbackPage'));

export const clientRoutes = [
    {
        path: '/client',
        element: (
            <ProtectedRoute>
                <OnboardingPage />
            </ProtectedRoute>
        ),
        children: [
            { path: 'login', element: <LoginPage /> },
            { path: 'profile', element: <RegisterPage /> },
            { path: 'settings', element: <ResetPasswordPage /> },
            { path: 'profile', element: <HomePage /> },
            { path: 'profile', element: <MyWastePage /> },
            { path: 'profile', element: <WasteDetailsPage /> },
            { path: 'profile', element: <ProfilePage /> },
            { path: 'profile', element: <PointsPage /> },
            { path: 'profile', element: <PaymentsPage /> },
            { path: 'profile', element: <NotificationsPage /> },
            { path: 'profile', element: <FeedbackPage /> },
        ],
    },
    {
        path: '/client/onboarding',
        element: <OnboardingPage />,
    },
    {
        path: '/client/sign-in',
        element: <LoginPage />,
    },
    {
        path: '/client/sign-up',
        element: <RegisterPage />,
    },
];