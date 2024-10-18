import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineCalendarToday } from 'react-icons/md';
import StickyHeader from '@components/common/StickyHeader';

const NotificationsPage: React.FC = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // Navigate back to the previous page
    };

    // Notification data (you can replace this with API data)
    const recentNotifications = [
        { id: 1, title: 'Alert', description: 'Truck delayed on Route', time: '1 min ago' },
        { id: 2, title: 'Rewards', description: 'Congratulations!!! waste reduction activated', time: '2 days ago' },
        { id: 3, title: 'Reminder', description: 'Open the map to view the truck location', time: '1 hr ago' },
    ];

    const yesterdayNotifications = [
        { id: 4, title: 'Alert', description: 'Truck delayed on Route', time: '1 min ago' },
        { id: 5, title: 'Rewards', description: 'Congratulations!!! waste reduction activated', time: '2 days ago' },
        { id: 6, title: 'Reminder', description: 'Open the map to view the truck location', time: '1 hr ago' },
    ];

    return (
        <div className="min-h-screen bg-[#F5F9F7] flex flex-col items-center px-2 py-8">
            {/* Reusable Sticky Header */}
            <StickyHeader
                title="Notifications"
                onBackClick={handleBack}
                customClassName="mb-2" // Additional spacing below the sticky header
            />
            {/* <div className="sticky top-0 w-full bg-white z-10 p-4 max-w-md shadow-md">
                <div className="flex items-center">
                    <IoArrowBack size={24} className="cursor-pointer" onClick={handleBack} />
                    <h1 className="ml-4 text-2xl font-extrabold">Notifications</h1>
                </div>
            </div> */}

            {/* Notification Section */}
            <div className="w-full max-w-md bg-white rounded-lg p-4 shadow-lg mt-2">
                {/* Recent Notifications */}
                <h3 className="text-lg font-bold mb-4">Recent</h3>
                {recentNotifications.map(notification => (
                    <div key={notification.id} className="flex justify-between items-center mb-3 p-3 rounded-lg bg-[#EBF9EC]">
                        <div className="flex items-center">
                            <MdOutlineCalendarToday size={24} className="text-black mr-4" />
                            <div>
                                <h4 className="font-semibold">{notification.title}</h4>
                                <p className="text-sm text-gray-500">{notification.description}</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 text-nowrap">{notification.time}</p>
                    </div>
                ))}

                {/* Yesterday's Notifications */}
                <h3 className="text-lg font-bold mt-6 mb-4">Yesterday</h3>
                {yesterdayNotifications.map(notification => (
                    <div key={notification.id} className="flex justify-between items-center mb-3 p-3 rounded-lg bg-[#EBF9EC]">
                        <div className="flex items-center">
                            <MdOutlineCalendarToday size={24} className="text-black mr-4" />
                            <div>
                                <h4 className="font-semibold">{notification.title}</h4>
                                <p className="text-sm text-gray-500">{notification.description}</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 text-nowrap">{notification.time}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotificationsPage;