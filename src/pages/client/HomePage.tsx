import React, { useEffect, useState } from 'react';
import Carousel from '@components/client/Carousel';
import UserInfo from '@components/client/UserInfo';
// import CollectionDate from '@components/client/CollectionDate';
import PreferredCollectionDays from '@components/client/PreferredCollectionDays';
// import RecyclingProgress from '@components/client/RecyclingProgress';
// import recycleBinGreen from "@assets/images/recycle-bin1.png";
import recycleBinOrange from "@assets/images/recycle-bin2.png";
import RegisterNow from '@components/client/RegisterNow';
import { showToast } from '@utils/toastService';
import useSessionStorage from '@hooks/useSessionStorage';
import { fetchUserProfile, scheduleGarbageCollection } from '@services/userService';

const HomePage: React.FC = () => {
    const [selectedDay, setSelectedDay] = useState<number | null>(null); // Track selected day
    const [loading, setLoading] = useState(false); // Track API call loading state
    const [, setUserData] = useSessionStorage('userData', null); // Store user data in session storage

    // Days of the week
    const daysOfWeek = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

    // Fetch user info on page load and store in session storage
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetchUserProfile(); // Call the API
                setUserData(response.data); // Store response in session storage

                // Map the collectionDay to the correct day index for the calendar
                const collectionDayIndex = daysOfWeek.indexOf(response.data.collectionDay);
                if (collectionDayIndex !== -1) {
                    setSelectedDay(collectionDayIndex); // Set the selected day based on API response
                }
            } catch (error) {
                // Type narrowing for error object
                if (error instanceof Error) {
                    showToast('error', 'Error', error.message || 'Failed to load user information');
                } else {
                    showToast('error', 'Error', 'Failed to load user information');
                }
            }
        };
        fetchUserInfo();
    }, []); // Dependency array should be empty to fetch data only once when component mounts

    // Handle day selection in PreferredCollectionDays
    const handleDaySelect = (dayIndex: number) => {
        setSelectedDay(dayIndex); // Set selected day
    };

    // Handle the "Get Collected" button click
    const handleGetCollectedClick = async () => {
        if (selectedDay === null) {
            showToast('error', 'Error', 'Please select a day before proceeding.');
            return;
        }

        const collectionDay = daysOfWeek[selectedDay]; // Convert day index to actual day name

        try {
            setLoading(true); // Start loading
            await scheduleGarbageCollection(collectionDay);
            showToast('success', 'Success', `Collection scheduled for ${collectionDay}`);
        } catch (error) {
            if (error instanceof Error) {
                showToast('error', 'Error', error.message || 'Failed to schedule collection.');
            } else {
                showToast('error', 'Error', 'Failed to schedule collection.');
            }
        } finally {
            setLoading(false); // Stop loading
        }
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
                <RegisterNow />
            </div>

            {/* Preferred Collection Days Section */}
            <div className="w-full px-4 md:px-6">
                <PreferredCollectionDays
                    heading="Select Pickup Days"
                    showMessage={false} // No message on initial render
                    onDaySelect={handleDaySelect}
                    selectedDay={selectedDay} // Pass the selected day from the parent component
                />
            </div>

            {/* Get Collected Button */}
            <div className="w-full px-4 md:px-6 mt-4">
                <button
                    className={`bg-tertiary text-white py-2 px-6 rounded-full w-full ${loading ? 'opacity-50' : ''}`}
                    onClick={handleGetCollectedClick}
                    disabled={loading}
                >
                    {loading ? 'Scheduling...' : 'Get Collected'}
                </button>
            </div>
        </div>
    );
};

export default HomePage;