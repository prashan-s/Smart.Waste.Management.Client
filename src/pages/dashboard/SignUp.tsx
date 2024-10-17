import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { showToast } from '@utils/toastService';
import { signUpUser } from '@services/userService';

// Validation Schema for Sign Up
const schema = yup.object({
    fullName: yup.string().required('Full Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    mobileNumber: yup
        .string()
        .matches(/^[0-9]+$/, 'Mobile number must be digits')
        .min(10, 'Mobile number must be at least 10 digits')
        .max(15, 'Mobile number cannot be more than 15 digits')
        .required('Mobile Number is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
}).required();

interface IFormInput {
    fullName: string;
    email: string;
    mobileNumber: string;
    password: string;
    confirmPassword: string;
}

const SignUpButton = styled(Button)({
    background: 'linear-gradient(0deg, #009963 0%, #009963 100%)',
    color: '#fff',
    '&:hover': {
        backgroundColor: '#006644',
    },
});

const SignInLink = styled('a')({
    color: '#005134',
    cursor: 'pointer',
});

const SignUpPage: React.FC = () => {
    const navigate = useNavigate(); // Use navigate for redirecting after successful signup
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            // Prepare the request payload
            const payload = {
                mobileNumber: data.mobileNumber,
                email: data.email,
                password: data.password,
                fullName: data.fullName,
                fcmToken: "",
            };

            await signUpUser(payload); // Call the sign-up function from the service and make the API call

            // Handle successful signup
            showToast('success', 'Success', 'Sign up successful');
            navigate('/dashboard/sign-in'); // Redirect to sign-in page
        } catch (error) {
            console.error('Sign up error:', error);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-50">
            <div className="w-full max-w-md">
                <div className="bg-white shadow-lg rounded-2xl px-8 py-8">
                    <div className="flex justify-center mb-8">
                        <span className="text-5xl px-4 py-4 mr-2 bg-primary rounded-md text-white">&#x25BC;</span>
                    </div>
                    <h1 className="text-center text-5xl font-semibold">URBAN ECO</h1>
                    <p className="text-center text-textLightGray mt-4">Create your account</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
                        <div className="mb-4">
                            <TextField
                                label="Full Name"
                                variant="outlined"
                                size="small"
                                fullWidth
                                {...register('fullName')}
                                error={!!errors.fullName}
                                helperText={errors.fullName?.message}
                            />
                        </div>
                        <div className="mb-4">
                            <TextField
                                label="Email"
                                variant="outlined"
                                size="small"
                                fullWidth
                                {...register('email')}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </div>
                        <div className="mb-4">
                            <TextField
                                label="Mobile Number"
                                variant="outlined"
                                size="small"
                                fullWidth
                                {...register('mobileNumber')}
                                error={!!errors.mobileNumber}
                                helperText={errors.mobileNumber?.message}
                            />
                        </div>
                        <div className="mb-4">
                            <TextField
                                label="Password"
                                type="password"
                                variant="outlined"
                                size="small"
                                fullWidth
                                {...register('password')}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </div>
                        <div className="mb-4">
                            <TextField
                                label="Confirm Password"
                                type="password"
                                variant="outlined"
                                size="small"
                                fullWidth
                                {...register('confirmPassword')}
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword?.message}
                            />
                        </div>
                        <Box textAlign="center">
                            <SignUpButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                className="h-10"
                            >
                                Sign Up
                            </SignUpButton>
                        </Box>
                        <Box textAlign="center" className="mt-4">
                            <p>Already have an account? <SignInLink href="/dashboard/sign-in">Sign In</SignInLink></p>
                        </Box>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;