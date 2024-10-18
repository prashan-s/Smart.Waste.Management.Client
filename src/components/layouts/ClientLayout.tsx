import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomTabBar from '@components/client/BottomTabBar'; // Import the bottom tab bar component

const ClientLayout: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Page content */}
            <div className="flex-grow">
                <Outlet /> {/* This will render the specific page content */}
            </div>

            {/* Bottom Tab Bar */}
            <BottomTabBar />
        </div>
    );
};

export default ClientLayout;