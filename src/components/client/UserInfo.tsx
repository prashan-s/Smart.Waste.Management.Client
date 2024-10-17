import React from 'react';
import { AiFillCaretDown } from 'react-icons/ai'; // Down arrow icon

interface UserInfoProps {
    fullName: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ fullName }) => {
    return (
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
                <img src="/path/to/avatar.png" alt="Avatar" className="w-10 h-10 rounded-full" />
                <div className="ml-4">
                    <h2 className="text-lg font-semibold">Manage your waste</h2>
                    <p className="text-sm text-gray-500">{fullName}</p>
                </div>
            </div>
            <AiFillCaretDown size={20} />
        </div>
    );
};

export default UserInfo;