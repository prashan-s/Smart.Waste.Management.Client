import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PaymentStatus from '@components/client/PaymentStatus';

const PaymentStatusPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Check if the state exists in the location, otherwise navigate to home
    const isPaymentSuccessful = location.state?.isPaymentSuccessful;

    // If no state is passed, redirect to home or default page
    if (isPaymentSuccessful === undefined) {
        navigate('/client');
        return null;
    }

    return (
        <PaymentStatus isPaymentSuccessful={isPaymentSuccessful} />
    );
};

export default PaymentStatusPage;