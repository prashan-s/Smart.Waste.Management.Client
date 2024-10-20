import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

interface BarChartComponentProps {
    data: Array<{ name: string;[key: string]: any }>;
    dataKeys: string[];
    colors: string[];
    legend?: boolean;
    rounded?: boolean;
}

const BarChartComponent: React.FC<BarChartComponentProps> = ({
    data,
    dataKeys,
    colors,
    legend = true,
    rounded = false,
}) => {
    // Define the radius for the bars. If rounded is true, apply rounded corners, otherwise, no radius.
    const barRadius: [number, number, number, number] = rounded
        ? [10, 10, 10, 10]
        : [0, 0, 0, 0];

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                {legend && <Legend />}
                {dataKeys.map((key: string, index: number) => (
                    <Bar
                        key={key}
                        dataKey={key}
                        fill={colors[index]}
                        radius={barRadius}
                    />
                ))}
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BarChartComponent;