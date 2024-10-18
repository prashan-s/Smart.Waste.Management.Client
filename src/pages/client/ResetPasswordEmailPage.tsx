import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@components/client/Button';
import emailVerificationImage from '@assets/images/reset-otp-email.png';
import { TextField } from '@mui/material';

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

    // Set up useForm with Yup validation
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IEmailVerificationForm>({
        resolver: yupResolver(schema),
    });

    // Handle form submission
    const onSubmit: SubmitHandler<IEmailVerificationForm> = (data) => {
        console.log('Email Verification Code:', data.emailCode);
        // Navigate to the appropriate page after successful submission
        navigate('/client/sign-in');
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
                    We sent a verification code to your email *******gt78@gmail.com.<br />
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
                    label="Done"
                    onClick={handleSubmit(onSubmit)}
                    className="w-full bg-tertiary text-white text-lg font-semibold py-2"
                />
            </div>
        </div>
    );
};

export default PasswordResetEmailPage;