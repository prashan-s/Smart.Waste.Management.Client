import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Button from '@components/client/Button';
import { useNavigate } from 'react-router-dom';
import codeTyping from '@assets/images/code-typing.png';
import resetForm from '@assets/images/reset-form.png';
import useSessionStorage from '@hooks/useSessionStorage';
import { requestOtpForResetPassword } from '@services/userService';
import { showToast } from '@utils/toastService';

// Define the validation schema using Yup
const schema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('New password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), ''], 'Passwords must match')
        .required('Confirming new password is required'),
});

// Define types for form inputs
interface IResetPasswordForm {
    email: string;
    password: string;
    confirmPassword: string;
}

const ResetPasswordPage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [, setSessionEmail] = useSessionStorage('resetEmail', ''); // Store email in session storage
    const [, setSessionPassword] = useSessionStorage('resetPassword', ''); // Store password in session storage

    // Set up the form with useForm and the Yup resolver
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IResetPasswordForm>({
        resolver: yupResolver(schema),
    });

    // Handle form submission for requesting OTP
    const onSubmit: SubmitHandler<IResetPasswordForm> = async (data) => {
        setLoading(true);
        try {
            await requestOtpForResetPassword(data.email); // Call API for requesting OTP
            setSessionEmail(data.email); // Save email to session storage
            setSessionPassword(data.password); // Save password to session storage
            showToast('success', 'OTP Sent', 'An OTP has been sent to your email.');
            navigate('/client/reset-password-otp'); // Navigate to the OTP verification page
        } catch (error) {
            // Type narrowing for error object
            if (error instanceof Error) {
                showToast('error', 'Error', error?.message || 'Failed to send OTP.');
            } else {
                showToast('error', 'Error', 'Failed to send OTP.');
            }
        } finally {
            setLoading(false); // Reset the loading state
        }
    };

    return (
        <div className="min-h-screen bg-[#F5F9F7] flex flex-col items-center justify-start px-6 py-10">
            {/* Reset Form Image */}
            <div className="relative w-full max-w-md my-10 flex justify-center">
                <img
                    src={resetForm}
                    alt="Password Reset Form"
                    className="w-56 h-72"
                />
                {/* Code Typing Image - Positioned in the bottom right */}
                <img
                    src={codeTyping}
                    alt="Code Typing"
                    className="absolute bottom-0 right-0 w-48 h-48 object-contain z-10"
                />
            </div>

            {/* Heading and Subtitle */}
            <div className="text-center">
                <h2 className="text-2xl font-bold text-textLightBlack">Reset Your Password</h2>
                <p className="mt-2 text-sm text-gray-600">Enter your email and create a new password</p>
            </div>

            {/* Password Reset Form */}
            <div className="w-full max-w-md p-6">
                {/* Email Field */}
                <TextField
                    {...register('email')}
                    label="Email Address"
                    variant="standard"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : ''}
                    InputLabelProps={{
                        shrink: true, sx: {
                            color: "#404040",
                            fontSize: 18,
                            fontWeight: 600,
                            "&.MuiOutlinedInput-notchedOutline": { fontSize: "28px" }
                        }
                    }}
                    inputProps={{
                        autoComplete: 'off'
                    }}
                    margin="normal"
                    color="success"
                />

                {/* New Password Field */}
                <TextField
                    {...register('password')}
                    label="Create New Password"
                    variant="standard"
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    error={!!errors.password}
                    helperText={errors.password ? errors.password.message : ''}
                    InputLabelProps={{
                        shrink: true, sx: {
                            color: "#404040",
                            fontSize: 18,
                            fontWeight: 600,
                            "&.MuiOutlinedInput-notchedOutline": { fontSize: "28px" }
                        }
                    }}
                    inputProps={{
                        autoComplete: 'off'
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                    {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    margin="normal"
                    color="success"
                />

                {/* Confirm Password Field */}
                <TextField
                    {...register('confirmPassword')}
                    label="Confirm New Password"
                    variant="standard"
                    fullWidth
                    type={showConfirmPassword ? 'text' : 'password'}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
                    InputLabelProps={{
                        shrink: true, sx: {
                            color: "#404040",
                            fontSize: 18,
                            fontWeight: 600,
                            "&.MuiOutlinedInput-notchedOutline": { fontSize: "28px" }
                        }
                    }}
                    inputProps={{
                        autoComplete: 'off'
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                                    {showConfirmPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    margin="normal"
                    color="success"
                />

                {/* Submit Button */}
                <div className="w-full mt-6">
                    <Button
                        label={loading ? 'Loading...' : 'Send OTP'}
                        onClick={handleSubmit(onSubmit)}
                        className={`w-full ${loading ? 'bg-gray-400' : 'bg-tertiary'} text-white text-lg font-semibold py-2`}
                        loading={loading}
                    />
                    {/* <Button label="Change Password" onClick={handleSubmit(onSubmit)} className="w-full bg-tertiary text-white text-lg font-semibold py-2" /> */}
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;