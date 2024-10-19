import { showToast } from '@utils/toastService';
import axios from 'axios';

const BASE_URL = process.env.API_URL;

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Helper function to get token from sessionStorage
const getAccessToken = () => {
    try {
        const token = sessionStorage.getItem('accessToken');
        return token ? JSON.parse(token) : null;
    } catch (error) {
        console.error("Error retrieving access token from sessionStorage:", error);
        return null;
    }
};

// Add an interceptor to include Bearer Token
axiosInstance.interceptors.request.use((config) => {
    const accessToken = getAccessToken(); // Retrieve token directly from sessionStorage
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`; // Set Bearer token
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Add an interceptor to handle errors globally
axiosInstance.interceptors.response.use(
    (response) => {
        // Check if the response contains a success message and show success toast
        const successMessage = response.data?.Message || response.data?.message || null;
        if (successMessage) {
            showToast('success', 'Success', successMessage); // Show success toast
        }

        // If the response is successful, simply return the response
        return response;
    },
    (error) => {
        // Here we handle any error responses
        const statusCode = error.response ? error.response.status : null;
        const errorMessage = error.response?.data?.Message || error.response?.data?.message || 'An error occurred';

        // Show the toast
        // showToast('error', 'Error', errorMessage);

        return Promise.reject({
            statusCode,
            errorMessage,
        });
    }
);

export default axiosInstance;