import React from 'react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';

interface DataItem {
    name: string;
    value: number;
    color?: string; // Optional if you have 'color' in your data items
}

interface PieChartComponentProps {
    data: DataItem[];
    colors: string[];
    legend?: boolean;
    innerRadius?: number;
    outerRadius?: number;
}

const PieChartComponent: React.FC<PieChartComponentProps> = ({
    data,
    colors,
    legend = true,
    innerRadius = 40,
    outerRadius = 90,
}) => {
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
                        {data.map((_, index: number) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={colors[index % colors.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>

            {legend && (
                <div className="flex justify-around mt-2">
                    {data.map((entry: DataItem, index: number) => (
                        <div
                            key={`legend-${index}`}
                            className="flex items-center space-x-2"
                        >
                            <span
                                className="inline-block w-3 h-3 rounded-full"
                                style={{
                                    backgroundColor:
                                        entry.color || colors[index % colors.length],
                                }}
                            ></span>
                            <span className="text-xs font-bold text-[#767676]">
                                {entry.name}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PieChartComponent;