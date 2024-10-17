// src/pages/client/HomePage.tsx
import React from 'react';
import Carousel from '@components/client/Carousel';
import UserInfo from '@components/client/UserInfo';
import CollectionDate from '@components/client/CollectionDate';
import PreferredCollectionDays from '@components/client/PreferredCollectionDays';
import RecyclingProgress from '@components/client/RecyclingProgress';
import BottomTabBar from '@components/client/BottomTabBar';

const HomePage: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#F5F9F7] flex flex-col items-center justify-start pb-20">
            {/* Carousel Section */}
            <div className="w-full relative">
                <Carousel />
                <div className="absolute bottom-4 left-4">
                    <h2 className="text-white text-lg font-bold">Welcome, Dulanga!</h2>
                </div>
            </div>

            {/* User Info Section */}
            <div className="w-full px-6 mt-6">
                <UserInfo fullName="Dulanga" />
            </div>

            {/* Collection Date Section */}
            <div className="w-full px-6">
                <CollectionDate />
            </div>

            {/* Preferred Collection Days Section */}
            <div className="w-full px-6">
                <PreferredCollectionDays />
            </div>

            {/* Image Placeholder */}
            <img src="/path/to/collection-image.png" alt="Collection" className="w-full mt-6" />

            {/* Recycling Progress Section */}
            <div className="w-full px-6">
                <RecyclingProgress />
            </div>

            {/* Bottom Tab Bar */}
            <BottomTabBar />
        </div>
    );
};

export default HomePage;