import axiosInstance from '@helper/axiosInstance';

interface SignUpData {
    fullName: string;
    email: string;
    mobileNumber: string;
    password: string;
    fcmToken?: string;
}

// Sign-up function
export const signUpAdmin = (data: SignUpData) => {
    return axiosInstance.post('/admin/register', data)
        .then(response => response.data)
        .catch(error => {
            throw error.response?.data?.message || 'Sign up failed';
        });
};