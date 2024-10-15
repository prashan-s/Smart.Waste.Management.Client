import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';

const PieChartComponent = ({ data, colors, legend = true, innerRadius = 40, outerRadius = 90 }) => {
    return (
        <div className="w-full h-full">
            <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={innerRadius}
                        outerRadius={outerRadius}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>

            {legend && (
                <div className="flex justify-around mt-2">
                    {data.map((entry, index) => (
                        <div key={`legend-${index}`} className="flex items-center space-x-2">
                            <span
                                className="inline-block w-3 h-3 rounded-full"
                                style={{ backgroundColor: entry.color }}
                            ></span>
                            <span className="text-xs font-bold text-[#767676]">{entry.name}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PieChartComponent;