import Header from '@components/dashboard/Header';
import SearchBar from '@components/dashboard/SearchBar';
import BarChart from '@components/dashboard/BarChart';
import PieChart from '@components/dashboard/PieChart';
import AreaChartComponent from '@components/dashboard/AreaChart';

const Dashboard = () => {

    // BarChart data
    const barChartData = [
        { name: 'Jan', Businesses: 4000, Households: 2400 },
        { name: 'Feb', Businesses: 3000, Households: 1398 },
        { name: 'Mar', Businesses: 2000, Households: 9800 },
        { name: 'Apr', Businesses: 2780, Households: 3908 },
        { name: 'May', Businesses: 1890, Households: 4800 },
        { name: 'Jun', Businesses: 2390, Households: 3800 },
        { name: 'Jul', Businesses: 3490, Households: 4300 },
    ];

    // AreaChart data
    const areaChartData = [
        { name: 'Mon', value: 70 },
        { name: 'Tue', value: 75 },
        { name: 'Wed', value: 80 },
        { name: 'Thu', value: 85 },
        { name: 'Fri', value: 90 },
        { name: 'Sat', value: 60 },
        { name: 'Sun', value: 50 },
    ];

    // PieChart data
    const pieChartData = [
        { name: 'Households', value: 400, color: '#F4A79D' },
        { name: 'Businesses', value: 300, color: '#344BFD' },
        { name: 'Collection Trucks', value: 300, color: '#F68D2B' },
    ];

    return (
        <div className="p-6 min-h-screen">
            {/* Header */}
            <Header title="Dashboard" />

            {/* Search Bar */}
            <div className="mt-6">
                <SearchBar />
            </div>

            {/* Dashboard Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
                <div className="bg-primary shadow-md rounded-lg p-4">
                    <p className="text-textLightGray text-sm">Total Households</p>
                    <p className="textLightBlack text-2xl font-semibold">25,000</p>
                </div>
                <div className="bg-primary shadow-md rounded-lg p-4">
                    <p className="text-textLightGray text-sm">Total Businesses</p>
                    <p className="textLightBlack text-2xl font-semibold">1,000</p>
                </div>
                <div className="bg-primary shadow-md rounded-lg p-4">
                    <p className="text-textLightGray text-sm">Total Collection Trucks</p>
                    <p className="textLightBlack text-2xl font-semibold">1,000</p>
                </div>
                <div className="bg-primary shadow-md rounded-lg p-4">
                    <p className="text-textLightGray text-sm">Total Employees</p>
                    <p className="textLightBlack text-2xl font-semibold">1,000</p>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-3 grid-rows-2 gap-6 mt-6">
                <div className="col-span-2">
                    <div className="bg-[#F5F5F5] shadow-md rounded-lg p-6">
                        <h3 className="text-textLightGray font-medium mb-4">Statistics</h3>
                        <BarChart
                            data={barChartData}
                            dataKeys={['Businesses', 'Households']}
                            colors={['#8DC2FF', '#006BE8']}
                        />
                    </div>
                </div>
                <div className="row-span-2 col-start-3"></div>
                <div className="row-start-2">
                    <div className="bg-[#F5F5F5] shadow-md rounded-lg p-6">
                        <h3 className="text-textLightBlack font-bold mb-4 text-center">Customer and Resource Distribution</h3>
                        <PieChart data={pieChartData} colors={['#F4A79D', '#344BFD', '#F68D2B']} />
                    </div>
                </div>
                <div className="row-start-2">
                    <div className="bg-[#F5F5F5] shadow-md rounded-lg p-6">
                        <h3 className="text-textLightBlack font-bold mb-4 text-center">Overall Performance</h3>
                        <AreaChartComponent
                            data={areaChartData}
                            strokeColor="#ADB7F9"
                            fillColor="rgba(173, 183, 249)"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;