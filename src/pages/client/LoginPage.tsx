import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Header from '@components/client/Header'; // Corrected the path
import Button from '@components/client/Button';
import TextField from '@mui/material/TextField';
import { signInUser } from '@services/userService';
import { useAuth } from '@contexts/AuthContext';
import { showToast } from '@utils/toastService';

// Define the validation schema using Yup
const schema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

// Define the types for the form inputs
interface ILoginFormInputs {
    email: string;
    password: string;
}

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth(); // Use login from AuthContext to set the token

    // Set up the form with useForm and the Yup resolver
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ILoginFormInputs>({
        resolver: yupResolver(schema),
    });

    // Handle form submission
    const onSubmit: SubmitHandler<ILoginFormInputs> = async (data) => {
        try {
            const { accessToken } = await signInUser(data); // Call the signInUser function
            login(accessToken); // Store the token in session storage using the login function
            showToast('success', 'Success', 'Sign-in successful');
            navigate('/client'); // Redirect after successful login
        } catch (error: any) {
            showToast('error', 'Error', error.toString());
            console.error('Sign-in error:', error);
        }
    };

    const handleForgotPassword = () => {
        navigate('/client/reset-password');
    };

    const handleRegister = () => {
        navigate('/client/sign-up');
    };

    return (
        <div className="min-h-screen bg-clientAppBackground flex flex-col items-center justify-start px-6 py-20">
            {/* Header Section */}
            <div className="w-full flex items-center justify-start max-w-md">
                <Header title="Login" subtitle="Urban Eco User Login!" />
            </div>

            {/* Form Section */}
            <div className="flex-grow flex-col flex justify-center items-center w-full">
                <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
                    {/* Email Field */}
                    <TextField
                        {...register('email')}
                        label="Email"
                        variant="standard"
                        fullWidth
                        error={!!errors.email}
                        helperText={errors.email ? errors.email.message : ''}
                        placeholder="xxxxx@gmail.com"
                        margin="normal"
                        color="success"
                        autoComplete='off'
                        InputLabelProps={{
                            shrink: true, sx: {
                                color: "#404040",
                                fontSize: 18,
                                fontWeight: 600,
                                "&.MuiOutlinedInput-notchedOutline": { fontSize: "28px" }
                            }
                        }}
                    />

                    {/* Password Field */}
                    <TextField
                        {...register('password')}
                        label="Password"
                        variant="standard"
                        fullWidth
                        type="password"
                        error={!!errors.password}
                        helperText={errors.password ? errors.password.message : ''}
                        placeholder="●●●●●●●●●●●●"
                        margin="normal"
                        color="success"
                        autoComplete="new-password"
                        InputLabelProps={{
                            shrink: true, sx: {
                                color: "#404040",
                                fontSize: 18,
                                fontWeight: 600,
                                "&.MuiOutlinedInput-notchedOutline": { fontSize: "28px" }
                            }
                        }}
                    />

                    {/* Forgot Password Link */}
                    <div className="text-right mt-6">
                        <button type="button" onClick={handleForgotPassword} className="text-sm font-medium text-[#535353] underline">
                            Forgot Password?
                        </button>
                    </div>

                    {/* Login Button */}
                    <div className="w-full mt-6">
                        <Button label="Login" className="w-full bg-tertiary text-white text-lg font-semibold py-2 px-8" onClick={handleSubmit(onSubmit)} />
                    </div>

                    {/* Divider */}
                    <div className="w-full max-w-md mt-6 flex items-center justify-around gap-x-5">
                        <div className="border border-b-0 border-[#B3B3B3] w-full"></div>
                        <h4 className="text-textSlateGray w-full text-center text-nowrap">Signup with</h4>
                        <div className="border border-b-0 border-[#B3B3B3] w-full"></div>
                    </div>

                    {/* Register Link */}
                    <div className="mt-6 text-sm text-center">
                        <span>Don't have an account? </span>
                        <button onClick={handleRegister} className="text-tertiary hover:underline">
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;