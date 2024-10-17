import { Navigate } from 'react-router-dom';
import { useAuth } from '@contexts/AuthContext';

interface ProtectedRouteProps {
    children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        // If the user is not authenticated, navigate to sign-in page
        return <Navigate to="/dashboard/sign-in" />;
    }

    // If authenticated, allow access to the route
    return children;
};

export default ProtectedRoute;