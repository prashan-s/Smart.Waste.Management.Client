import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Header from '@components/client/Header';
import Button from '@components/client/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

// Define the validation schema using Yup for both steps
const schemaStep1 = yup.object().shape({
    name: yup.string().required('Name is required'),
    contactNumber: yup.string().required('Contact number is required'),
    address: yup.string().required('Address is required'),
    type: yup.string().required('Select Household or Business'),
});

const schemaStep2 = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
});

// Define types for form inputs
interface ISignUpFormStep1 {
    name: string;
    contactNumber: string;
    address: string;
    type: string;
}

interface ISignUpFormStep2 {
    email: string;
    password: string;
    confirmPassword: string;
}

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    // Step 1 form setup
    const {
        register: registerStep1,
        handleSubmit: handleSubmitStep1,
        formState: { errors: errorsStep1 },
    } = useForm<ISignUpFormStep1>({
        resolver: yupResolver(schemaStep1),
    });

    // Step 2 form setup
    const {
        register: registerStep2,
        handleSubmit: handleSubmitStep2,
        formState: { errors: errorsStep2 },
    } = useForm<ISignUpFormStep2>({
        resolver: yupResolver(schemaStep2),
    });

    // Handle form submission for Step 1
    const onSubmitStep1: SubmitHandler<ISignUpFormStep1> = () => {
        setStep(2); // Move to step 2 on successful validation
    };

    // Handle form submission for Step 2
    const onSubmitStep2: SubmitHandler<ISignUpFormStep2> = (data) => {
        console.log('Registration Data:', data);
        navigate('/client'); // Navigate to client dashboard after successful registration
    };

    const handleLoginRedirect = () => {
        navigate('/client/sign-in');
    };

    return (
        <div className="min-h-screen bg-clientAppBackground flex flex-col items-center justify-start px-6 py-20">
            {/* Header Section */}
            <div className="w-full flex items-center justify-start max-w-md">
                <Header title="Register" subtitle="Urban Eco New User Registration" />
            </div>

            {/* Form Section */}
            <div className="flex-grow flex-col flex justify-center items-center w-full">
                <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
                    {step === 1 ? (
                        <form onSubmit={handleSubmitStep1(onSubmitStep1)}>
                            {/* Name Field */}
                            <TextField
                                {...registerStep1('name')}
                                label="Name"
                                variant="standard"
                                fullWidth
                                error={!!errorsStep1.name}
                                helperText={errorsStep1.name ? errorsStep1.name.message : ''}
                                placeholder="Enter Full Name"
                                margin="normal"
                                color="success"
                                autoComplete="off"
                                InputLabelProps={{ shrink: true }}
                            />

                            {/* Contact Number Field */}
                            <TextField
                                {...registerStep1('contactNumber')}
                                label="Contact Number"
                                variant="standard"
                                fullWidth
                                error={!!errorsStep1.contactNumber}
                                helperText={errorsStep1.contactNumber ? errorsStep1.contactNumber.message : ''}
                                placeholder="07X-XXXXXXX"
                                margin="normal"
                                color="success"
                                autoComplete="off"
                                InputLabelProps={{ shrink: true }}
                            />

                            {/* Address Field */}
                            <TextField
                                {...registerStep1('address')}
                                label="Address"
                                variant="standard"
                                fullWidth
                                error={!!errorsStep1.address}
                                helperText={errorsStep1.address ? errorsStep1.address.message : ''}
                                placeholder="Enter Address"
                                margin="normal"
                                color="success"
                                autoComplete="off"
                                InputLabelProps={{ shrink: true }}
                            />

                            {/* Type Field (Household or Business) */}
                            <TextField
                                {...registerStep1('type')}
                                select
                                label="Household or Business"
                                variant="standard"
                                fullWidth
                                error={!!errorsStep1.type}
                                helperText={errorsStep1.type ? errorsStep1.type.message : ''}
                                margin="normal"
                                color="success"
                                InputLabelProps={{ shrink: true }}
                            >
                                <MenuItem value="household">Household</MenuItem>
                                <MenuItem value="business">Business</MenuItem>
                            </TextField>

                            {/* Next Button */}
                            <div className="w-full mt-6">
                                <Button label="Next" className="w-full bg-tertiary text-white text-lg font-semibold py-2 px-8" />
                            </div>
                        </form>
                    ) : (
                        <form onSubmit={handleSubmitStep2(onSubmitStep2)}>
                            {/* Email Field */}
                            <TextField
                                {...registerStep2('email')}
                                label="Email"
                                variant="standard"
                                fullWidth
                                error={!!errorsStep2.email}
                                helperText={errorsStep2.email ? errorsStep2.email.message : ''}
                                placeholder="xxxxx@gmail.com"
                                margin="normal"
                                color="success"
                                autoComplete="off"
                                InputLabelProps={{ shrink: true }}
                            />

                            {/* Password Field */}
                            <TextField
                                {...registerStep2('password')}
                                label="Password"
                                variant="standard"
                                fullWidth
                                type="password"
                                error={!!errorsStep2.password}
                                helperText={errorsStep2.password ? errorsStep2.password.message : ''}
                                placeholder="********"
                                margin="normal"
                                color="success"
                                autoComplete="new-password"
                                InputLabelProps={{ shrink: true }}
                            />

                            {/* Confirm Password Field */}
                            <TextField
                                {...registerStep2('confirmPassword')}
                                label="Re-Enter Password"
                                variant="standard"
                                fullWidth
                                type="password"
                                error={!!errorsStep2.confirmPassword}
                                helperText={errorsStep2.confirmPassword ? errorsStep2.confirmPassword.message : ''}
                                placeholder="********"
                                margin="normal"
                                color="success"
                                autoComplete="new-password"
                                InputLabelProps={{ shrink: true }}
                            />

                            {/* Register Button */}
                            <div className="w-full mt-6">
                                <Button label="Register" className="w-full bg-tertiary text-white text-lg font-semibold py-2 px-8" />
                            </div>
                        </form>
                    )}

                    {/* Login Link */}
                    <div className="mt-6 text-sm text-center">
                        <span>Already Registered? </span>
                        <button onClick={handleLoginRedirect} className="text-tertiary hover:underline">
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;