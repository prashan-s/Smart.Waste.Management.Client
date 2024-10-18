import React from 'react';

const RecyclingProgress: React.FC = () => {
    return (
        <div className="mt-4">
            <h3 className="text-base md:text-lg font-bold">Recycling Progress</h3>
            <div className="flex justify-center items-center gap-x-5">
                <p className="text-sm md:text-md text-gray-600 text-wrap">See how much of your waste is being recycled</p>
                <button className="bg-[#04863E] text-white text-sm md:text-base py-2 px-6 rounded-full">
                    See
                </button>
            </div>
        </div>
    );
};

export default RecyclingProgress;