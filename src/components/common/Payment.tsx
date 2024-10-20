import { useEffect } from "react";
import axiosInstance from "@helper/axiosInstance";

interface CustomerDetails {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
}

interface PaymentProps {
    paymentTitle: string;
    amount: string;
    userId: number;
    order_id: number;
    currency: string;
    customerDetails: CustomerDetails;
    goNext: () => void;
    goBack: () => void;
    onPaymentError: () => void;
}

const Payment: React.FC<PaymentProps> = ({
    paymentTitle,
    amount,
    userId,
    order_id,
    currency,
    customerDetails,
    goNext,
    goBack,
    onPaymentError,
}) => {

    const fetchHash = async (paymentData: any) => {
        const response = await axiosInstance.post('/payment/hash', paymentData);
        if (response) {
            const { data } = response;
            return data;
        } else {
            throw new Error('Failed to fetch hash from the backend.');
        }
    };

    const initiatePayment = async () => {

        try {
            const hash = await fetchHash({
                order_id,
                amount,
                currency
            });

            const payment = {
                sandbox: true,
                preapprove: true,
                merchant_id: "1225830",
                return_url: "http://localhost:5173/client/payment",
                cancel_url: "http://localhost:5173/client/payment",
                notify_url: "https://app.dulanga.com/api/v1/swms/payment/notify-approval",
                order_id,
                items: paymentTitle,
                amount: amount,
                currency: "LKR",
                hash,
                first_name: customerDetails.firstName,
                last_name: customerDetails.lastName,
                email: customerDetails.email,
                phone: customerDetails.phone,
                address: customerDetails.address,
                city: customerDetails.city,
                country: "Sri Lanka",
                custom_1: userId,
            };
            console.log(payment);
            (window as any).payhere.startPayment(payment);

        } catch (error) {
            console.error('Error initiating payment:', error);
        }
    };

    (window as any).payhere.onCompleted = async function onCompleted(order_id: any) {
        try {
            goNext();
        } catch (error) {
            console.error('Error in payment process:', error);
            goBack();
        }
    };

    (window as any).payhere.onDismissed = function onDismissed() {
        console.log("Payment dismissed");
        goBack();
    };

    (window as any).payhere.onError = function onError(error: any) {
        console.log("Error:" + error);
        onPaymentError();
    };

    useEffect(() => {
        initiatePayment();
    }, [])

    return (
        <>
        </>
    );
};

export default Payment;