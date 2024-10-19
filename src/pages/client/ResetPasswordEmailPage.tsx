import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@components/client/Button';
import emailVerificationImage from '@assets/images/reset-otp-email.png';
import { TextField } from '@mui/material';
import { requestOtpForEmail, resetPasswordWithOtp } from '@services/userService'; // Import the service
import useSessionStorage from '@hooks/useSessionStorage'; // Hook to access session storage
import { showToast } from '@utils/toastService';

// Validation schema for the form using Yup
const schema = yup.object().shape({
    emailCode: yup
        .string()
        .matches(/^\d{6}$/, 'Code must be exactly 6 digits')
        .required('Verification code is required'),
});

// Define the form inputs
interface IEmailVerificationForm {
    emailCode: string;
}

const PasswordResetEmailPage: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [storedEmail] = useSessionStorage('resetEmail', ''); // Retrieve email from session storage
    const [storedPassword] = useSessionStorage('resetPassword', ''); // Retrieve password from session storage

    // Mask the email address for display
    const maskedEmail = storedEmail ? storedEmail.replace(/(.{2})(.*)(?=@)/, (_: string, first: string, middle: string) => first + middle.replace(/./g, '*')) : '';

    // Set up useForm with Yup validation
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IEmailVerificationForm>({
        resolver: yupResolver(schema),
    });

    // Call API when page loads to request OTP via email
    useEffect(() => {
        const fetchOtp = async () => {
            setLoading(true);
            try {
                await requestOtpForEmail(storedEmail); // Call the API to request OTP
                showToast('success', 'OTP Sent', `A verification code has been sent to ${maskedEmail}.`);
            } catch (error) {
                // Type narrowing for error object
                if (error instanceof Error) {
                    showToast('error', 'Error', error.message || 'Failed to send OTP to email.');
                } else {
                    showToast('error', 'Error', 'Failed to send OTP to email.');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchOtp(); // Call the function on page load
    }, [storedEmail, maskedEmail]);

    // Handle form submission
    const onSubmit: SubmitHandler<IEmailVerificationForm> = async (data) => {
        setLoading(true);
        try {
            await resetPasswordWithOtp(storedEmail, data.emailCode, storedPassword); // Call reset password API
            showToast('success', 'Success', 'Your password has been reset.');
            navigate('/client/sign-in'); // Redirect to sign-in page
        } catch (error) {
            // Type narrowing for error object
            if (error instanceof Error) {
                showToast('error', 'Error', error.message || 'Failed to reset password.');
            } else {
                showToast('error', 'Error', 'Failed to reset password.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F5F9F7] flex flex-col items-center justify-center px-6 py-10">
            {/* Image */}
            <div className="w-full flex justify-center">
                <img
                    src={emailVerificationImage}
                    alt="Email Verification"
                    className="w-72 h-72"
                />
            </div>

            {/* Heading and Instructions */}
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-textLightBlack">Email Verification</h2>
                <p className="mt-4 text-sm text-gray-600">
                    We sent a verification code to your email {maskedEmail}.<br />
                    Please enter the code to sign in.
                </p>
            </div>

            {/* Email Code Input (MUI TextField) */}
            <div className="w-full max-w-xs mb-6">
                <TextField
                    {...register('emailCode')}
                    label="Enter the code"
                    variant="outlined"
                    fullWidth
                    error={!!errors.emailCode}
                    helperText={errors.emailCode ? errors.emailCode.message : ''}
                    InputLabelProps={{
                        shrink: true, sx: {
                            color: "#404040",
                            fontSize: 18,
                            fontWeight: 600,
                            "&.MuiOutlinedInput-notchedOutline": { fontSize: "28px" }
                        }
                    }}
                    inputProps={{
                        style: { fontSize: '1.25rem', padding: '10px', backgroundColor: '#ffffff' },
                    }}
                    color="success"
                />
            </div>

            {/* Submit Button */}
            <div className="w-full max-w-xs">
                <Button
                    label={loading ? 'Processing...' : 'Done'}
                    onClick={handleSubmit(onSubmit)}
                    className={`w-full ${loading ? 'bg-gray-400' : 'bg-tertiary'} text-white text-lg font-semibold py-2`}
                    loading={loading}
                />
            </div>
        </div>
    );
};

export default PasswordResetEmailPage;