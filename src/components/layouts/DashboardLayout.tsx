import Sidebar from '@components/dashboard/Sidebar';
import { useAuth } from '@contexts/AuthContext';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
    const { isAuthenticated } = useAuth(); // Get authentication status

    return (
        <div className="flex">
            {/* Conditionally render Sidebar */}
            {isAuthenticated && <Sidebar />}

            {/* Content */}
            <div className={`${isAuthenticated ? 'ml-72 p-6' : ''} w-full`}>
                <Outlet /> {/* This will render the matching child route */}
            </div>
        </div>
    );
};

export default DashboardLayout;