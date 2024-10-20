import { lazy } from 'react';
import ProtectedRoute from './ProtectedRoute';
import { Navigate } from 'react-router-dom';
import ClientLayout from '@components/layouts/ClientLayout';

// Lazy-loaded components for the client mobile journey
const LoginPage = lazy(() => import('@pages/client/LoginPage'));
const RegisterPage = lazy(() => import('@pages/client/RegisterPage'));
const ResetPasswordPage = lazy(() => import('@pages/client/ResetPasswordPage'));
const ResetPasswordOtpPage = lazy(() => import('@pages/client/ResetPasswordOtpPage'));
const ResetPasswordEmailPage = lazy(() => import('@pages/client/ResetPasswordEmailPage'));
const ResetPasswordSuccess = lazy(() => import('@pages/client/ResetPasswordSuccess'));
const HomePage = lazy(() => import('@pages/client/HomePage'));
const MyWastePage = lazy(() => import('@pages/client/MyWastePage'));
const MyWasteDetailsPage = lazy(() => import('@pages/client/MyWasteDetailsPage'));
const ProfilePage = lazy(() => import('@pages/client/ProfilePage'));
const ProfileEditPage = lazy(() => import('@pages/client/ProfileEditPage'));
const PointsPage = lazy(() => import('@pages/client/PointsPage'));
const PaymentPage = lazy(() => import('@pages/client/PaymentPage'));
const PaymentStatusPage = lazy(() => import('@pages/client/PaymentStatusPage'));
const PaymentDetailsPage = lazy(() => import('@pages/client/PaymentDetailsPage'));
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
            { path: 'my-waste-details', element: <MyWasteDetailsPage /> },
            { path: 'profile', element: <ProfilePage /> },
            { path: 'edit-profile', element: <ProfileEditPage /> },
            { path: 'points', element: <PointsPage /> },
            { path: 'payment', element: <PaymentPage /> },
            { path: 'payment-status', element: <PaymentStatusPage /> },
            { path: 'payment-details', element: <PaymentDetailsPage /> },
            { path: 'notifications', element: <NotificationsPage /> },
            { path: 'feedback', element: <FeedbackPage /> },

        ],
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
        path: '/client/reset-password-email',
        element: <ResetPasswordEmailPage />
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