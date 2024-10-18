import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@components/client/Button';

const ResetPasswordSuccess: React.FC = () => {
    const navigate = useNavigate();

    const handleLoginRedirect = () => {
        navigate('/client/sign-in'); // Redirect to sign-in page after clicking login
    };

    return (
        <div className="min-h-screen bg-[#F5F9F7] flex flex-col items-center justify-center px-6">
            {/* Success Message */}
            <h2 className="text-3xl font-extrabold text-tertiary mb-4">Done!</h2>
            <p className="text-xl text-[#404040] font-bold mb-10">Password Reset Successfully!</p>

            {/* Login Button */}
            <Button label="Login" className="w-full max-w-md bg-tertiary text-white text-lg font-semibold py-2" onClick={handleLoginRedirect} />
        </div>
    );
};

export default ResetPasswordSuccess;