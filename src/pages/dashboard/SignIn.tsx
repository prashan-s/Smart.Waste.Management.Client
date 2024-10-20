import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, Checkbox, FormControlLabel, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { signInUser } from '@services/userService';
import { useAuth } from '@contexts/AuthContext';
import { showToast } from '@utils/toastService';
import { useNavigate } from 'react-router-dom';

// Validation Schema
const schema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
}).required();

interface IFormInput {
    email: string;
    password: string;
}

const SignInButton = styled(Button)({
    background: 'linear-gradient(0deg, #009963 0%, #009963 100%)',
    color: '#fff',
    '&:hover': {
        backgroundColor: '#006644',
    },
});

const SignUpButton = styled('a')({
    color: '#005134',
    cursor: 'pointer',
});

const SignInPage: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth(); // Use login from AuthContext to set the token

    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            const { accessToken } = await signInUser(data); // Call the signInUser function
            login(accessToken); // Store the token in session storage using the login function
            showToast('success', 'Success', 'Sign-in successful');
            navigate('/dashboard'); // Redirect after successful login
        } catch (error) {
            // Type narrowing for error object
            if (error instanceof Error) {
                showToast('error', 'Error', error.toString());
            } else {
                showToast('error', 'Error', 'Invalid email or password.');
            }
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-50">
            <div className="w-full max-w-md">
                <div className="bg-white shadow-lg rounded-2xl px-8 py-10">
                    <div className="flex justify-center mb-8">
                        <span className="text-5xl px-4 py-4 mr-2 bg-primary rounded-md text-white">&#x25BC;</span>
                    </div>
                    <h1 className="text-center text-5xl font-semibold">URBAN ECO</h1>
                    <p className="text-center text-textLightGray mt-4">Please enter your Employee login.</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
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
                            <FormControlLabel control={<Checkbox />} label="Remember me" />
                        </div>
                        <Box textAlign="center">
                            <SignInButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                className="h-10"
                            >
                                Sign in
                            </SignInButton>
                        </Box>
                        <Box textAlign="center" className="mt-4">
                            <p>Don’t have an account? <SignUpButton href="/dashboard/sign-up">Sign Up</SignUpButton></p>
                        </Box>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;