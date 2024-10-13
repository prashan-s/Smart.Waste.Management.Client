import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useMemo } from 'react';

// Sample data for the AreaChart
const data = [
    { name: 'Mon', value: 70 },
    { name: 'Tue', value: 75 },
    { name: 'Wed', value: 80 },
    { name: 'Thu', value: 85 },
    { name: 'Fri', value: 90 },
    { name: 'Sat', value: 60 },
    { name: 'Sun', value: 50 },
];

const AreaChartComponent = () => {
    // Calculate "Best" and "Total" values
    const bestValue = useMemo(() => Math.max(...data.map(item => item.value)), [data]);
    const totalValue = useMemo(() => data.reduce((acc, item) => acc + item.value, 0), [data]);

    return (
        <div className="w-full h-full">
            <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#ADB7F9"
                        fill="rgba(173, 183, 249)"
                    />
                </AreaChart>
            </ResponsiveContainer>

            {/* Display Best and Total values */}
            <div className="mt-4">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-[#2E2E30]">Best</p>
                    <p className="text-sm font-bold text-[#2E2E30]">${bestValue.toFixed(2)}</p>
                </div>
                <div className="my-2 border border-solid border-gray-300"></div>
                <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-textGray">Today</p>
                    <p className="text-sm font-bold text-[#2E2E30]">${totalValue.toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
};

export default AreaChartComponent;