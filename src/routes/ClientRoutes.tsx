import { lazy } from 'react';
import ProtectedRoute from './ProtectedRoute';
import { Navigate } from 'react-router-dom';
import ClientLayout from '@components/layouts/ClientLayout';

// Lazy-loaded components for the client mobile journey
const OnboardingPage = lazy(() => import('@pages/client/OnboardingPage'));
const LoginPage = lazy(() => import('@pages/client/LoginPage'));
const RegisterPage = lazy(() => import('@pages/client/RegisterPage'));
const ResetPasswordPage = lazy(() => import('@pages/client/ResetPasswordPage'));
const ResetPasswordOtpPage = lazy(() => import('@pages/client/ResetPasswordOtpPage'));
const ResetPasswordSuccess = lazy(() => import('@pages/client/ResetPasswordSuccess'));
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
                <ClientLayout />
            </ProtectedRoute>
        ),
        children: [
            { path: '', element: <HomePage /> },
            { path: 'my-waste', element: <MyWastePage /> },
            { path: 'waste-details', element: <WasteDetailsPage /> },
            { path: 'profile', element: <ProfilePage /> },
            { path: 'points', element: <PointsPage /> },
            { path: 'payments', element: <PaymentsPage /> },
            { path: 'notifications', element: <NotificationsPage /> },
            { path: 'feedback', element: <FeedbackPage /> },

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
    {
        path: '/client/reset-password',
        element: <ResetPasswordPage />
    },
    {
        path: '/client/reset-password-otp',
        element: <ResetPasswordOtpPage />
    },
    {
        path: '/client/reset-password-success',
        element: <ResetPasswordSuccess />
    },
    // Wildcard route for unmatched paths under /client
    {
        path: '/client/*',
        element: <Navigate to="/client" />,
    },
];