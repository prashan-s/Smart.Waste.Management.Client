import Sidebar from '@components/dashboard/Sidebar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Content */}
            <div className="flex-grow p-6">
                <Outlet /> {/* This will render the matching child route */}
            </div>
        </div>
    );
};

export default DashboardLayout;