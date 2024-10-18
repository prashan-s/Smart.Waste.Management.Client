import React, { useState, useEffect } from 'react';
import { IoArrowBack } from 'react-icons/io5';

interface StickyHeaderProps {
    title: string;
    onBackClick: () => void;
    isSticky?: boolean; // Allow the caller to decide if they want it sticky
    customClassName?: string; // Allow for additional custom styling
}

const StickyHeader: React.FC<StickyHeaderProps> = ({
    title,
    onBackClick,
    isSticky = true,
    customClassName = '',
}) => {
    const [isHeaderSticky, setIsHeaderSticky] = useState(false);

    useEffect(() => {
        if (!isSticky) return;

        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            // Trigger sticky behavior near the bottom of the page
            if (scrollPosition >= documentHeight - 100) {
                setIsHeaderSticky(true);
            } else {
                setIsHeaderSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isSticky]);

    return (
        <>
            <div
                className={`w-full flex items-center max-w-md mx-auto px-4 ${customClassName} ${isHeaderSticky
                    ? 'fixed top-0 bg-white shadow-lg py-3 z-50 transition-all duration-300 ease-in-out'
                    : 'relative py-3 transition-all duration-300 ease-in-out'
                    }`}
            >
                <IoArrowBack size={24} className="cursor-pointer" onClick={onBackClick} />
                <h1 className="ml-4 text-2xl font-extrabold">{title}</h1>
            </div>
            {isHeaderSticky && <div className="h-16 w-full"></div>} {/* Spacer */}
        </>
    );
};

export default StickyHeader;