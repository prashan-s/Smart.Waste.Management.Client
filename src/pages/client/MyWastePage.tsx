import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import StickyHeader from '@components/common/StickyHeader';
import eWasteImage from '@assets/images/electric-waste.png';
import dustbin from '@assets/images/dustbin.png';
import box from '@assets/images/box.png';
import { useNavigate } from 'react-router-dom';

// Sample Data for the pie chart
const data = [
    { name: 'Paper Waste', value: 400, color: '#EA5F5F' },
    { name: 'E Waste', value: 300, color: '#FFAC33' },
    { name: 'Plastic Waste', value: 300, color: '#D9D9D9' },
];

const MyWastePage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#F5F9F7] flex flex-col items-center px-4 py-6">
            {/* Sticky Header */}
            <StickyHeader
                title="My Waste"
                onBackClick={() => navigate(-1)}
                customClassName="mb-2"
            />

            {/* Waste Categories */}
            <div className="w-full max-w-md flex justify-around mt-6">
                <div className="flex flex-col items-center">
                    <img src={box} alt="Paper" className="w-20 h-20 rounded-lg object-cover mb-2" />
                    <h3 className="text-lg font-semibold">Paper</h3>
                </div>
                <div className="flex flex-col items-center">
                    <img src={eWasteImage} alt="E Waste" className="w-20 h-20 rounded-lg object-cover mb-2" />
                    <h3 className="text-lg font-semibold">E Waste</h3>
                </div>
                <div className="flex flex-col items-center">
                    <img src={dustbin} alt="Plastic" className="w-20 h-20 rounded-lg object-cover mb-2" />
                    <h3 className="text-lg font-semibold">Plastic</h3>
                </div>
            </div>

            <div className="flex justify-center items-center">
                {/* Pie Chart */}
                <div className="w-full max-w-md mt-8">
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="value"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                label
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Legend verticalAlign="bottom" />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Legend (Custom) */}
                <div className="mt-6 flex flex-col items-start">
                    <div className="flex items-center mb-2">
                        <div className="w-4 h-4 bg-[#EA5F5F] mr-2"></div>
                        <span className="text-lg font-semibold text-nowrap">Paper Waste</span>
                    </div>
                    <div className="flex items-center mb-2">
                        <div className="w-4 h-4 bg-[#FFAC33] mr-2"></div>
                        <span className="text-lg font-semibold text-nowrap">E Waste</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-4 h-4 bg-[#D9D9D9] mr-2"></div>
                        <span className="text-lg font-semibold text-nowrap">Plastic Waste</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyWastePage;