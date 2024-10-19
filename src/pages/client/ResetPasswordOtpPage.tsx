import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import OTPInput from 'react-otp-input';
import { useNavigate } from 'react-router-dom';
import Button from '@components/client/Button';
import enterOtp from '@assets/images/enter-otp.png';
import { requestOtpForResetPassword, resetPasswordWithOtp } from '@services/userService';
import { SubmitHandler, useForm } from 'react-hook-form';
import useSessionStorage from '@hooks/useSessionStorage';
import { showToast } from '@utils/toastService';
import { yupResolver } from '@hookform/resolvers/yup';

// Validation schema
const schema = yup.object().shape({
    otp: yup.string().matches(/^\d{6}$/, 'OTP must be exactly 6 digits').required('OTP is required'),
});

// Form input types
interface IResetPasswordOtpForm {
    otp: string;
}

const ResetPasswordOtpPage: React.FC = () => {
    const [otp, setOtp] = useState(''); // OTP value
    const [timer, setTimer] = useState(30); // Countdown timer for resend OTP
    const [loading, setLoading] = useState(false); // Loading state for button
    const navigate = useNavigate();
    const [storedEmail] = useSessionStorage('resetEmail', ''); // Retrieve email from session storage
    const [storedPassword] = useSessionStorage('resetPassword', ''); // Retrieve password from session storage

    // react-hook-form setup with Yup validation schema
    const {
        handleSubmit,
        setValue, // Manually set the OTP value in react-hook-form
        trigger, // Manually trigger validation
        formState: { errors },
    } = useForm<IResetPasswordOtpForm>({
        resolver: yupResolver(schema),
    });

    // Timer countdown logic
    useEffect(() => {
        const interval = setInterval(() => {
            if (timer > 0) {
                setTimer((prev) => prev - 1);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    // Handle OTP input change and update form value
    const handleOtpChange = (otpValue: string) => {
        setOtp(otpValue);
        setValue('otp', otpValue); // Update react-hook-form value
        trigger('otp'); // Trigger validation to avoid manual errors
    };

    // Handle Resend OTP button click
    const handleResendCode = async () => {
        setTimer(30); // Reset the timer
        setLoading(true); // Show loading on resend button
        try {
            await requestOtpForResetPassword(storedEmail); // API call to request OTP again
            showToast('success', 'OTP Sent', 'A new OTP has been sent to your email.');
        } catch (error) {
            // Type narrowing for error object
            if (error instanceof Error) {
                showToast('error', 'Error', error.message || 'Failed to resend OTP.');
            } else {
                showToast('error', 'Error', 'Unknown error occurred.');
            }
        } finally {
            setLoading(false); // Stop loading state
        }
    };

    // Handle OTP form submission
    const onSubmit: SubmitHandler<IResetPasswordOtpForm> = async (data) => {
        setLoading(true); // Show loading on "Done" button
        try {
            await resetPasswordWithOtp(storedEmail, data.otp, storedPassword); // API call to reset password
            showToast('success', 'Success', 'Your password has been reset successfully.');
            navigate('/client/sign-in'); // Navigate to sign-in page after successful reset
        } catch (error) {
            // Type narrowing for error object
            if (error instanceof Error) {
                showToast('error', 'Error', error.message || 'Failed to reset password.');
            } else {
                showToast('error', 'Error', 'Unknown error occurred.');
            }
        } finally {
            setLoading(false);
        }
    };

    // Handle navigation to reset password via email page
    const handleSendEmail = () => {
        navigate('/client/reset-password-email');
    };

    return (
        <div className="min-h-screen bg-[#F5F9F7] flex flex-col items-center justify-center px-6 py-10">
            {/* OTP Screen Image */}
            <div className="w-full mb-10 flex justify-center">
                <img src={enterOtp} alt="OTP Screen" className="w-72 h-56" />
            </div>

            {/* Heading and Instructions */}
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-textLightBlack">Enter OTP</h2>
                <p className="mt-2 text-sm text-gray-600">
                    We texted your phone +XX XXXXXXXX47. <br /> Please enter the code to sign in.
                </p>
            </div>

            {/* OTP Input */}
            <div className="w-full max-w-md flex justify-center mb-4">
                <OTPInput
                    value={otp}
                    onChange={handleOtpChange}
                    numInputs={6}
                    renderSeparator={<span className="mx-2"></span>}
                    renderInput={(props) => (
                        <input
                            {...props}
                            style={{
                                width: '45px',
                                height: '50px',
                                borderRadius: '8px',
                                border: '1px solid #009963',
                                textAlign: 'center',
                                fontSize: '1.5rem',
                                color: '#000000',
                                outline: 'none',
                                background: '#ffffff',
                            }}
                        />
                    )}
                />
            </div>

            {/* Error Message */}
            {errors.otp && (
                <div className="text-center text-red-500 text-sm mt-2">{errors.otp.message}</div>
            )}

            {/* Timer */}
            <div className="text-center text-gray-600 text-sm mt-2">
                {timer > 0 ? `00:${timer < 10 ? `0${timer}` : timer}` : 'Resend available'}
            </div>

            {/* Submit/Resend Button */}
            <div className="w-full mt-6 max-w-xs">
                {timer > 0 ? (
                    <Button
                        label={loading ? 'Loading...' : 'Done'}
                        onClick={handleSubmit(onSubmit)}
                        className={`w-full ${loading ? 'bg-gray-400' : 'bg-tertiary'} text-white text-lg font-semibold py-2`}
                        loading={loading}
                    />
                ) : (
                    <Button
                        label={loading ? 'Resending...' : 'Resend'}
                        onClick={handleResendCode}
                        className={`w-full ${loading ? 'bg-gray-400' : 'bg-tertiary'} text-white text-lg font-semibold py-2`}
                        loading={loading}
                    />
                )}
            </div>

            {/* Resend via Email Link */}
            <div className="mt-6 text-sm text-center text-gray-600">
                Didn't get the code?{' '}
                <button onClick={handleSendEmail} className="text-[#00A3FF] hover:underline">
                    Send Email
                </button>
            </div>
        </div>
    );
};

export default ResetPasswordOtpPage;