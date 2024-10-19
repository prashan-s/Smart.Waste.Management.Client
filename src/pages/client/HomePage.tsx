import React, { useState } from 'react';
import Carousel from '@components/client/Carousel';
import UserInfo from '@components/client/UserInfo';
import CollectionDate from '@components/client/CollectionDate';
import PreferredCollectionDays from '@components/client/PreferredCollectionDays';
import RecyclingProgress from '@components/client/RecyclingProgress';
import recycleBinGreen from "@assets/images/recycle-bin1.png";
import recycleBinOrange from "@assets/images/recycle-bin2.png";
import RegisterNow from '@components/client/RegisterNow';

const HomePage: React.FC = () => {
    const [showContent, setShowContent] = useState(false); // State to control content visibility
    const [showMessage, setShowMessage] = useState(false); // Control visibility of the message
    const [heading, setHeading] = useState("Select Pickup Days"); // Dynamic heading

    // Handle the "Register Now" button click
    const handleRegisterNowClick = () => {
        setShowContent((prev) => !prev); // Toggle the visibility
    };

    // Handle day selection in PreferredCollectionDays
    const handleDaySelect = () => {
        setShowMessage(false); // Initially hide the message
    };

    // Handle the "Get Collected" button click
    const handleGetCollectedClick = () => {
        setShowMessage(true); // Show the message after button click
        setHeading("Preferred Collection Day"); // Change heading after the button click
    };

    return (
        <div className="min-h-screen bg-[#F5F9F7] flex flex-col items-center justify-start pb-28 md:pb-28">
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

            {/* Image Placeholder */}
            <div className="w-full px-4 md:px-6 mt-6">
                <img src={recycleBinOrange} className="w-full h-auto" />
            </div>

            {/* Register Now Section */}
            <div className="w-full px-4 md:px-6">
                <RegisterNow onClick={handleRegisterNowClick} />
            </div>

            {/* Below Content (Expandable) */}
            <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${showContent ? 'max-h-[1000px]' : 'max-h-0'}`}
            >
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
                    <PreferredCollectionDays
                        heading={heading}
                        showMessage={showMessage}
                        onDaySelect={handleDaySelect}
                    />
                </div>

                {/* Get Collected Button */}
                <div className="w-full px-4 md:px-6 mt-4">
                    <button
                        className="bg-tertiary text-white py-2 px-6 rounded-full w-full"
                        onClick={handleGetCollectedClick}
                    >
                        Get Collected
                    </button>
                </div>

                {/* Image Placeholder */}
                <div className="w-full px-4 md:px-6 mt-6">
                    <img src={recycleBinOrange} className="w-full h-auto" />
                </div>

                {/* Recycling Progress Section */}
                <div className="w-full px-4 md:px-6 mt-6">
                    <RecyclingProgress />
                </div>
            </div>
        </div>
    );
};

export default HomePage;