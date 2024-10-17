import useSessionStorage from '@hooks/useSessionStorage';
import { createContext, useContext, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Define the shape of the auth context
interface AuthContextType {
    accessToken: string | null;
    login: (token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
    isClient: boolean;  // Track whether the user is a client
}

// Create the AuthContext with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider to manage authentication state
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [accessToken, setAccessToken] = useSessionStorage('accessToken', null); // Use session storage hook
    const navigate = useNavigate();
    const location = useLocation();

    const login = (token: string) => {
        setAccessToken(token);
    };

    const logout = () => {
        setAccessToken(null);
        const redirectPath = location.pathname.startsWith('/client') ? '/client/sign-in' : '/dashboard/sign-in';
        navigate(redirectPath);
    };

    const isAuthenticated = !!accessToken; // Convert accessToken to boolean
    const isClient = location.pathname.startsWith('/client');

    return (
        <AuthContext.Provider value={{ accessToken, login, logout, isAuthenticated, isClient }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to access the AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};