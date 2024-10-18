import React from 'react';
import { LuTruck } from "react-icons/lu";

const CollectionDate: React.FC = () => {
    return (
        <div className="flex items-center mt-2">
            <LuTruck size={40} className="text-black" />
            <div className="ml-3">
                <h3 className="text-base md:text-lg font-semibold">Next Collection Date</h3>
                <p className="text-xs md:text-sm text-gray-600">21 OCT 2024 - MON - 7.00 A.M</p>
            </div>
        </div>
    );
};

export default CollectionDate;