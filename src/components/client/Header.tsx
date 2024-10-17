import React from 'react';

interface HeaderProps {
    title: string;
    subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
    return (
        <div className="text-center">
            <h1 className="text-4xl font-bold text-textLightBlack mb-4">{title}</h1>
            {subtitle && <p className="text-textSlateGray max-w-xs mx-auto">{subtitle}</p>}
        </div>
    );
};

export default Header;