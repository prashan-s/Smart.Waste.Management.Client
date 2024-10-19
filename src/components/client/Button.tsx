import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

interface ButtonProps {
    label: string;
    onClick?: () => void;
    className?: string;
    loading?: boolean; // New prop for loading state
    disabledClassName?: string;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, className = '', loading = false }) => {
    return (
        <button
            onClick={onClick}
            className={`rounded-full focus:outline-none shadow-md transition-all flex items-center justify-center ${loading ? 'bg-gray-400' : 'hover:bg-tertiary'} ${className}`}
            disabled={loading} // Disable the button when loading
        >
            {loading ? (
                <CircularProgress size={24} thickness={5} color="success" /> // Spinner color is tertiary
            ) : (
                label
            )}
        </button>
    );
};

export default Button;