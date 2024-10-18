import React, { useState, useEffect } from 'react';
import OTPInput from 'react-otp-input';
import { useNavigate } from 'react-router-dom';
import Button from '@components/client/Button';
import enterOtp from '@assets/images/enter-otp.png';

const ResetPasswordOtpPage: React.FC = () => {
    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(30); // Start with 30 seconds
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            if (timer > 0) {
                setTimer(timer - 1);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    const handleOtpChange = (otpValue: string) => {
        setOtp(otpValue);
    };

    const handleSubmitOtp = () => {
        // Handle OTP validation logic here
        console.log('OTP Submitted: ', otp);
        navigate('/client/reset-password-success');
    };

    const handleResendCode = () => {
        setTimer(30); // Reset the timer
        // Logic to resend the OTP code can go here
        console.log('OTP Resent');
    };

    const handleSendEmail = () => {
        // Navigate to reset password via email
        navigate('/client/reset-password-email');
    };

    return (
        <div className="min-h-screen bg-[#F5F9F7] flex flex-col items-center justify-center px-6 py-10">
            {/* OTP Screen Image */}
            <div className="w-full mb-10 flex justify-center">
                <img
                    src={enterOtp}
                    alt="OTP Screen"
                    className="w-72 h-56"
                />
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
                                background: '#ffffff'
                            }}
                        />
                    )}
                />
            </div>

            {/* Timer */}
            <div className="text-center text-gray-600 text-sm mt-2">
                {timer > 0 ? `00:${timer < 10 ? `0${timer}` : timer}` : 'Resend available'}
            </div>

            {/* Submit/Resend Button */}
            <div className="w-full mt-6 max-w-xs">
                {timer > 0 ? (
                    <Button
                        label="Done"
                        onClick={handleSubmitOtp}
                        className="w-full bg-tertiary text-white text-lg font-semibold py-2"
                    />
                ) : (
                    <Button
                        label="Resend"
                        onClick={handleResendCode}
                        className="w-full bg-tertiary text-white text-lg font-semibold py-2"
                    />
                )}
            </div>

            {/* Resend via Email Link */}
            <div className="mt-6 text-sm text-center text-gray-600">
                Didn't get code?{' '}
                <button onClick={handleSendEmail} className="text-[#00A3FF] hover:underline">
                    Send Email
                </button>
            </div>
        </div>
    );
};

export default ResetPasswordOtpPage;