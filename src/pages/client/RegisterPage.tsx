import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Header from '@components/client/Header';
import Button from '@components/client/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import useSessionStorage from '@hooks/useSessionStorage'; // Import the session storage hook
import { IoArrowBack } from 'react-icons/io5';
import { signUpUser } from '@services/userService';
import { showToast } from '@utils/toastService';

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
        .oneOf([yup.ref('password'), undefined], 'Passwords must match')
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
    const [loading, setLoading] = useState(false); // State for managing loading

    // Using session storage to keep form data across page refreshes
    const [formDataStep1, setFormDataStep1] = useSessionStorage('step1Data', null);
    const [formDataStep2, setFormDataStep2] = useSessionStorage('step2Data', null);
    const [currentStep, setCurrentStep] = useSessionStorage('currentStep', 1); // Add session storage for step

    // Step 1 form setup
    const {
        register: registerStep1,
        handleSubmit: handleSubmitStep1,
        setValue: setValueStep1, // For setting default values
        formState: { errors: errorsStep1 },
    } = useForm<ISignUpFormStep1>({
        resolver: yupResolver(schemaStep1),
    });

    // Step 2 form setup
    const {
        register: registerStep2,
        handleSubmit: handleSubmitStep2,
        setValue: setValueStep2, // For setting default values
        formState: { errors: errorsStep2 },
    } = useForm<ISignUpFormStep2>({
        resolver: yupResolver(schemaStep2),
    });

    // Populate fields from session storage on page load
    useEffect(() => {
        // Populate Step 1 data
        if (formDataStep1) {
            setValueStep1('name', formDataStep1.name);
            setValueStep1('contactNumber', formDataStep1.contactNumber);
            setValueStep1('address', formDataStep1.address);
            setValueStep1('type', formDataStep1.type);
        }

        // Populate Step 2 data
        if (formDataStep2) {
            setValueStep2('email', formDataStep2.email);
            setValueStep2('password', formDataStep2.password);
            setValueStep2('confirmPassword', formDataStep2.confirmPassword);
        }
    }, [setValueStep1, setValueStep2, formDataStep1, formDataStep2]);

    // Handle form submission for Step 1
    const onSubmitStep1: SubmitHandler<ISignUpFormStep1> = (data) => {
        setFormDataStep1(data); // Save step 1 data to session storage
        setCurrentStep(2); // Save step 2 in session storage
    };

    // Handle form submission for Step 2 (API Call)
    const onSubmitStep2: SubmitHandler<ISignUpFormStep2> = async (data) => {
        setFormDataStep2(data); // Save step 2 data to session storage

        const payload = {
            mobileNumber: formDataStep1.contactNumber,
            email: data.email,
            password: data.password,
            fullName: formDataStep1.name,
            fcmToken: '',
        };

        setLoading(true); // Set loading to true before the API call
        try {
            await signUpUser(payload); // Call the sign-up function from the service and make the API call

            // Clear session storage after successful registration
            sessionStorage.removeItem('step1Data');
            sessionStorage.removeItem('step2Data');
            sessionStorage.removeItem('currentStep');

            // Navigate to client homepage
            showToast('success', 'Success', 'Sign up successful');
            navigate('/client/sign-in');
        } catch (error) {
            console.error('Error during registration:', error);
        } finally {
            setLoading(false); // Reset loading state after API call is completed
        }
    };

    // // Handle form submission for Step 2
    // const onSubmitStep2: SubmitHandler<ISignUpFormStep2> = (data) => {
    //     setFormDataStep2(data); // Save step 2 data to session storage
    //     console.log('Registration Data:', { ...formDataStep1, ...data });
    //     sessionStorage.removeItem('step1Data'); // Clear data from session storage
    //     sessionStorage.removeItem('step2Data');
    //     sessionStorage.removeItem('currentStep'); // Clear current step from session storage
    //     navigate('/client'); // Navigate to client dashboard after successful registration
    // };

    const handleBackToStep1 = () => {
        setCurrentStep(1); // Navigate back to step 1 and save it in session storage
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
                    {currentStep === 1 ? (
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
                                InputLabelProps={{
                                    shrink: true, sx: {
                                        color: "#404040",
                                        fontSize: 18,
                                        fontWeight: 600,
                                        "&.MuiOutlinedInput-notchedOutline": { fontSize: "28px" }
                                    }
                                }}
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
                                InputLabelProps={{
                                    shrink: true, sx: {
                                        color: "#404040",
                                        fontSize: 18,
                                        fontWeight: 600,
                                        "&.MuiOutlinedInput-notchedOutline": { fontSize: "28px" }
                                    }
                                }}
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
                                InputLabelProps={{
                                    shrink: true, sx: {
                                        color: "#404040",
                                        fontSize: 18,
                                        fontWeight: 600,
                                        "&.MuiOutlinedInput-notchedOutline": { fontSize: "28px" }
                                    }
                                }}
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
                                InputLabelProps={{
                                    shrink: true, sx: {
                                        color: "#404040",
                                        fontSize: 18,
                                        fontWeight: 600,
                                        "&.MuiOutlinedInput-notchedOutline": { fontSize: "28px" }
                                    }
                                }}
                            >
                                <MenuItem value="household">Household</MenuItem>
                                <MenuItem value="business">Business</MenuItem>
                            </TextField>

                            {/* Next Button */}
                            <div className="w-full mt-6">
                                <Button label="Next" className="w-full bg-tertiary text-white text-lg font-semibold py-2 px-8" loading={loading} />
                            </div>
                        </form>
                    ) : (
                        <form onSubmit={handleSubmitStep2(onSubmitStep2)}>
                            {/* Back Arrow to go to Step 1 */}
                            <div className="flex justify-start mb-4">
                                <IoArrowBack size={24} className="cursor-pointer" onClick={handleBackToStep1} />
                            </div>

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
                                InputLabelProps={{
                                    shrink: true, sx: {
                                        color: "#404040",
                                        fontSize: 18,
                                        fontWeight: 600,
                                        "&.MuiOutlinedInput-notchedOutline": { fontSize: "28px" }
                                    }
                                }}
                                inputProps={{
                                    autoComplete: 'new-password'
                                }}
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
                                InputLabelProps={{
                                    shrink: true, sx: {
                                        color: "#404040",
                                        fontSize: 18,
                                        fontWeight: 600,
                                        "&.MuiOutlinedInput-notchedOutline": { fontSize: "28px" }
                                    }
                                }}
                                inputProps={{
                                    autoComplete: 'new-password'
                                }}
                            />

                            {/* Register Button */}
                            <div className="w-full mt-6">
                                <Button label="Register" className="w-full bg-tertiary text-white text-lg font-semibold py-2 px-8" loading={loading} />
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