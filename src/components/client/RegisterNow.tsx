import React from 'react';

interface RegisterNowProps {
    onClick: () => void;
}

const RegisterNow: React.FC<RegisterNowProps> = ({ onClick }) => {
    return (
        <div className="mt-4">
            <h3 className="text-base md:text-lg font-bold">Register Now</h3>
            <div className="flex justify-center items-center gap-x-5">
                <p className="text-sm md:text-md text-gray-600 text-wrap">Connect to Our Truck Routing</p>
                <button
                    onClick={onClick} // Trigger the click handler to expand content
                    className="bg-tertiary text-white text-sm md:text-base py-2 px-6 rounded-full"
                >
                    Register Now
                </button>
            </div>
        </div>
    );
};

export default RegisterNow;