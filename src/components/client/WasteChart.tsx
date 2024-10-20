import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

// Define the props for the component
interface PieChartComponentProps {
    data: {
        name: string;
        value: number;
        color: string;
    }[];
}

// Colors for the chart
const colors = ['#EA5F5F', '#FFAC33', '#D9D9D9'];

const PieChartComponent: React.FC<PieChartComponentProps> = ({ data }) => {
    return (
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
                            <Cell key={`cell-${index}`} fill={entry.color || colors[index % colors.length]} />
                        ))}
                    </Pie>
                    <Legend verticalAlign="bottom" />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PieChartComponent;
