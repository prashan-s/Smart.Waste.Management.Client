import React from 'react';
import Button from '@components/client/Button';
import { useNavigate } from 'react-router-dom';

const OnboardingPage: React.FC = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/client/sign-in');
    };

    return (
        <div className="bg-[url('/src/assets/images/onboarding.png')] bg-cover bg-center h-screen">
            {/* CTA Button */}
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-10">
                <Button label="Try Now" className="bg-primary text-black text-lg font-semibold py-2 px-8" onClick={handleButtonClick} />
            </div>
        </div>
    );
};

export default OnboardingPage;