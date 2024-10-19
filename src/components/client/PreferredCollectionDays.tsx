import React, { useState, useEffect } from 'react';

const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

interface PreferredCollectionDaysProps {
    heading: string;
    showMessage: boolean;
    onDaySelect: (dayIndex: number) => void;
    selectedDay: number | null; // Accept the selectedDay as a prop from parent
}

const PreferredCollectionDays: React.FC<PreferredCollectionDaysProps> = ({
    heading,
    showMessage,
    onDaySelect,
    selectedDay, // Get selectedDay from parent
}) => {
    const [localSelectedDay, setLocalSelectedDay] = useState<number | null>(null);

    // Sync local state with prop when it changes
    useEffect(() => {
        setLocalSelectedDay(selectedDay); // Sync with prop
    }, [selectedDay]);

    const handleDayClick = (index: number) => {
        setLocalSelectedDay(index); // Update local state
        onDaySelect(index); // Notify parent about the selected day
    };

    return (
        <div className="mt-4">
            <h3 className="text-sm md:text-lg font-medium text-gray-500">{heading}</h3>
            <div className="flex mt-2 gap-2 justify-between md:gap-4">
                {days.map((day, index) => (
                    <div
                        key={index}
                        className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full cursor-pointer ${localSelectedDay === index
                            ? 'bg-tertiary text-white'
                            : 'bg-[#92E596] text-white'
                            }`}
                        onClick={() => handleDayClick(index)}
                    >
                        {day}
                    </div>
                ))}
            </div>

            {/* Show message only if showMessage is true */}
            {showMessage && (
                <p className="text-xs md:text-sm text-gray-600 mt-2 text-center">
                    Changing this will take effect in the next cycle, and the next collection date will be assigned accordingly.
                </p>
            )}
        </div>
    );
};

export default PreferredCollectionDays;