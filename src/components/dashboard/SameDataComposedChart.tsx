import React from 'react';
import {
    ComposedChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts';

interface SameDataComposedChartProps {
    data: Array<{ name: string;[key: string]: any }>;
    barKey: string;
    lineKey: string;
    colors: {
        barColor: string;
        lineColor: string;
    };
    height?: number;
}

const SameDataComposedChart: React.FC<SameDataComposedChartProps> = ({
    data,
    barKey,
    lineKey,
    colors,
    height = 250,
}) => {
    return (
        <ResponsiveContainer width="100%" height={height}>
            <ComposedChart
                data={data}
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                }}
            >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                {/* Bar chart with dynamic color and dataKey */}
                <Bar dataKey={barKey} barSize={20} fill={colors.barColor} />
                {/* Line chart with dynamic color and dataKey */}
                <Line
                    type="monotone"
                    dataKey={lineKey}
                    stroke={colors.lineColor}
                    strokeWidth={2}
                />
            </ComposedChart>
        </ResponsiveContainer>
    );
};

export default SameDataComposedChart;