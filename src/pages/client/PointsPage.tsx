import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StickyHeader from '@components/common/StickyHeader';
import { PiShieldStar } from "react-icons/pi";
import star from '@assets/images/star.png';
import reward from '@assets/images/reward.png';
import useSessionStorage from '@hooks/useSessionStorage';

const PointsPage: React.FC = () => {
    const navigate = useNavigate();
    const [userData] = useSessionStorage('userData',{points:3});
    
    const handleBack = () => {
        navigate(-1); 
    };

    return (
        <div className="min-h-screen bg-[#F5F9F7] flex flex-col items-center px-4 py-6">
            {/* Sticky Header */}
            <StickyHeader
                title="Points"
                onBackClick={handleBack}
                customClassName="mb-2"
            />

            {/* Available Points Section */}
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-4 mb-6">
                <div className="flex items-center">
                    <img src={star} alt="Star" className="w-10 h-10 mr-4" />
                    <div>
                        <p className="text-4xl font-extrabold">{userData.points}</p>
                        <p className="text-sm text-gray-500 font-bold">Available points</p>
                    </div>
                </div>
            </div>

            {/* Recently Earned Points */}
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-4 mb-6 flex justify-between items-center">
                <div>
                    <p className="text-md font-bold">1.50 Points earned, 1 day ago</p>
                    <button className="text-yellow-600 font-medium text-sm mt-1">View</button>
                </div>
                <img src={reward} alt="Reward" className="w-28 h-16 rounded-lg object-cover" />
            </div>

            {/* Point History Section */}
            <div className="flex justify-start items-center w-full max-w-md">
                <h2 className="text-xl font-bold mb-2">Point History</h2>
            </div>

            {/* History Items */}
            <div className="w-full max-w-md bg-white rounded-lg p-4 mb-4 shadow-lg">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        {/* Shield Icon with background color and padding */}
                        <div className="bg-[#EBF9EC] p-2 rounded-lg">
                            <PiShieldStar size={40} className="text-gray-800" />
                        </div>
                        <div className="ml-4">
                            <p className="font-semibold">You've Earned Points</p>
                            <p className="text-sm text-gray-500">Great job! You've just earned 150 points for your recent purchase.</p>
                        </div>
                    </div>
                    <button className="text-gray-800 font-semibold">View</button>
                </div>
            </div>

            {/* You can repeat the same layout for additional history items */}
            <div className="w-full max-w-md bg-white rounded-lg p-4 mb-4 shadow-lg">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        {/* Shield Icon with background color and padding */}
                        <div className="bg-[#EBF9EC] p-2 rounded-lg">
                            <PiShieldStar size={40} className="text-gray-800" />
                        </div>
                        <div className="ml-4">
                            <p className="font-semibold">You've Earned Points</p>
                            <p className="text-sm text-gray-500">Great job! You've just earned 150 points for your recent purchase.</p>
                        </div>
                    </div>
                    <button className="text-gray-800 font-semibold">View</button>
                </div>
            </div>

            <div className="w-full max-w-md bg-white rounded-lg p-4 mb-4 shadow-lg">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        {/* Shield Icon with background color and padding */}
                        <div className="bg-[#EBF9EC] p-2 rounded-lg">
                            <PiShieldStar size={40} className="text-gray-800" />
                        </div>
                        <div className="ml-4">
                            <p className="font-semibold">You've Earned Points</p>
                            <p className="text-sm text-gray-500">Great job! You've just earned 150 points for your recent purchase.</p>
                        </div>
                    </div>
                    <button className="text-gray-800 font-semibold">View</button>
                </div>
            </div>
        </div>
    );
};

export default PointsPage;