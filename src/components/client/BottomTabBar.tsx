import React from 'react';
import { MdHomeFilled } from "react-icons/md";
import { PiChartBarFill } from "react-icons/pi";
import { HiOutlineBell } from "react-icons/hi2";
import { LuUser2 } from "react-icons/lu";
import { useNavigate, useLocation } from 'react-router-dom';

const BottomTabBar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Determine the active tab based on the current route
    const isActive = (paths: string[]) => paths.includes(location.pathname);

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg py-5 md:py-6 flex justify-around">
            {/* Home Tab */}
            <button onClick={() => navigate('/client')} className="flex flex-col items-center focus:outline-none">
                <MdHomeFilled size={30} className={isActive(['/client']) ? "text-black" : "text-gray-500"} />
                <span className={`text-xs ${isActive(['/client']) ? "text-black" : "text-gray-500"}`}>Home</span>
            </button>

            {/* Reports Tab */}
            <button onClick={() => navigate('/client/my-waste')} className="flex flex-col items-center focus:outline-none">
                <PiChartBarFill size={30} className={isActive(['/client/my-waste']) ? "text-black" : "text-gray-500"} />
                <span className={`text-xs ${isActive(['/client/my-waste']) ? "text-black" : "text-gray-500"}`}>Reports</span>
            </button>

            {/* Notifications Tab */}
            <button onClick={() => navigate('/client/notifications')} className="flex flex-col items-center focus:outline-none">
                <HiOutlineBell size={30} className={isActive(['/client/notifications']) ? "text-black" : "text-gray-500"} />
                <span className={`text-xs ${isActive(['/client/notifications']) ? "text-black" : "text-gray-500"}`}>Notifications</span>
            </button>

            {/* Profile Tab */}
            <button onClick={() => navigate('/client/profile')} className="flex flex-col items-center focus:outline-none">
                <LuUser2 size={30} className={isActive(['/client/profile', '/client/edit-profile', '/client/payments', '/client/points']) ? "text-black" : "text-gray-500"} />
                <span className={`text-xs ${isActive(['/client/profile', '/client/edit-profile', '/client/payments', '/client/points']) ? "text-black" : "text-gray-500"}`}>Profile</span>
            </button>
        </div>
    );
};

export default BottomTabBar;