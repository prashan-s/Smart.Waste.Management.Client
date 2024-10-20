import BarChartComponent from '@components/dashboard/BarChart';
import PieChartComponent from '@components/dashboard/PieChart';
import Header from '@components/dashboard/Header';
import SearchBar from '@components/dashboard/SearchBar';
import { useState } from 'react';
import CustomSelect from '@components/dashboard/CustomSelect';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRange } from '@mui/x-date-pickers-pro/models';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import SameDataComposedChart from '@components/dashboard/SameDataComposedChart';
import { MdDiversity2 } from "react-icons/md";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";


const Reports = () => {
    // BarChart data (similar to what we have in the Dashboard)
    const barChartData = [
        { name: 'Jan', Paper: 4000, 'Food Waste': 2400, Plastic: 2400 },
        { name: 'Feb', Paper: 3000, 'Food Waste': 1398, Plastic: 2210 },
        { name: 'Mar', Paper: 2000, 'Food Waste': 9800, Plastic: 2290 },
        { name: 'Apr', Paper: 2780, 'Food Waste': 3908, Plastic: 2000 },
    ];

    // Define the profit data in the parent component
    const profitData = [
        { name: 'Jan', Profit: 4000, Change: 4000 },
        { name: 'Feb', Profit: 3000, Change: 3000 },
        { name: 'Mar', Profit: 2000, Change: 2000 },
        { name: 'Apr', Profit: 2780, Change: 2780 },
        { name: 'May', Profit: 1890, Change: 1890 },
        { name: 'Jun', Profit: 2390, Change: 2390 },
        { name: 'Jul', Profit: 3490, Change: 3490 },
    ];

    // Colors for the composed chart
    const composedChartColors = {
        barColor: '#92E596', // Green for the bar
        lineColor: '#FF9F0A', // Orange for the line
    };

    // PieChart data for households and businesses
    const pieChartDataHousehold = [
        { name: 'Paper', value: 400, color: '#EA5F5F' },
        { name: 'Food Waste', value: 300, color: '#FFAC33' },
        { name: 'Plastic', value: 300, color: '#D9D9D9' },
    ];

    const pieChartDataBusiness = [
        { name: 'Paper', value: 500, color: '#EA5F5F' },
        { name: 'Food Waste', value: 200, color: '#FFAC33' },
        { name: 'Plastic', value: 100, color: '#D9D9D9' },
    ];

    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    const [customerType, setCustomerType] = useState('');

    const [value, setValue] = useState<DateRange<Dayjs>>([
        dayjs('2022-04-17'),
        dayjs('2022-04-21'),
    ]);

    return (
        <div className="p-6 min-h-screen">
            {/* Header */}
            <div className="flex justify-between w-full">
                <Header title="Customize Your Report" />

                {/* Search Bar */}
                <div className="w-full flex justify-end">
                    <SearchBar />
                </div>
            </div>

            {/* Filters Section */}
            <div className="grid grid-cols-4 gap-4 mt-10">
                <CustomSelect
                    options={[]}
                    value={location}
                    onChange={setLocation}
                    placeholder="Location"
                />
                <CustomSelect
                    options={[]}
                    value={category}
                    onChange={setCategory}
                    placeholder="Category"
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateRangePicker
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                    />
                </LocalizationProvider>
                <CustomSelect
                    options={[]}
                    value={customerType}
                    onChange={setCustomerType}
                    placeholder="Customer Type"
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-2 grid-rows-2 gap-6 mt-10">
                <div className="col-span-2">
                    {/* BarChart for Categories */}
                    <div className="border border-solid border-black shadow-md rounded-lg p-6">
                        <div className="flex items-center justify-start gap-x-2 mb-4">
                            <MdDiversity2 color="#5654D4" /><h3 className="text-black font-bold">Category</h3>
                        </div>
                        <div className="flex justify-between mb-4">
                            <h2 className="text-textLightGray font-medium">Total Waste from January to April</h2>
                            <div className="flex">
                                <div className="flex justify-center items-center mx-2"><div className="w-3 h-3 bg-[#FF9F0A] rounded-sm mx-1.5"></div><h3 className="font-semibold">Paper</h3></div>
                                <div className="flex justify-center items-center mx-2"><div className="w-3 h-3 bg-[#5654D4] rounded-sm mx-1.5"></div><h3 className="font-semibold">Food Waste</h3></div>
                                <div className="flex justify-center items-center mx-2"><div className="w-3 h-3 bg-[#3FC8E4] rounded-sm mx-1.5"></div><h3 className="font-semibold">Plastic</h3></div>
                            </div>
                        </div>
                        <BarChartComponent
                            data={barChartData}
                            dataKeys={['Paper', 'Food Waste', 'Plastic']}
                            colors={['#FF9F0A', '#5654D4', '#3FC8E4']}
                            legend={false}
                            rounded={true}
                        />
                    </div>
                </div>
                <div className="row-start-2">
                    {/* Profit Section with composed chart */}
                    <div className="border border-solid border-black shadow-md rounded-lg p-6">
                        <div className="flex items-center justify-start gap-x-2 mb-4">
                            <FaMoneyBillTrendUp color="#FF9F0A" />
                            <h3 className="text-black font-bold">Profit</h3>
                        </div>
                        {/* Passing the profit data, bar and line keys, and colors as props */}
                        <SameDataComposedChart
                            data={profitData}
                            barKey="Profit"
                            lineKey="Change"
                            colors={composedChartColors}
                        />
                    </div>
                </div>
                <div className="row-start-2">
                    <div className="border border-solid border-black shadow-md rounded-lg p-6">
                        <div className="flex items-center justify-start gap-x-2 mb-4">
                            <FaRegUser color="#00C49F" />
                            <h3 className="text-textLightBlack font-bold">Customer Type</h3>
                        </div>
                        <div className="flex w-full gap-x-5 mb-7">
                            <div className="flex-col w-full">
                                <PieChartComponent
                                    data={pieChartDataHousehold}
                                    colors={['#EA5F5F', '#FFAC33', '#D9D9D9']}
                                    legend={false}
                                    innerRadius={0}
                                />
                                <h3 className="text-center font-bold text-textLightGray">Household</h3>
                            </div>
                            <div className="flex-col w-full">
                                <PieChartComponent
                                    data={pieChartDataBusiness}
                                    colors={['#FFAC33', '#EA5F5F', '#D9D9D9']}
                                    legend={false}
                                    innerRadius={0}
                                />
                                <h3 className="text-center font-bold text-textLightGray">Businesses</h3>
                            </div>
                            <div className="flex-col w-[340px]">
                                <div className="flex justify-start items-center"><div className="w-3 h-3 bg-[#EA5F5F] rounded-sm mx-1.5"></div><h3 className="font-semibold">Paper</h3></div>
                                <div className="flex justify-start items-center"><div className="w-3 h-3 bg-[#FFAC33] rounded-sm mx-1.5"></div><h3 className="font-semibold">Food Waste</h3></div>
                                <div className="flex justify-start items-center"><div className="w-3 h-3 bg-[#D9D9D9] rounded-sm mx-1.5"></div><h3 className="font-semibold">Plastic</h3></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;