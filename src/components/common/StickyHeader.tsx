import React from 'react';
import { IoArrowBack } from 'react-icons/io5';

interface StickyHeaderProps {
    title: string;
    onBackClick: () => void;
    customClassName?: string; // Allow for additional custom styling
}

const StickyHeader: React.FC<StickyHeaderProps> = ({
    title,
    onBackClick,
    customClassName = '',
}) => {
    return (
        <>
            <div
                className={`w-full bg-[#EBF9EC] border-b border-gray-300 shadow-md py-3 px-4 z-50 fixed top-0 left-0 ${customClassName}`}
                style={{ maxWidth: '100%' }} // Ensure full width
            >
                <div className="flex items-center">
                    <IoArrowBack size={24} className="cursor-pointer" onClick={onBackClick} />
                    <h1 className="ml-4 text-2xl font-extrabold">{title}</h1>
                </div>
            </div>
            {/* Spacer to prevent content from being hidden behind the sticky header */}
            <div className="h-16 w-full"></div>
        </>
    );
};

export default StickyHeader;