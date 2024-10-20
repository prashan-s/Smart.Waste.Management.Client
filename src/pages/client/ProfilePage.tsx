import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { BiHistory } from 'react-icons/bi';
import { TbLogout } from 'react-icons/tb';
import { PiCopySimple } from "react-icons/pi";
import userAvatar from '@assets/images/male-avatar.png';
import Header from '@components/client/Header';

const ProfilePage: React.FC = () => {
    const navigate = useNavigate();

    // Navigation handlers
    const handleEditProfile = () => navigate('/client/edit-profile');
    const handlePoints = () => navigate('/client/points');
    const handlePaymentHistory = () => navigate('/client/payment-details');
    const handleLogout = () => {
        // Implement logout logic here, for example clearing session
        navigate('/client/sign-in');
    };

    return (
        <div className="min-h-screen bg-[#EBF9EC] flex flex-col items-center py-10 px-5">
            {/* Header Section */}
            <div className="w-full flex items-center justify-center max-w-md mb-10">
                <Header title="Profile" />
            </div>

            {/* Profile Avatar and Name */}
            <div className="w-full flex flex-col items-center">
                <img
                    src={userAvatar}
                    alt="User Avatar"
                    className="w-24 h-24 rounded-full"
                />
                <h2 className="mt-4 text-2xl font-semibold text-[#1C170D]">Dulanga</h2>
            </div>

            {/* Action List */}
            <div className="w-full max-w-md mt-8">
                {/* Edit Profile */}
                <div
                    onClick={handleEditProfile}
                    className="flex items-center px-6 py-4 bg-white shadow-lg rounded-lg mb-4 cursor-pointer"
                >
                    <FiSettings size={24} className="text-gray-700 bg-[#EBF9EC]" />
                    <span className="ml-4 text-lg font-medium text-gray-700">Edit Profile</span>
                </div>

                {/* Points */}
                <div
                    onClick={handlePoints}
                    className="flex items-center px-6 py-4 bg-white shadow-lg rounded-lg mb-4 cursor-pointer"
                >
                    <PiCopySimple size={24} className="text-gray-700 bg-[#EBF9EC]" />
                    <span className="ml-4 text-lg font-medium text-gray-700">Points</span>
                </div>

                {/* Payment History */}
                <div
                    onClick={handlePaymentHistory}
                    className="flex items-center px-6 py-4 bg-white shadow-lg rounded-lg mb-4 cursor-pointer"
                >
                    <BiHistory size={24} className="text-gray-700 bg-[#EBF9EC]" />
                    <span className="ml-4 text-lg font-medium text-gray-700">Payment History</span>
                </div>

                {/* Logout */}
                <div
                    onClick={handleLogout}
                    className="flex items-center px-6 py-4 bg-white shadow-lg rounded-lg mb-4 cursor-pointer"
                >
                    <TbLogout size={24} className="text-gray-700 bg-[#EBF9EC]" />
                    <span className="ml-4 text-lg font-medium text-gray-700">Logout</span>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;