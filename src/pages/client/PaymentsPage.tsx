import React from 'react';
import { useNavigate } from 'react-router-dom';
import cardImage from '@assets/images/credit-cards.png';
import visa from '@assets/images/visa.png';
import { FiTrash2 } from 'react-icons/fi';
import StickyHeader from '@components/common/StickyHeader'; // Import the reusable StickyHeader component

const PaymentsPage: React.FC = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // Go back to the previous page
    };

    return (
        <div className="min-h-screen bg-[#EBF9EC] flex flex-col items-center justify-start px-4 py-6 md:pb-28">
            {/* Reusable Sticky Header */}
            <StickyHeader
                title="Payments"
                onBackClick={handleBack}
                customClassName="mb-2" // Additional spacing below the sticky header
            />

            {/* Card Image Header */}
            <div className="mb-2">
                <img src={cardImage} alt="card image" className="w-full h-72 md:h-64 object-cover" />
            </div>

            {/* Payment Method */}
            <div className="w-full max-w-md mb-6 bg-white rounded-lg p-4 shadow-lg">
                <h3 className="text-lg font-bold mb-3">Payment Method</h3>
                <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                        <img src={visa} alt="Card" className="w-16 h-8 mr-3" />
                        <div>
                            <h4 className="text-lg font-bold">VISA</h4>
                            <p className="text-sm text-gray-500">ABC Bank</p>
                            <p className="text-sm text-gray-500">**** **** **** 5246</p>
                        </div>
                    </div>
                    <FiTrash2 className="text-red-600 cursor-pointer" size={24} />
                </div>
            </div>

            {/* Payment History */}
            <div className="w-full max-w-md bg-white rounded-lg p-4 shadow-lg">
                <h3 className="text-lg font-bold mb-4">Payment History</h3>
                {/* Payment Items */}
                <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center">
                        <div className="bg-[#EBF9EC] w-12 h-12 rounded-lg flex-col items-center justify-center">
                            <h4 className="text-lg font-bold text-center">25</h4>
                            <p className="text-sm text-center">OCT</p>
                        </div>
                        <div className="ml-4">
                            <p className="font-medium">Subscription Plan</p>
                            <p className="text-sm text-gray-500">Weekly - Lite</p>
                        </div>
                    </div>
                    <p className="text-lg font-semibold">Rs.1000.00</p>
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <div className="bg-[#EBF9EC] w-12 h-12 rounded-lg flex-col items-center justify-center">
                            <h4 className="text-lg font-bold text-center">25</h4>
                            <p className="text-sm text-center">SEP</p>
                        </div>
                        <div className="ml-4">
                            <p className="font-medium">Subscription Plan</p>
                            <p className="text-sm text-gray-500">Weekly - Lite</p>
                        </div>
                    </div>
                    <p className="text-lg font-semibold">Rs.1000.00</p>
                </div>
            </div>
        </div>
    );
};

export default PaymentsPage;