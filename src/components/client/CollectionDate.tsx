import React from 'react';
import { FaTruck } from 'react-icons/fa'; // Lorry icon

const CollectionDate: React.FC = () => {
    return (
        <div className="flex items-center mt-6">
            <FaTruck size={32} color="#005fcc" />
            <div className="ml-4">
                <h3 className="text-lg font-semibold">Next Collection Date</h3>
                <p className="text-sm text-gray-600">21 OCT 2024 - MON - 7.00 A.M</p>
            </div>
        </div>
    );
};

export default CollectionDate;