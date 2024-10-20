import axiosInstance from '@helper/axiosInstance';

// Define a function to fetch notifications from the API
export const fetchNotifications = async () => {
    return await axiosInstance.get('/user/notification')
        .then(response => response.data)
        .catch(error => {
            throw error.response?.data?.message || 'Failed to fetch notifications.';
        });
};