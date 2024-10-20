import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import StickyHeader from '@components/common/StickyHeader';
import eWasteImage from '@assets/images/electric-waste.png';
import dustbin from '@assets/images/dustbin.png';
import box from '@assets/images/box.png';
import { useNavigate } from 'react-router-dom';
import { getWasteTypeDetails, getWasteTypeWeightsForUser } from '@services/userService';
import useSessionStorage from '@hooks/useSessionStorage';
import PieChartComponent from '@components/client/WasteChart'; // Import the pie chart component


// Sample Data for the pie chart
const data = [
    { name: 'Paper', value: 400, color: '#EA5F5F', image: box },
    { name: 'E Waste', value: 300, color: '#FFAC33', image: eWasteImage },
    { name: 'Plastic', value: 300, color: '#D9D9D9', image: dustbin },
];

const MyWastePage: React.FC = () => {
    const navigate = useNavigate();
    const [, setWasteDetails] = useSessionStorage('wasteDetails', {});
    const [chartData, setChartData] = useState([]);


    // When click a category
    const handleWasteCategoryClick = async (wasteName: string, imageSrc: string) => {
        try {
            // Pass the full waste name without splitting it
            const wasteDetails = await getWasteTypeDetails(wasteName);

            // Adding imageSrc to wasteDetails
            const wasteDetailsWithImage = { ...wasteDetails, imageSrc };

            console.log('Waste Details:', wasteDetailsWithImage);
            setWasteDetails(wasteDetailsWithImage);
            navigate('/client/my-waste-details');
        } catch (error) {
            console.error('Error fetching waste details:', error);
        }
    };

    // Fetch waste data for the pie chart
    useEffect(() => {
        const fetchWasteData = async () => {
            try {
                const data = await getWasteTypeWeightsForUser(); // Fetching data from the API

                // Format data for the chart
                const formattedData = data.map((item: any) => ({
                    name: item.wasteTypeName,
                    value: item.weight,
                    color: item.color, // Assign colors if needed or map from response
                }));

                setChartData(formattedData);
            } catch (error) {
                console.error('Error fetching waste data:', error);
            }
        };

        fetchWasteData();
    }, []);

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
                {data.map((wasteItem, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center"
                        onClick={() => handleWasteCategoryClick(wasteItem.name, wasteItem.image)}
                    >
                        <img
                            src={wasteItem.image}
                            alt={wasteItem.name}
                            className="w-20 h-20 rounded-lg object-cover mb-2 cursor-pointer"
                        />
                        <h3 className="text-lg font-semibold">{wasteItem.name}</h3>
                    </div>
                ))}
            </div>

            <div className="flex justify-center items-center">
                {/* Pie Chart */}

                <PieChartComponent data={chartData} />

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