import React from 'react';
import { FaHome, FaChartBar, FaBell, FaUser } from 'react-icons/fa'; // Tab icons

const BottomTabBar: React.FC = () => {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg py-4 flex justify-around">
            <FaHome size={24} className="text-[#04863E]" />
            <FaChartBar size={24} className="text-gray-500" />
            <FaBell size={24} className="text-gray-500" />
            <FaUser size={24} className="text-gray-500" />
        </div>
    );
};

export default BottomTabBar;