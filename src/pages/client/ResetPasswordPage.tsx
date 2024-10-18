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

// Define the validation schema using Yup
const schema = yup.object().shape({
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), ''], 'Passwords must match')
        .required('Confirm password is required'),
});

// Define types for form inputs
interface IResetPasswordForm {
    password: string;
    confirmPassword: string;
}

const ResetPasswordPage: React.FC = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Set up the form with useForm and the Yup resolver
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IResetPasswordForm>({
        resolver: yupResolver(schema),
    });

    // Handle form submission
    const onSubmit: SubmitHandler<IResetPasswordForm> = (data) => {
        console.log('Reset Password Data:', data);
        navigate('/client/reset-password-success'); // Navigate to success screen after successful submission
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
                <p className="mt-2 text-sm text-gray-600">Enter your new password to change</p>
            </div>

            {/* Password Reset Form */}
            <div className="w-full max-w-md p-6">
                {/* New Password Field */}
                <TextField
                    {...register('password')}
                    label="Enter new Password"
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
                    label="Re Enter new Password"
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
                    <Button label="Change" onClick={handleSubmit(onSubmit)} className="w-full bg-tertiary text-white text-lg font-semibold py-2" />
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;