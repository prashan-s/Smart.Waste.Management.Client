import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Jan', Businesses: 4000, Households: 2400 },
    { name: 'Feb', Businesses: 3000, Households: 1398 },
    { name: 'Mar', Businesses: 2000, Households: 9800 },
    { name: 'Apr', Businesses: 2780, Households: 3908 },
    { name: 'May', Businesses: 1890, Households: 4800 },
    { name: 'Jun', Businesses: 2390, Households: 3800 },
    { name: 'Jul', Businesses: 3490, Households: 4300 },
];

const BarChartComponent = () => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Businesses" fill="#8DC2FF" />
                <Bar dataKey="Households" fill="#006BE8" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BarChartComponent;