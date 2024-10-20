import React from 'react';

interface HeaderProps {
    title: string;
    subtitle?: string;
    position?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, position }) => {
    return (
        <div className={`${position ? position : 'text-left'}`}>
            <h1 className="text-3xl font-bold text-black mb-1">{title}</h1>
            {subtitle && <p className="text-black font-medium">{subtitle}</p>}
        </div>
    );
};

export default Header;