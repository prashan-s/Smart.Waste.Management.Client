import React, { useState } from 'react';

const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

interface PreferredCollectionDaysProps {
    heading: string; // This will be passed down to control the heading text
    showMessage: boolean; // Controls whether to show the message
    onDaySelect: () => void; // Callback to notify when a day is selected
}

const PreferredCollectionDays: React.FC<PreferredCollectionDaysProps> = ({
    heading,
    showMessage,
    onDaySelect,
}) => {
    const [selectedDay, setSelectedDay] = useState<number | null>(null); // No default day selected

    // Handle day selection and notify parent
    const handleDayClick = (index: number) => {
        setSelectedDay(index);
        onDaySelect(); // Notify parent when a day is selected
    };

    return (
        <div className="mt-4">
            <h3 className="text-base md:text-lg font-bold">{heading}</h3>
            <div className="flex mt-2 gap-2 justify-between md:gap-4">
                {days.map((day, index) => (
                    <div
                        key={index}
                        className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full cursor-pointer ${selectedDay === index
                            ? 'bg-tertiary text-white'
                            : 'bg-[#92E596] text-white'
                            }`}
                        onClick={() => handleDayClick(index)}
                    >
                        {day}
                    </div>
                ))}
            </div>

            {/* Show the message only if showMessage is true */}
            {showMessage && (
                <p className="text-xs md:text-sm text-gray-600 mt-2 text-center">
                    Changing this will take effect in the next cycle, and the next collection date will
                    be assigned accordingly.
                </p>
            )}
        </div>
    );
};

export default PreferredCollectionDays;