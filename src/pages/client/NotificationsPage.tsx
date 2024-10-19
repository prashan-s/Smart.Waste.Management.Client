import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineCalendarToday } from 'react-icons/md';
import StickyHeader from '@components/common/StickyHeader';
import { fetchNotifications } from '@services/notificationService'; // Use the new service
import { format, isToday, isYesterday, isThisWeek } from 'date-fns';
import { showToast } from '@utils/toastService';
import { Skeleton, Box } from '@mui/material';

interface Notification {
    id: string;
    header: string;
    message: string;
    notificationDate: string;
    read: boolean;
}

const NotificationsPage: React.FC = () => {
    const navigate = useNavigate();
    const [todayNotifications, setTodayNotifications] = useState<Notification[]>([]);
    const [yesterdayNotifications, setYesterdayNotifications] = useState<Notification[]>([]);
    const [weekNotifications, setWeekNotifications] = useState<Notification[]>([]);
    const [olderNotifications, setOlderNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true); // Use loading state

    const handleBack = () => {
        navigate(-1); // Navigate back to the previous page
    };

    // Fetch Notifications from API
    useEffect(() => {
        const loadNotifications = async () => {
            try {
                const notifications = await fetchNotifications();

                // Categorize notifications
                const today: Notification[] = [];
                const yesterday: Notification[] = [];
                const week: Notification[] = [];
                const older: Notification[] = [];

                notifications.forEach((notification: Notification) => {
                    const notificationDate = new Date(notification.notificationDate);

                    if (isToday(notificationDate)) {
                        today.push(notification);
                    } else if (isYesterday(notificationDate)) {
                        yesterday.push(notification);
                    } else if (isThisWeek(notificationDate)) {
                        week.push(notification);
                    } else {
                        older.push(notification);
                    }
                });

                setTodayNotifications(today);
                setYesterdayNotifications(yesterday);
                setWeekNotifications(week);
                setOlderNotifications(older);
            } catch (error) {
                if (error instanceof Error) {
                    showToast('error', 'Error', error.message || 'Failed to fetch notifications.');
                } else {
                    showToast('error', 'Error', 'Failed to fetch notifications.');
                }
            } finally {
                setLoading(false);
            }
        };

        loadNotifications();
    }, []);

    return (
        <div className="min-h-screen bg-[#F5F9F7] flex flex-col items-center px-4 pt-6 pb-28 md:pb-28">
            {/* Reusable Sticky Header */}
            <StickyHeader
                title="Notifications"
                onBackClick={handleBack}
                customClassName="mb-2"
            />

            {/* Notifications by Category */}
            <div className="w-full max-w-md bg-white rounded-lg p-4 shadow-lg mt-2">
                {loading ? (
                    <>
                        <SkeletonLoader />
                        <SkeletonLoader />
                        <SkeletonLoader />
                    </>
                ) : (
                    <>
                        {/* Today Notifications */}
                        {todayNotifications.length > 0 && (
                            <>
                                <h3 className="text-lg font-bold mb-4">Today</h3>
                                {todayNotifications.map(notification => (
                                    <NotificationItem key={notification.id} notification={notification} />
                                ))}
                            </>
                        )}

                        {/* Yesterday's Notifications */}
                        {yesterdayNotifications.length > 0 && (
                            <>
                                <h3 className="text-lg font-bold mt-6 mb-4">Yesterday</h3>
                                {yesterdayNotifications.map(notification => (
                                    <NotificationItem key={notification.id} notification={notification} />
                                ))}
                            </>
                        )}

                        {/* This Week's Notifications */}
                        {weekNotifications.length > 0 && (
                            <>
                                <h3 className="text-lg font-bold mt-6 mb-4">This Week</h3>
                                {weekNotifications.map(notification => (
                                    <NotificationItem key={notification.id} notification={notification} />
                                ))}
                            </>
                        )}

                        {/* Older Notifications */}
                        {olderNotifications.length > 0 && (
                            <>
                                <h3 className="text-lg font-bold mt-6 mb-4">Older</h3>
                                {olderNotifications.map(notification => (
                                    <NotificationItem key={notification.id} notification={notification} />
                                ))}
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

// Separate Notification Item component for reuse
const NotificationItem: React.FC<{ notification: Notification }> = ({ notification }) => {
    const formattedDate = format(new Date(notification.notificationDate), 'dd MMM, yyyy hh:mm a');

    return (
        <div className="flex justify-between items-center mb-3 p-3 rounded-lg bg-[#EBF9EC]">
            <div className="flex items-center">
                <MdOutlineCalendarToday size={24} className="text-black mr-4" />
                <div>
                    <h4 className="font-semibold">{notification.header}</h4>
                    <p className="text-sm text-gray-500">{notification.message}</p>
                </div>
            </div>
            <p className="text-sm text-gray-500 text-wrap">{formattedDate}</p>
        </div>
    );
};

// Skeleton Loader Component
const SkeletonLoader: React.FC = () => (
    <Box mb={2}>
        <Skeleton animation="wave" variant="text" height={40} />
        <Skeleton animation="wave" variant="rectangular" height={80} />
    </Box>
);

export default NotificationsPage;