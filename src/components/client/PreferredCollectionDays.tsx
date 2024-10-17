import React, { useState } from 'react';

const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const PreferredCollectionDays: React.FC = () => {
    const [selectedDay, setSelectedDay] = useState(2); // For example, Tuesday selected

    return (
        <div className="mt-6">
            <h3 className="text-lg font-semibold">Preferred Collection Day</h3>
            <div className="flex mt-2 gap-2">
                {days.map((day, index) => (
                    <div
                        key={index}
                        className={`w-10 h-10 flex items-center justify-center rounded-full cursor-pointer ${selectedDay === index
                                ? 'bg-[#04863E] text-white'
                                : 'bg-[#92E596] text-white'
                            }`}
                        onClick={() => setSelectedDay(index)}
                    >
                        {day}
                    </div>
                ))}
            </div>
            <p className="text-sm text-gray-600 mt-2">
                Changing this will take effect in the next cycle, and the next collection date will
                be assigned accordingly.
            </p>
        </div>
    );
};

export default PreferredCollectionDays;