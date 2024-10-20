import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { useMemo } from 'react';

interface DataPoint {
    name: string;
    value: number;
}

interface AreaChartComponentProps {
    data: DataPoint[];
    strokeColor: string;
    fillColor: string;
}

const AreaChartComponent: React.FC<AreaChartComponentProps> = ({
    data,
    strokeColor,
    fillColor,
}) => {
    const bestValue = useMemo(
        () => Math.max(...data.map((item: DataPoint) => item.value)),
        [data]
    );

    const totalValue = useMemo(
        () => data.reduce((acc: number, item: DataPoint) => acc + item.value, 0),
        [data]
    );

    return (
        <div className="w-full h-full">
            <ResponsiveContainer width="100%" height={200}>
                <AreaChart
                    data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke={strokeColor}
                        fill={fillColor}
                    />
                </AreaChart>
            </ResponsiveContainer>

            <div className="mt-4">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-[#2E2E30]">Best</p>
                    <p className="text-sm font-bold text-[#2E2E30]">
                        ${bestValue.toFixed(2)}
                    </p>
                </div>
                <div className="my-2 border border-solid border-gray-300"></div>
                <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-textGray">Today</p>
                    <p className="text-sm font-bold text-[#2E2E30]">
                        ${totalValue.toFixed(2)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AreaChartComponent;