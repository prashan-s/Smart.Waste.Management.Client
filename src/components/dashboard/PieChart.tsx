import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Households', value: 400, color: '#F4A79D' },
    { name: 'Businesses', value: 300, color: '#344BFD' },
    { name: 'Collection Trucks', value: 300, color: '#F68D2B' },
];

const COLORS = ['#F4A79D', '#344BFD', '#F68D2B'];

const PieChartComponent = () => {
    return (
        <div className="w-full h-full">
            {/* Pie Chart */}
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={90}
                        // fill="#8884d8"
                        // paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>

            {/* Custom Legend */}
            <div className="flex justify-around mt-2">
                {data.map((entry, index) => (
                    <div key={`legend-${index}`} className="flex items-center space-x-2">
                        {/* Small color circle */}
                        <span
                            className="inline-block w-3 h-3 rounded-full"
                            style={{ backgroundColor: entry.color }}
                        ></span>
                        {/* Label text */}
                        <span className="text-xs font-bold text-[#767676]">{entry.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PieChartComponent;