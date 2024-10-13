import Header from '@components/dashboard/Header';
import SearchBar from '@components/dashboard/SearchBar';
import BarChart from '@components/dashboard/BarChart';
import PieChart from '@components/dashboard/PieChart';
import AreaChartComponent from '@components/dashboard/AreaChart';

const Dashboard = () => {
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
                        <BarChart />
                    </div>
                </div>
                <div className="row-span-2 col-start-3"></div>
                <div className="row-start-2">
                    <div className="bg-[#F5F5F5] shadow-md rounded-lg p-6">
                        <h3 className="text-textLightBlack font-bold mb-4 text-center">Customer and Resource Distribution</h3>
                        <PieChart />
                    </div>
                </div>
                <div className="row-start-2">
                    <div className="bg-[#F5F5F5] shadow-md rounded-lg p-6">
                        <h3 className="text-textLightBlack font-bold mb-4 text-center">Overall Performance</h3>
                        <AreaChartComponent />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;