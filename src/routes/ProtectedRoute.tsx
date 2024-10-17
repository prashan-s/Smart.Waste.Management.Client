import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@contexts/AuthContext';

interface ProtectedRouteProps {
    children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        // Redirect to the appropriate sign-in page depending on the path
        const redirectPath = location.pathname.startsWith('/client') ? '/client/onboarding' : '/dashboard/sign-in';
        return <Navigate to={redirectPath} />;
    }

    // If authenticated, allow access to the route
    return children;
};

export default ProtectedRoute;