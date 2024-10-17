import useSessionStorage from '@hooks/useSessionStorage';
import { createContext, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

// Define the shape of the auth context
interface AuthContextType {
    accessToken: string | null;
    login: (token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

// Create the AuthContext with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider to manage authentication state
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [accessToken, setAccessToken] = useSessionStorage('accessToken', null); // Use session storage hook
    const navigate = useNavigate();

    const login = (token: string) => {
        setAccessToken(token);
    };

    const logout = () => {
        setAccessToken(null);
        navigate('/dashboard/sign-in'); // Redirect to login page
    };

    const isAuthenticated = !!accessToken; // Convert accessToken to boolean

    return (
        <AuthContext.Provider value={{ accessToken, login, logout, isAuthenticated }}>
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