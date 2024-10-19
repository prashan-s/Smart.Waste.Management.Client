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