import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@components/client/Button';

interface PaymentStatusProps {
    isPaymentSuccessful: boolean;
}

const PaymentStatus: React.FC<PaymentStatusProps> = ({ isPaymentSuccessful }) => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        if (isPaymentSuccessful) {
            navigate('/client/dashboard'); // Redirect to dashboard or success page
        } else {
            navigate('/client/retry-payment'); // Redirect to retry payment or appropriate page
        }
    };

    return (
        <div className="min-h-screen bg-[#F5F9F7] flex flex-col items-center justify-center px-6">
            {/* Conditional Icon for Success or Failure */}
            <div className={`flex items-center justify-center rounded-full w-16 h-16 mb-4 ${isPaymentSuccessful ? 'bg-green-500' : 'bg-red-500'}`}>
                {isPaymentSuccessful ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" clipRule="evenodd" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                )}
            </div>

            {/* Conditional Message for Success or Failure */}
            <h2 className="text-3xl font-extrabold text-tertiary mb-4">
                {isPaymentSuccessful ? 'Payment Successful!' : 'Payment Failed!'}
            </h2>
            <p className="text-xl text-[#404040] font-bold mb-10">
                {isPaymentSuccessful ? 'Your payment has been processed successfully.' : 'There was an issue processing your payment.'}
            </p>

            {/* Conditional Button Label */}
            <Button
                label={isPaymentSuccessful ? 'Continue' : 'Retry Payment'}
                className="w-full max-w-md bg-tertiary text-white text-lg font-semibold py-2"
                onClick={handleRedirect}
            />
        </div>
    );
};

export default PaymentStatus;