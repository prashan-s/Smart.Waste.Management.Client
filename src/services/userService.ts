import axiosInstance from '@helper/axiosInstance';

interface SignUpData {
    fullName: string;
    email: string;
    mobileNumber: string;
    password: string;
    fcmToken?: string;
}

interface SignInData {
    email: string;
    password: string;
}

interface WasteCollectionDTO {
    userId: string;
    wasteTypeId: string;
    weight: number;
}

interface UpdateProfileData {
    fullName: string;
    email: string;
    mobileNumber: string;
    address: string;
}

// Sign-up function
export const signUpUser = (data: SignUpData) => {
    return axiosInstance.post('/user/register', data)
        .then(response => response.data)
        .catch(error => {
            throw error.response?.data?.message || 'Sign up failed';
        });
};

// Sign-in function
export const signInUser = (data: SignInData) => {
    return axiosInstance.post('/user/login', data)
        .then(response => {
            const { access_token, refresh_token } = response.data;
            return { accessToken: access_token, refreshToken: refresh_token };
        })
        .catch(error => {
            throw error.response?.data?.message || 'Sign in failed';
        });
};

// Request OTP for email reset
export const requestOtpForResetPassword = async (email: string) => {
    const response = await axiosInstance.post(`/user/request-otp?email=${email}`);
    return response.data; // Return response data without handling the toast here
};

// Reset Password API
export const resetPasswordWithOtp = async (email: string, otp: string, newPassword: string) => {
    const payload = {
        email,
        otp,
        password: newPassword,
    };

    const response = await axiosInstance.put('/user/reset-password', payload);
    return response.data; // Return response data without handling the toast here
};

// Request OTP via email
export const requestOtpForEmail = (email: string) => {
    return axiosInstance.post(`/user/request-otp-email?email=${email}`)
        .then(response => response.data)
        .catch(error => {
            throw error.response?.data?.message || 'Request OTP via email failed';
        });
};

// Fetch user profile function
export const fetchUserProfile = () => {
    return axiosInstance.get('/user/info')
        .then(response => response.data)
        .catch(error => {
            throw error.response?.data?.message || 'Failed to load profile data';
        });
};

// Update user profile function
export const updateUserProfile = (data: UpdateProfileData) => {
    return axiosInstance.put('/user/update', data)
        .then(response => response.data)
        .catch(error => {
            throw error.response?.data?.message || 'Profile update failed';
        });
};

export const scheduleGarbageCollection = async (collectionDay: string) => {
    return axiosInstance.post(`/user/register/garbage?collectionDay=${collectionDay}`)
        .then(response => response.data)
        .catch(error => {
            throw error.response?.data?.message || 'Failed to schedule collection.';
        });
};

// get category wise user points function
export const getCategoryPoints = (wasteTypeId: string) => {
    return axiosInstance.get(`/point/waste-type-point?wasteTypeId=${wasteTypeId}`)
        .then(response => response.data)
        .catch(error => {
            throw error.response?.data?.message || 'Points retrieval failed';
        });
};

// Get all users function
export const getAllUsers = () => {
    return axiosInstance.get('/user/all')
        .then(response => response.data)
        .catch(error => {
            throw error.response?.data?.message || 'Users retrieval failed';
        });
};

// Get all waste collections (newest to oldest) function
export const getAllWasteCollections = () => {
    return axiosInstance.get('/waste-collection/all')
        .then(response => response.data)
        .catch(error => {
            throw error.response?.data?.message || 'Waste collections retrieval failed';
        });
};

// Function to save a waste collection
export const saveWasteCollection = (data: WasteCollectionDTO) => {
    return axiosInstance.post('/waste-collection/collect', data)
        .then(response => response.data)
        .catch(error => {
            throw error.response?.data?.message || 'Saving waste collection failed';
        });
};

// Function to fetch waste type weights for the authenticated user
export const getWasteTypeWeightsForUser = () => {
    return axiosInstance.get('/point/chart-details')
        .then(response => response.data)
        .catch(error => {
            throw error.response?.data?.message || 'Failed to fetch chart details';
        });
};

// get waste type details function
export const getWasteTypeDetails = (wasteName: string) => {
    return axiosInstance.get(`/waste-type/waste/${wasteName}`)
        .then(response => response.data)
        .catch(error => {
            throw error.response?.data?.message || 'Waste Type data retrieval failed';
        });
};


// Get all waste types function
export const getAllWasteTypes = () => {
    return axiosInstance.get('/waste-type/all')
        .then(response => response.data)
        .catch(error => {
            throw error.response?.data?.message || 'Failed to retrieve waste types';
        });
};
