import React from 'react';
import { FaArrowDownLong } from "react-icons/fa6";
import userAvatar from '@assets/images/user-avatar.png';

interface UserInfoProps {
    fullName: string;
}

// const UserInfo: React.FC<UserInfoProps> = ({ fullName }) => {
const UserInfo: React.FC<UserInfoProps> = () => {
    return (
        <div className="flex flex-row md:flex-row items-start md:items-center justify-between w-full">
            <div className="flex items-center">
                <img src={userAvatar} alt="Avatar" className="w-8 h-8 md:w-10 md:h-10 rounded-full" />
                <div className="ml-3 md:ml-4">
                    <h2 className="text-base md:text-lg font-bold">Manage your waste</h2>
                    {/* <p className="text-xs md:text-sm text-gray-500">{fullName}</p> */}
                </div>
            </div>
            <FaArrowDownLong size={20} className="mt-2 md:mt-0" />
        </div>
    );
};

export default UserInfo;