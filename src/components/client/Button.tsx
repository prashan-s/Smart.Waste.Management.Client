import React from 'react';

interface ButtonProps {
    label: string;
    onClick?: () => void;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, className = '' }) => {
    return (
        <button
            onClick={onClick}
            className={`rounded-full focus:outline-none shadow-md hover:bg-green-500 transition-all ${className}`}
        >
            {label}
        </button>
    );
};

export default Button;