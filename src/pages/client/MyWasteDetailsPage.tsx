import React from 'react';
import { useNavigate } from 'react-router-dom';
import StickyHeader from '@components/common/StickyHeader';
import boxes from '@assets/images/boxes.png';
import star from '@assets/images/star.png';
import fullRecycleBin from '@assets/images/full-recycle-bin.png';

const MyWasteDetailsPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#F5F9F7] flex flex-col items-center px-4 py-6">
            {/* Sticky Header */}
            <StickyHeader
                title="My Waste Details"
                onBackClick={() => navigate(-1)} // Go back to previous page
                customClassName="mb-2"
            />

            <div className="flex justify-start items-center w-full max-w-md">
                <h2 className="text-lg font-semibold my-2">Details</h2>
            </div>

            {/* Waste Item Details */}
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 mb-4">
                <div className="flex justify-between items-start">
                    <div className="text-xl font-bold">Paper</div>
                    <img
                        src={boxes}
                        alt="Box"
                        className="w-20 h-20 rounded-lg object-cover"
                    />
                </div>
            </div>

            {/* Earned Points & Recycled Amount Section */}
            <div className="w-full max-w-md flex justify-between bg-white rounded-lg shadow-lg p-6 mb-4">
                {/* Earned Points */}
                <div className="flex flex-col items-center">
                    <img src={star} alt="Star" className="w-8 h-8 mb-2" />
                    <p className="text-md font-bold">Earned Points</p>
                    <p className="text-3xl font-extrabold">235</p>
                </div>

                {/* Divider */}
                <div className="border-l border-gray-300 h-full mx-4"></div>

                {/* Recycled Amount */}
                <div className="flex flex-col items-center">
                    <img src={fullRecycleBin} alt="Recycle Bin" className="w-12 h-8 mb-2" />
                    <p className="text-md font-bold">Amount Recycled</p>
                    <p className="text-3xl font-extrabold">5 Kg</p>
                </div>
            </div>

            {/* Rate per kg Section */}
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center">
                    <p className="text-2xl font-extrabold">Rate per 1kg</p>
                    <p className="text-2xl font-extrabold">2.5</p>
                </div>
            </div>
        </div>
    );
};

export default MyWasteDetailsPage;