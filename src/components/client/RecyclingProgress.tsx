import React from 'react';

const RecyclingProgress: React.FC = () => {
    return (
        <div className="mt-6">
            <h3 className="text-lg font-semibold">Recycling Progress</h3>
            <p className="text-sm text-gray-600">See how much of your waste is being recycled</p>
            <button className="mt-2 bg-[#04863E] text-white py-2 px-6 rounded-full">
                See
            </button>
        </div>
    );
};

export default RecyclingProgress;