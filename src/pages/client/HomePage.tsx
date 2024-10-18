import React from 'react';
import Carousel from '@components/client/Carousel';
import UserInfo from '@components/client/UserInfo';
import CollectionDate from '@components/client/CollectionDate';
import PreferredCollectionDays from '@components/client/PreferredCollectionDays';
import RecyclingProgress from '@components/client/RecyclingProgress';
import recycleBinGreen from "@assets/images/recycle-bin1.png";
import recycleBinOrange from "@assets/images/recycle-bin2.png";

const HomePage: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#F5F9F7] flex flex-col items-center justify-start pb-20 md:pb-24">
            {/* Carousel Section */}
            <div className="w-full relative">
                <Carousel />
                <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4">
                    <h2 className="text-white text-3xl md:text-6xl font-semibold">Welcome, Dulanga!</h2>
                </div>
            </div>

            {/* User Info Section */}
            <div className="w-full px-4 md:px-6 mt-4 md:mt-6">
                <UserInfo fullName="Dulanga" />
            </div>

            {/* Collection Date Section */}
            <div className="w-full px-4 md:px-6 mt-4">
                <CollectionDate />
            </div>

            {/* Image Section */}
            <div className="w-full px-4 md:px-6 mt-4">
                <img src={recycleBinGreen} className="w-full h-auto" />
            </div>

            {/* Preferred Collection Days Section */}
            <div className="w-full px-4 md:px-6 mt-4">
                <PreferredCollectionDays />
            </div>

            {/* Image Placeholder */}
            <div className="w-full px-4 md:px-6 mt-6">
                <img src={recycleBinOrange} className="w-full h-auto" />
            </div>

            {/* Recycling Progress Section */}
            <div className="w-full px-4 md:px-6">
                <RecyclingProgress />
            </div>
        </div>
    );
};

export default HomePage;